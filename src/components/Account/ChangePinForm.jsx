import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FaKey, FaShieldAlt, FaTimes, FaLock } from "react-icons/fa";

const ChangePinForm = ({ accountNumber, accountType, onSuccess, onCancel }) => {
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [step, setStep] = useState(1); // 1=request OTP, 2=verify, 3=reset
  const [otp, setOtp] = useState("");
  const [forgotNewPin, setForgotNewPin] = useState("");
  const [confirmForgotPin, setConfirmForgotPin] = useState("");

  const BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

  // ✅ Get cifNumber from Redux (not localStorage)
  const user = useSelector((state) => state.auth?.user);
  const cifNumber = user?.cifNumber;

  // ---------- NORMAL CHANGE PIN ----------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!oldPin || !newPin || !confirmPin) {
      toast.error("Please fill all fields");
      return;
    }
    if (newPin.length !== 4 || isNaN(newPin)) {
      toast.error("New PIN must be a 4-digit number");
      return;
    }
    if (newPin !== confirmPin) {
      toast.error("New PIN and confirmation do not match");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.put(
        `${BASE_URL}/accounts/${accountNumber}/change-pin`,
        {
          oldPin: parseInt(oldPin),
          newPin: parseInt(newPin),
        }
      );
      toast.success(data.message || "PIN changed successfully!");
      onSuccess();
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to change PIN";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // ---------- FORGOT PIN FLOW ----------
  const handleRequestOtp = async () => {
    if (!cifNumber) {
      toast.error("CIF not found. Please log in again.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(`${BASE_URL}/accounts/pin/request-reset`, {
        cifNumber,
      });
      toast.success(data || "OTP sent successfully!");
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(`${BASE_URL}/accounts/pin/verify-otp`, {
        cifNumber,
        otp,
      });

      // Strict check: Try to determine if the response is actually a success
      // If data is a string, checking if it *looks* like success
      const msg = typeof data === "string" ? data : JSON.stringify(data);

      if (msg.toLowerCase().includes("success") || msg.toLowerCase().includes("verified")) {
        toast.success(data || "OTP verified successfully!");
        setStep(3);
      } else {
        // If 200 OK but message isn't clearly success, treat as error (safeguard)
        toast.error(msg || "Invalid OTP");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };


  const handleResetPin = async () => {
    if (!forgotNewPin || !confirmForgotPin) {
      toast.error("Please fill all fields");
      return;
    }
    if (forgotNewPin.length !== 4 || isNaN(forgotNewPin)) {
      toast.error("New PIN must be 4 digits");
      return;
    }
    if (forgotNewPin !== confirmForgotPin) {
      toast.error("PINs do not match");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(`${BASE_URL}/accounts/pin/reset`, {
        cifNumber,
        accountNumber,
        accountType, // ✅ added new field for backend DTO
        otp,
        newPin: parseInt(forgotNewPin),
      });
      toast.success(data || "PIN reset successfully!");
      setForgotMode(false);
      onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset PIN");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-white/20"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 text-white relative">
          <button
            onClick={onCancel}
            className="absolute right-4 top-4 text-white/70 hover:text-white transition-colors"
          >
            <FaTimes />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
              <FaShieldAlt className="text-xl text-blue-400" />
            </div>
            <h3 className="text-xl font-bold">
              {forgotMode ? "Reset Security PIN" : "Change Security PIN"}
            </h3>
          </div>
          <p className="text-slate-300 text-sm">
            {forgotMode
              ? "Recover your account access securely"
              : "Update your 4-digit transaction PIN"
            }
          </p>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {!forgotMode ? (
              <motion.form
                key="change-pin"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div>
                  <label className="block text-slate-700 text-sm font-semibold mb-2 ml-1">
                    Current PIN
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-3.5 text-slate-400">
                      <FaKey />
                    </div>
                    <input
                      type="password"
                      value={oldPin}
                      onChange={(e) => setOldPin(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all tracking-widest text-lg"
                      maxLength={4}
                      placeholder="••••"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-700 text-sm font-semibold mb-2 ml-1">
                      New PIN
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-3.5 text-slate-400">
                        <FaLock />
                      </div>
                      <input
                        type="password"
                        value={newPin}
                        onChange={(e) => setNewPin(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all tracking-widest text-lg"
                        maxLength={4}
                        placeholder="••••"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 text-sm font-semibold mb-2 ml-1">
                      Confirm New PIN
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-3.5 text-slate-400">
                        <FaLock />
                      </div>
                      <input
                        type="password"
                        value={confirmPin}
                        onChange={(e) => setConfirmPin(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all tracking-widest text-lg"
                        maxLength={4}
                        placeholder="••••"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Updating...
                      </span>
                    ) : "Update PIN"}
                  </button>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setForgotMode(true)}
                    className="text-slate-500 text-sm hover:text-blue-600 font-medium transition-colors"
                  >
                    Forgot your PIN?
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="forgot-pin"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Step Indicators */}
                <div className="flex justify-center gap-2 mb-6">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`h-2 rounded-full transition-all duration-300 ${s === step ? "w-8 bg-blue-600" : s < step ? "w-2 bg-green-500" : "w-2 bg-slate-200"
                        }`}
                    />
                  ))}
                </div>

                {step === 1 && (
                  <div className="text-center space-y-6">
                    <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-blue-600">
                      <FaShieldAlt className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-800">Verify Identity</h4>
                      <p className="text-slate-500 text-sm mt-1">
                        We will send a One-Time Password (OTP) to your registered email ending with **{cifNumber ? cifNumber.slice(-4) : "XXXX"}.
                      </p>
                    </div>
                    <button
                      onClick={handleRequestOtp}
                      disabled={loading}
                      className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                    >
                      {loading ? "Sending..." : "Send OTP"}
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h4 className="text-lg font-bold text-slate-800">Enter OTP</h4>
                      <p className="text-slate-500 text-sm">
                        Please enter the 6-digit code sent to your mobile.
                      </p>
                    </div>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full text-center text-3xl tracking-[1em] font-mono bg-slate-50 border border-slate-200 rounded-xl py-4 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="------"
                      maxLength={6}
                    />
                    <button
                      onClick={handleVerifyOtp}
                      disabled={loading}
                      className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                    >
                      {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-5">
                    <div className="text-center mb-4">
                      <h4 className="text-lg font-bold text-slate-800">Set New PIN</h4>
                      <p className="text-slate-500 text-sm">
                        Create a strong 4-digit PIN for your account.
                      </p>
                    </div>

                    <div>
                      <label className="block text-slate-700 text-sm font-semibold mb-2 ml-1">
                        New PIN
                      </label>
                      <input
                        type="password"
                        value={forgotNewPin}
                        onChange={(e) => setForgotNewPin(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 text-center text-lg tracking-widest"
                        maxLength={4}
                        placeholder="••••"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 text-sm font-semibold mb-2 ml-1">
                        Confirm PIN
                      </label>
                      <input
                        type="password"
                        value={confirmForgotPin}
                        onChange={(e) => setConfirmForgotPin(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 text-center text-lg tracking-widest"
                        maxLength={4}
                        placeholder="••••"
                      />
                    </div>

                    <button
                      onClick={handleResetPin}
                      disabled={loading}
                      className="w-full bg-green-600 text-white font-bold py-3.5 rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-500/20"
                    >
                      {loading ? "Resetting..." : "Reset PIN"}
                    </button>
                  </div>
                )}

                <button
                  onClick={() => {
                    setForgotMode(false);
                    setStep(1);
                  }}
                  className="w-full text-slate-500 text-sm hover:text-slate-700 transition-colors"
                >
                  Back to Change PIN
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default ChangePinForm;
