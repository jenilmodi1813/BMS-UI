// import React, { useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const ChangePinForm = ({ accountNumber, onSuccess, onCancel }) => {
//   const [oldPin, setOldPin] = useState("");
//   const [newPin, setNewPin] = useState("");
//   const [confirmPin, setConfirmPin] = useState("");
//   const [loading, setLoading] = useState(false);

//   const BASE_URL =
//     import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!oldPin || !newPin || !confirmPin) {
//       toast.error("Please fill all fields");
//       return;
//     }
//     if (newPin.length !== 4 || isNaN(newPin)) {
//       toast.error("New PIN must be a 4-digit number");
//       return;
//     }
//     if (newPin !== confirmPin) {
//       toast.error("New PIN and confirmation do not match");
//       return;
//     }

//     try {
//       setLoading(true);
//       const { data } = await axios.put(
//         `${BASE_URL}/accounts/${accountNumber}/change-pin`,
//         {
//           oldPin: parseInt(oldPin),
//           newPin: parseInt(newPin),
//         }
//       );
//       toast.success(data.message || "PIN changed successfully!");
//       onSuccess();
//     } catch (err) {
//       const msg =
//         err.response?.data?.message ||
//         err.response?.data?.error ||
//         "Failed to change PIN";
//       toast.error(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-2xl rounded-xl p-6 w-96 z-50">
//       <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">
//         Change Account PIN
//       </h3>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Old PIN
//           </label>
//           <input
//             type="password"
//             value={oldPin}
//             onChange={(e) => setOldPin(e.target.value)}
//             className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             maxLength={4}
//             placeholder="Enter old 4-digit PIN"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             New PIN
//           </label>
//           <input
//             type="password"
//             value={newPin}
//             onChange={(e) => setNewPin(e.target.value)}
//             className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             maxLength={4}
//             placeholder="Enter new 4-digit PIN"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Confirm New PIN
//           </label>
//           <input
//             type="password"
//             value={confirmPin}
//             onChange={(e) => setConfirmPin(e.target.value)}
//             className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             maxLength={4}
//             placeholder="Confirm new PIN"
//           />
//         </div>

//         <div className="flex justify-between mt-5">
//           <button
//             type="button"
//             onClick={onCancel}
//             className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
//           >
//             {loading ? "Updating..." : "Update PIN"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ChangePinForm;

// import React, { useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const ChangePinForm = ({ accountNumber, onSuccess, onCancel }) => {
//   const [oldPin, setOldPin] = useState("");
//   const [newPin, setNewPin] = useState("");
//   const [confirmPin, setConfirmPin] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showForgotForm, setShowForgotForm] = useState(false);

//   const BASE_URL =
//     import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

