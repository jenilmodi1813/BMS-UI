import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    phoneNo: "",
    currentPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081/api/v1";

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });
    setLoading(true);

    try {
      await axios.patch(`${API}/auth/change-password`, form);
      setMsg({ type: "success", text: "Password updated successfully!" });
      setTimeout(() => navigate("/login"), 1500); // redirect to login
    } catch (err) {
      const serverMsg =
        err?.response?.data?.message || "Failed to update password. Please check your details.";
      setMsg({ type: "error", text: serverMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
      <h1 className="text-3xl md:text-4xl font-semibold text-blue-500 mb-6 text-center">
        Reset Your Password
      </h1>

      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-100">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNo" className="text-sm font-medium text-gray-700">
              Registered Phone Number
            </label>
            <input
              id="phoneNo"
              type="text"
              value={form.phoneNo}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your phone number"
              required
              maxLength={10}
            />
          </div>

          {/* Current Password */}
          <div>
            <label htmlFor="currentPassword" className="text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              id="currentPassword"
              type="password"
              value={form.currentPassword}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter current password"
              required
              minLength={8}
            />
          </div>

          {/* New Password */}
          <div>
            <label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              value={form.newPassword}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter new password"
              required
              minLength={8}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-700 hover:bg-blue-800 text-white py-2 mt-2 rounded-full font-semibold transition disabled:opacity-70"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        {/* Message */}
        {msg.text && (
          <p
            className={`mt-3 text-sm text-center ${
              msg.type === "error" ? "text-red-600" : "text-green-600"
            }`}
          >
            {msg.text}
          </p>
        )}

        {/* Back to Login */}
        <p className="text-center text-sm text-gray-700 mt-4">
          Remembered your password?{" "}
          <span
            className="text-blue-700 font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
