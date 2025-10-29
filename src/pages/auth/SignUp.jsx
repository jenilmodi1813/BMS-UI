import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest, clearError } from "../../redux/auth/slice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, user, error } = useSelector((state) => state.auth);

  const defaultFormData = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    password: "",
    address: "",
    dob: "",
    gender: "",
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState({});

  // ✅ Validation logic (unchanged)
  const validate = () => {
    let newErrors = {};

    if (!/^[A-Za-z]{2,50}$/.test(formData.firstName))
      newErrors.firstName = "First name must be 2–50 letters.";

    if (!/^[A-Za-z]{2,50}$/.test(formData.lastName))
      newErrors.lastName = "Last name must be 2–50 letters.";

    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email format.";

    if (!/^\d{10}$/.test(formData.phoneNo))
      newErrors.phoneNo = "Phone number must be 10 digits.";

    if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters.";

    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.dob) newErrors.dob = "Date of Birth is required.";
    if (!formData.gender) newErrors.gender = "Please select gender.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNo" && value && !/^\d*$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(registerRequest(formData));
    navigate("/login");
  };

  useEffect(() => {
    if (!loading && user && !error) {
      toast.success("Customer registered successfully!");
      setFormData(defaultFormData);
      navigate("/login");
    }

    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [user, error, navigate, dispatch]);

  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
            Customer Registration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className={`w-full border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className={`w-full border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  className={`w-full border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  placeholder="Enter 10-digit number"
                  maxLength="10"
                  className={`w-full border ${
                    errors.phoneNo ? "border-red-500" : "border-gray-300"
                  } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.phoneNo && (
                  <p className="text-red-500 text-sm mt-1">{errors.phoneNo}</p>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`w-full border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                placeholder="Enter your full address"
                className={`w-full border ${
                  errors.address ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              ></textarea>
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            {/* DOB & Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className={`w-full border ${
                    errors.dob ? "border-red-500" : "border-gray-300"
                  } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.dob && (
                  <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full border ${
                    errors.gender ? "border-red-500" : "border-gray-300"
                  } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                >
                  <option value="">Select gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md disabled:opacity-70"
            >
              {loading ? "Registering..." : "Register Now"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
