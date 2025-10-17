// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { login } from "../../utils/auth";

// const Login = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState({ type: "", text: "" });

//   const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081/api/v1/";

//   const onChange = (e) => {
//     setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setMsg({ type: "", text: "" });
//     setLoading(true);

//     try {
//       const res = await axios.post(`${API}/auth/login`, form);
//       setMsg({ type: "success", text: "Login successful!" });

//       // store token if needed
//       // localStorage.setItem("token", res.data.token);

//       // login(response.data.token); // save token
//       // setIsLogin(true); // update App state
//       // navigate("/dashboard");

//       setTimeout(() => navigate("/dashboard"), 1500);
//     } catch (err) {
//       const serverMsg =
//         err?.response?.data?.message ||
//         "Login failed. Please check your credentials.";
//       setMsg({ type: "error", text: serverMsg });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
//       {/* Header */}
//       <h1 className="text-3xl md:text-4xl font-semibold text-blue-600 mb-6 text-center">
//         Welcome Back to SecureBank
//       </h1>

//       {/* Card */}
//       <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-100">
//         <form onSubmit={onSubmit} className="flex flex-col gap-4">
//           {/* Email */}
//           <div>
//             <label htmlFor="email" className="text-sm font-medium text-gray-700">
//               Email Address
//             </label>
//             <input
//               id="email"
//               type="email"
//               value={form.email}
//               onChange={onChange}
//               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//               placeholder="Enter your registered email"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label htmlFor="password" className="text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               value={form.password}
//               onChange={onChange}
//               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           {/* Forgot password link */}
//           <div className="flex justify-end">
//             <Link
//               to="/forgot-password"
//               className="text-sm text-blue-700 hover:underline"
//             >
//               Forgot Password?
//             </Link>
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-blue-700 hover:bg-blue-800 text-white py-2 mt-2 rounded-full font-semibold transition disabled:opacity-70"
//           >
//             {loading ? "Signing in..." : "Sign in"}
//           </button>
//         </form>

//         {/* Message */}
//         {msg.text && (
//           <p
//             className={`mt-3 text-sm text-center ${
//               msg.type === "error" ? "text-red-600" : "text-green-600"
//             }`}
//           >
//             {msg.text}
//           </p>
//         )}

//         {/* Divider */}
//         <div className="flex items-center my-4">
//           <hr className="flex-grow border-gray-300" />
//           <span className="px-2 text-gray-500 text-sm">or</span>
//           <hr className="flex-grow border-gray-300" />
//         </div>

//         {/* Redirect */}
//         <p className="text-center text-sm text-gray-700">
//           Don’t have an account?{" "}
//           <Link
//             to="/signUp"
//             className="text-blue-700 font-medium cursor-pointer hover:underline"
//           >
//             Create one
//           </Link>
//         </p>
//       </div>

//       {/* Footer Note */}
//       <p className="text-xs text-gray-500 mt-6">
//         © {new Date().getFullYear()} SecureBank. All rights reserved.
//       </p>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { saveUser } from "../../utils/auth";

const Login = ({ setIsLogin }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ customerId: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081/api/v1";

  // Allow only numbers, max 10 digits
  const onChange = (e) => {
    const { id, value } = e.target;
    if (id === "customerId") {
      // only digits, no letters/symbols
      if (/^\d{0,10}$/.test(value)) {
        setForm((prev) => ({ ...prev, [id]: value }));
      }
    } else {
      setForm((prev) => ({ ...prev, [id]: value }));
    }
  };

  const validateCustomerId = (id) => /^[0-9]{10}$/.test(id); // exactly 10 digits

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    if (!validateCustomerId(form.customerId)) {
      setMsg({ type: "error", text: "Customer ID must be exactly 10 digits." });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API}/auth/login`, form);

      const userData = {
        id: res.data.id,
        customerId: res.data.customerId,
        role: res.data.role,
        status: res.data.status,
      };
      saveUser(userData);

      setIsLogin(true);
      setMsg({ type: "success", text: "Login successful!" });
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      const serverMsg =
        err?.response?.data?.message ||
        "Login failed. Please check your Customer ID and password.";
      setMsg({ type: "error", text: serverMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
      <h1 className="text-3xl md:text-4xl font-semibold text-blue-500 mb-6 text-center">
        Welcome Back to BankMate
      </h1>

      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-100">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {/* Customer ID */}
          <div>
            <label htmlFor="customerId" className="text-sm font-medium text-gray-700">
              Customer ID
            </label>
            <input
              id="customerId"
              type="text"
              value={form.customerId}
              onChange={onChange}
              maxLength={10}
              inputMode="numeric"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your 10-digit Customer ID"
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
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-sm text-blue-700 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-700 hover:bg-blue-800 text-white py-2 mt-2 rounded-full font-semibold transition disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {msg.text && (
          <p
            className={`mt-3 text-sm text-center ${
              msg.type === "error" ? "text-red-600" : "text-green-600"
            }`}
          >
            {msg.text}
          </p>
        )}

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <p className="text-center text-sm text-gray-700">
          Don’t have an account?{" "}
          <Link
            to="/signUp"
            className="text-blue-700 font-medium cursor-pointer hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>

      <p className="text-xs text-gray-500 mt-6">
        © {new Date().getFullYear()} SecureBank. All rights reserved.
      </p>
    </div>
  );
};

export default Login;

