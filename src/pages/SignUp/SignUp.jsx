import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


const SignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    password: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  // Your API base URL
  const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081/api/v1";

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });
    setLoading(true);

    try {
      // POST request to backend
      console.log("Register Payload:", form);
      await axios.post(`${API}/auth/register`, form);
      setMsg({ type: "success", text: "Account created successfully!" });
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      const serverMsg =
        err?.response?.data?.message ||
        "Signup failed. Please check your details.";
      setMsg({ type: "error", text: serverMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-semibold text-blue-500 mb-6 text-center">
        Create Your Bank Account
      </h1>

      {/* Card */}
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-100">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={form.firstName}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter first name"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={form.lastName}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter last name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
              required
              autoComplete="username"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNo" className="text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              id="phoneNo"
              type="number"
              maxLength={10}
              value={form.phoneNo}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter 10-digit phone number"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={onChange}
              minLength={8}
              autoComplete="new-password" 
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="Create a strong password"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              id="gender"
              value={form.gender}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          {/* Terms */}
          <p className="text-xs text-gray-600 leading-4 mt-1">
            By creating an account, you agree to our{" "}
            <span className="text-blue-700 cursor-pointer hover:underline">Terms</span>{" "}
            and{" "}
            <span className="text-blue-700 cursor-pointer hover:underline">
              Privacy Policy
            </span>
            .
          </p>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-700 hover:bg-blue-800 text-white py-2 mt-2 rounded-full font-semibold transition disabled:opacity-70"
          >
            {loading ? "Creating Account..." : "Create Account"}
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

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Login Redirect */}
        <p className="text-center text-sm text-gray-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-700 font-medium cursor-pointer hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
