import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { loginRequest } from "../../redux/auth/slice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isAuthenticated, user, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ loginId: "", password: "" });

  const onChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!form.loginId.trim()) {
      toast.error("Customer ID / CIF Number is required.");
      return;
    }

    if (!form.password.trim()) {
      toast.error("Password is required.");
      return;
    }

    dispatch(
      loginRequest({
        loginId: form.loginId,
        password: form.password,
      })
    );
  };

  // ✅ Handle redirect and toast after successful login
  useEffect(() => {
    if (isAuthenticated && user) {
      toast.success("Login successful! Redirecting...");

      setTimeout(() => {
        if (user.status === "PENDING") navigate("/kyc-verification");
        else if (user.status === "ACTIVE") navigate("/dashboard");
        else navigate("/account-pending");
      }, 1000);
    }
  }, [isAuthenticated, user, navigate]);

  // ✅ Show toast for login failure
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
      <Toaster position="top-center" />
      <h1 className="text-3xl md:text-4xl font-semibold text-blue-500 mb-6 text-center">
        Welcome Back to BankMate
      </h1>

      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-100">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="loginId" className="text-sm font-medium text-gray-700">
              Customer ID / CIF Number
            </label>
            <input
              id="loginId"
              type="text"
              value={form.loginId}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition"
              placeholder="CIF15411580670245893"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter your CIF number from registration
            </p>
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-sm text-blue-700 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-700 hover:bg-blue-800 text-white py-2.5 mt-2 rounded-full font-semibold transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
                     5.291A7.962 7.962 0 014 12H0c0 
                     3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <p className="text-center text-sm text-gray-700">
          Don't have an account?{" "}
          <Link
            to="/signUp"
            className="text-blue-700 font-medium cursor-pointer hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>

      <p className="text-xs text-gray-500 mt-6 text-center">
        © {new Date().getFullYear()} BankMate. All rights reserved.
      </p>
    </div>
  );
};

export default Login;