//   // 🔹 Normal PIN Change
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!oldPin || !newPin || !confirmPin) {
//       toast.error("Please fill all fields");
//       return;
//     }
//     if (newPin.length !== 4 || isNaN(newPin)) {
//       toast.error("New PIN must be a 4-digit number");
//       return;
//     }
//     if (newPin !== confirmPin) {
//       toast.error("New PIN and confirmation do not match");
//       return;
//     }

//     try {
//       setLoading(true);
//       const { data } = await axios.put(
//         `${BASE_URL}/accounts/${accountNumber}/change-pin`,
//         {
//           oldPin: parseInt(oldPin),
//           newPin: parseInt(newPin),
//         }
//       );
//       toast.success(data.message || "PIN changed successfully!");
//       onSuccess();
//     } catch (err) {
//       const msg =
//         err.response?.data?.message ||
//         err.response?.data?.error ||
//         "Failed to change PIN";
//       toast.error(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {!showForgotForm && (
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-2xl rounded-xl p-6 w-96 z-50">
//           <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">
//             Change Account PIN
//           </h3>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Old PIN
//               </label>
//               <input
//                 type="password"
//                 value={oldPin}
//                 onChange={(e) => setOldPin(e.target.value)}
//                 className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                 maxLength={4}
//                 placeholder="Enter old 4-digit PIN"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 New PIN
//               </label>
//               <input
//                 type="password"
//                 value={newPin}
//                 onChange={(e) => setNewPin(e.target.value)}
//                 className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                 maxLength={4}
//                 placeholder="Enter new 4-digit PIN"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Confirm New PIN
//               </label>
//               <input
//                 type="password"
//                 value={confirmPin}
//                 onChange={(e) => setConfirmPin(e.target.value)}
//                 className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                 maxLength={4}
//                 placeholder="Confirm new PIN"
//               />
//             </div>

//             <div className="flex justify-between mt-5 items-center">
//               <button
//                 type="button"
//                 onClick={onCancel}
//                 className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
//               >
//                 {loading ? "Updating..." : "Update PIN"}
//               </button>
//             </div>

//             {/* Forgot PIN Link */}
//             <p
//               onClick={() => setShowForgotForm(true)}
//               className="text-center text-sm text-blue-600 mt-3 cursor-pointer hover:underline"
//             >
//               Forgot PIN?
//             </p>
//           </form>
//         </div>
//       )}

//       {/* Forgot PIN Modal */}
//       {showForgotForm && (
//         <ForgotPinForm onCancel={() => setShowForgotForm(false)} />
//       )}
//     </>
//   );
// };

// export default ChangePinForm;

// // ---------------------------------------------------------------------------
// // 🔹 Forgot PIN Flow — 3 Step OTP Process
// // ---------------------------------------------------------------------------
// const ForgotPinForm = ({ onCancel }) => {
//   const [step, setStep] = useState(1);
//   const [otp, setOtp] = useState("");
//   const [newPin, setNewPin] = useState("");
//   const [confirmPin, setConfirmPin] = useState("");
//   const [loading, setLoading] = useState(false);

//   const BASE_URL =
//     import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";
//   const auth = JSON.parse(localStorage.getItem("auth"));
//   const cifNumber = auth?.customer?.cifNumber;

//   // Step 1: Request OTP
//   const handleRequestOtp = async (e) => {
//     e.preventDefault();
//     if (!cifNumber) {
//       toast.error("CIF not found. Please log in again.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const { data } = await axios.post(
//         `${BASE_URL}/accounts/pin/request-reset`,
//         { cifNumber }
//       );
//       toast.success(data || "OTP sent successfully!");
//       setStep(2);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Step 2: Verify OTP
//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     if (!otp) {
//       toast.error("Please enter OTP");
//       return;
//     }

//     try {
//       setLoading(true);
//       const { data } = await axios.post(
//         `${BASE_URL}/accounts/pin/verify-otp`,
//         { cifNumber, otp }
//       );
//       toast.success(data || "OTP verified successfully!");
//       setStep(3);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Step 3: Reset PIN
//   const handleResetPin = async (e) => {
//     e.preventDefault();

//     if (!newPin || !confirmPin) {
//       toast.error("Please fill all fields");
//       return;
//     }
//     if (newPin !== confirmPin) {
//       toast.error("PINs do not match");
//       return;
//     }
//     if (newPin.length !== 4 || isNaN(newPin)) {
//       toast.error("PIN must be a 4-digit number");
//       return;
//     }

//     try {
//       setLoading(true);
//       const { data } = await axios.post(`${BASE_URL}/accounts/pin/reset`, {
//         cifNumber,
//         otp,
//         newPin: parseInt(newPin),
//       });
//       toast.success(data || "PIN reset successfully!");
//       onCancel(); // close popup
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to reset PIN");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-2xl rounded-xl p-6 w-96 z-50">
//       <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">
//         Forgot PIN
//       </h3>

//       {/* Step 1: Request OTP */}
//       {step === 1 && (
//         <form onSubmit={handleRequestOtp} className="space-y-4 text-center">
//           <p className="text-gray-600 text-sm">
//             Click below to receive OTP for PIN reset.
//           </p>
//           <div className="flex justify-between mt-5">
//             <button
//               type="button"
//               onClick={onCancel}
//               className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
//             >
//               {loading ? "Sending..." : "Send OTP"}
//             </button>
//           </div>
//         </form>
//       )}

//       {/* Step 2: Verify OTP */}
//       {step === 2 && (
//         <form onSubmit={handleVerifyOtp} className="space-y-4">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Enter OTP
//           </label>
//           <input
//             type="text"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             placeholder="Enter 6-digit OTP"
//             maxLength={6}
//           />
//           <div className="flex justify-between mt-5">
//             <button
//               type="button"
//               onClick={onCancel}
//               className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
//             >
//               {loading ? "Verifying..." : "Verify OTP"}
//             </button>
//           </div>
//         </form>
//       )}

//       {/* Step 3: Reset PIN */}
//       {step === 3 && (
//         <form onSubmit={handleResetPin} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               New PIN
//             </label>
//             <input
//               type="password"
//               value={newPin}
//               onChange={(e) => setNewPin(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//               maxLength={4}
//               placeholder="Enter new 4-digit PIN"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Confirm New PIN
//             </label>
//             <input
//               type="password"
//               value={confirmPin}
//               onChange={(e) => setConfirmPin(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//               maxLength={4}
//               placeholder="Confirm new PIN"
//             />
//           </div>

//           <div className="flex justify-between mt-5">
//             <button
//               type="button"
//               onClick={onCancel}
//               className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
//             >
//               {loading ? "Resetting..." : "Reset PIN"}
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

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
      toast.success(data || "OTP verified successfully!");
      setStep(3);
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
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-2xl rounded-xl p-6 w-96 z-50">
      {!forgotMode ? (
        <>
          <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">
            Change Account PIN
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Old PIN
              </label>
              <input
                type="password"
                value={oldPin}
                onChange={(e) => setOldPin(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                maxLength={4}
                placeholder="Enter old 4-digit PIN"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New PIN
              </label>
              <input
                type="password"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                maxLength={4}
                placeholder="Enter new 4-digit PIN"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New PIN
              </label>
              <input
                type="password"
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                maxLength={4}
                placeholder="Confirm new PIN"
              />
            </div>

            <div className="flex justify-between mt-5">
              <button
                type="button"
                onClick={onCancel}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                {loading ? "Updating..." : "Update PIN"}
              </button>
            </div>

            <p
              onClick={() => setForgotMode(true)}
              className="text-blue-600 text-sm text-center mt-3 cursor-pointer hover:underline"
            >
              Forgot PIN?
            </p>
          </form>
        </>
      ) : (
        // ---------- FORGOT PIN POPUP ----------
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">
            Forgot PIN
          </h3>

          {step === 1 && (
            <div className="space-y-4">
              <p className="text-gray-600 text-sm text-center">
                Click below to request an OTP for PIN reset.
              </p>
              <button
                onClick={handleRequestOtp}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter OTP"
              />
              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <input
                type="password"
                value={forgotNewPin}
                onChange={(e) => setForgotNewPin(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                maxLength={4}
                placeholder="Enter new 4-digit PIN"
              />
              <input
                type="password"
                value={confirmForgotPin}
                onChange={(e) => setConfirmForgotPin(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                maxLength={4}
                placeholder="Confirm new PIN"
              />
              <button
                onClick={handleResetPin}
                disabled={loading}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
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
            className="w-full mt-4 text-gray-600 hover:underline"
          >
            Back to Change PIN
          </button>
        </div>
      )}
    </div>
  );
};

export default ChangePinForm;
