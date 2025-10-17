import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    password: "",
    address: "",
    dob: "",
    gender: "",
    accountType: "",
    balance: "",
  });

  const [errors, setErrors] = useState({});

  const accountTypes = ["SAVINGS", "CURRENT", "FIXED_DEPOSIT"];

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

    if (!formData.accountType)
      newErrors.accountType = "Account type is required.";

    if (!formData.balance) {
      newErrors.balance = "Balance is required.";
    } else if (isNaN(formData.balance) || Number(formData.balance) < 0) {
      newErrors.balance = "Balance must be a positive number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Phone number: only digits
    if (name === "phoneNo" && value && !/^\d*$/.test(value)) return;

    // Balance: only numbers & decimal
    if (name === "balance" && value && !/^\d*\.?\d*$/.test(value)) return;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("✅ Form Data Submitted:", formData);
      // TODO: Call your backend API here
      navigate("/login"); // redirect to login page
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Customer Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                required
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
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
                required
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                required
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
                required
              />
              {errors.phoneNo && (
                <p className="text-red-500 text-sm mt-1">{errors.phoneNo}</p>
              )}
            </div>
          </div>

          {/* Password */}
          <div>
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
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Address */}
          <div>
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
              required
            ></textarea>
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          {/* DOB & Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                required
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

          {/* Account Type & Balance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Type
              </label>
              <select
                name="accountType"
                value={formData.accountType}
                onChange={handleChange}
                className={`w-full border ${
                  errors.accountType ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                required
              >
                <option value="">Select account type</option>
                {accountTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.accountType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.accountType}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Initial Balance
              </label>
              <input
                type="text"
                name="balance"
                value={formData.balance}
                onChange={handleChange}
                placeholder="Enter initial balance"
                className={`w-full border ${
                  errors.balance ? "border-red-500" : "border-gray-300"
                } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                required
              />
              {errors.balance && (
                <p className="text-red-500 text-sm mt-1">{errors.balance}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md"
          >
            Register Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
