// import React, { useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import toast from "react-hot-toast";

// const AccountForm = ({ onSuccess }) => {
//   const auth = JSON.parse(localStorage.getItem("auth"));
//   const cifNumber = auth?.customer?.cifNumber || "";

//   const [formData, setFormData] = useState({
//     accountType: "",
//     businessName: "",
//     documentType: "",
//     documentNumber: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const BASE_URL =
//     import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.accountType || !formData.documentType || !formData.documentNumber) {
//       toast.error("Please fill all required fields");
//       return;
//     }

//     const payload = {
//       cifNumber,
//       accountType: formData.accountType,
//       kycDetails: {
//         documentType: formData.documentType,
//         documentNumber: formData.documentNumber,
//       },
//     };

//     if (formData.accountType === "CURRENT") {
//       payload.businessName = formData.businessName;
//     }

//     const endpoint =
//       formData.accountType === "SAVINGS"
//         ? `${BASE_URL}/accounts/savings`
//         : `${BASE_URL}/accounts/current`;

//     try {
//       setLoading(true);
//       const res = await axios.post(endpoint, payload);
//       toast.success(`Account created successfully: ${res.data.accountNumber}`);
//       onSuccess?.(); // Refresh parent
//       setFormData({
//         accountType: "",
//         businessName: "",
//         documentType: "",
//         documentNumber: "",
//       });
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to create account");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="grid gap-4">
//       {/* Account Type */}
//       <div>
//         <label className="block text-gray-700 mb-1 font-medium">
//           Account Type
//         </label>
//         <select
//           name="accountType"
//           value={formData.accountType}
//           onChange={handleChange}
//           className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-400"
//         >
//           <option value="">Select</option>
//           <option value="SAVINGS">Savings Account</option>
//           <option value="CURRENT">Current Account</option>
//         </select>
//       </div>

//       {/* Business Name */}
//       {formData.accountType === "CURRENT" && (
//         <div>
//           <label className="block text-gray-700 mb-1 font-medium">
//             Business Name
//           </label>
//           <input
//             type="text"
//             name="businessName"
//             value={formData.businessName}
//             onChange={handleChange}
//             className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Enter business name"
//           />
//         </div>
//       )}

//       {/* Document Type */}
//       <div>
//         <label className="block text-gray-700 mb-1 font-medium">
//           Document Type
//         </label>
//         <select
//           name="documentType"
//           value={formData.documentType}
//           onChange={handleChange}
//           className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-400"
//         >
//           <option value="">Select</option>
//           <option value="AADHAAR">Aadhaar</option>
//           <option value="PAN">PAN</option>
//         </select>
//       </div>

//       {/* Document Number */}
//       <div>
//         <label className="block text-gray-700 mb-1 font-medium">
//           Document Number
//         </label>
//         <input
//           type="text"
//           name="documentNumber"
//           value={formData.documentNumber}
//           onChange={handleChange}
//           className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-400"
//           placeholder={
//             formData.documentType === "PAN" ? "ABCDE1234F" : "123456789012"
//           }
//         />
//       </div>

//       {/* Submit Button */}
//       <motion.button
//         whileHover={{ scale: 1.03 }}
//         whileTap={{ scale: 0.97 }}
//         disabled={loading}
//         className={`w-full py-3 rounded-lg text-white font-semibold transition ${
//           loading
//             ? "bg-gray-400 cursor-not-allowed"
//             : "bg-blue-600 hover:bg-blue-700"
//         }`}
//       >
//         {loading ? "Creating..." : "Create Account"}
//       </motion.button>
//     </form>
//   );
// };

// export default AccountForm;

import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const AccountForm = ({ onSuccess }) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const cifNumber = auth?.customer?.cifNumber || "";
  const token = auth?.tokens?.accessToken || "";

  const [formData, setFormData] = useState({
    accountType: "",
    businessName: "",
    documentType: "",
    documentNumber: "",
    documentFile: null,
    initialDeposit: "",
    occupationType: "",
    incomeSourceType: "",
    grossAnnualIncome: "",
    nomineeName: "",
    relationship: "",
    age: "",
    contactNumber: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, documentFile: file });
      setFormErrors((prev) => ({ ...prev, documentFile: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    const {
      accountType,
      businessName,
      documentType,
      documentNumber,
      initialDeposit,
      occupationType,
      incomeSourceType,
      grossAnnualIncome,
      nomineeName,
      relationship,
      age,
      contactNumber,
    } = formData;

    if (!accountType) errors.accountType = "Please select account type";
    if (accountType === "CURRENT" && !businessName.trim())
      errors.businessName = "Business name is required";

    if (!documentType) errors.documentType = "Please select document type";
    if (!formData.documentFile) errors.documentFile = "Please upload document";
    if (!documentNumber.trim()) {
      errors.documentNumber = "Document number is required";
    } else {
      if (
        documentType === "PAN" &&
        !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(documentNumber)
      ) {
        errors.documentNumber = "Invalid PAN format (e.g., ABCDE1234F)";
      }
      if (documentType === "AADHAAR" && !/^\d{12}$/.test(documentNumber)) {
        errors.documentNumber = "Aadhaar must be a 12-digit number";
      }
    }

    if (!initialDeposit || Number(initialDeposit) <= 0)
      errors.initialDeposit = "Initial deposit is required";

    const minDeposit = accountType === "CURRENT" ? 10000 : 5000;
    if (Number(initialDeposit) < minDeposit)
      errors.initialDeposit = `Minimum deposit for ${accountType || "this"} account is ₹${minDeposit}`;

    if (!occupationType) errors.occupationType = "Please select occupation type";
    if (!incomeSourceType)
      errors.incomeSourceType = "Please select income source type";
    if (!grossAnnualIncome || Number(grossAnnualIncome) <= 0)
      errors.grossAnnualIncome = "Please enter valid annual income";

    if (!nomineeName.trim()) errors.nomineeName = "Nominee name is required";
    if (!relationship.trim())
      errors.relationship = "Relationship is required";
    if (!age || Number(age) <= 0)
      errors.age = "Please enter valid nominee age";
    if (contactNumber && !/^\d{10}$/.test(contactNumber))
      errors.contactNumber = "Contact number must be 10 digits";

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the highlighted errors before submitting");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      cifNumber,
      accountType: formData.accountType,
      initialDeposit: parseFloat(formData.initialDeposit),
      occupationType: formData.occupationType,
      incomeSourceType: formData.incomeSourceType,
      grossAnnualIncome: parseFloat(formData.grossAnnualIncome),
      kycDetails: {
        documentType: formData.documentType,
        documentNumber: formData.documentNumber,
      },
      nominee: {
        nomineeName: formData.nomineeName,
        relationship: formData.relationship,
        age: parseInt(formData.age),
        contactNumber: formData.contactNumber || "",
      },
    };

    if (formData.accountType === "CURRENT") {
      payload.businessName = formData.businessName;
    }

    const endpoint =
      formData.accountType === "SAVINGS"
        ? `${BASE_URL}/accounts/savings`
        : `${BASE_URL}/accounts/current`;

    const formDataToSend = new FormData();
    // Append file first (sometimes helps with streaming parsers)
    if (formData.documentFile) {
      formDataToSend.append("file", formData.documentFile);
    }

    const jsonBlob = new Blob([JSON.stringify(payload)], {
      type: "application/json",
    });
    // Append request with explicit filename to ensure correct Content-Type handling
    formDataToSend.append("request", jsonBlob, "request.json");

    try {
      setLoading(true);
      const res = await axios.post(endpoint, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Browser sets Content-Type to multipart/form-data automatically with boundary
        },
      });

      const message =
        res.data?.message ||
        res.data?.status ||
        res.data?.info ||
        "Account created successfully";

      toast.success(
        `${message}. A confirmation email has been sent to your registered email.`
      );

      onSuccess?.();
      setFormData({
        accountType: "",
        businessName: "",
        documentType: "",
        documentNumber: "",
        documentFile: null,
        initialDeposit: "",
        occupationType: "",
        incomeSourceType: "",
        grossAnnualIncome: "",
        nomineeName: "",
        relationship: "",
        age: "",
        contactNumber: "",
      });
    } catch (err) {
      console.error("Account creation error:", err);
      const backendMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.response?.data?.details ||
        "Something went wrong while creating the account";

      if (backendMsg.toLowerCase().includes("already")) {
        toast.error("Account already exists for this customer.");
      } else {
        toast.error(backendMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const minDeposit = formData.accountType === "CURRENT" ? 10000 : 5000;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Open a New Account
        </h2>
        <p className="text-center text-slate-500 mb-8">
          Start your banking journey with us today
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Account Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-indigo-900 border-b border-indigo-100 pb-2 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">1</span>
              Account Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-slate-700 mb-2 font-medium text-sm">
                  Account Type <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="accountType"
                    value={formData.accountType}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none"
                  >
                    <option value="">Select Account Type</option>
                    <option value="SAVINGS">Savings Account</option>
                    <option value="CURRENT">Current Account</option>
                  </select>
                  <div className="absolute right-3 top-3.5 pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
                {formErrors.accountType && (
                  <p className="text-rose-500 text-xs mt-1 font-medium">{formErrors.accountType}</p>
                )}
              </div>

              {formData.accountType === "CURRENT" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  <label className="block text-slate-700 mb-2 font-medium text-sm">
                    Business Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Enter business name"
                  />
                  {formErrors.businessName && (
                    <p className="text-rose-500 text-xs mt-1 font-medium">{formErrors.businessName}</p>
                  )}
                </motion.div>
              )}

              <div>
                <label className="block text-slate-700 mb-2 font-medium text-sm">
                  Initial Deposit <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-slate-400">₹</div>
                  <input
                    type="number"
                    name="initialDeposit"
                    value={formData.initialDeposit}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 pl-8 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder={`Min. ₹${minDeposit}`}
                    min={minDeposit}
                  />
                </div>
                {formErrors.initialDeposit && (
                  <p className="text-rose-500 text-xs mt-1 font-medium">{formErrors.initialDeposit}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Personal & Income */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-indigo-900 border-b border-indigo-100 pb-2 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">2</span>
              Personal & Income
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-slate-700 mb-2 font-medium text-sm">
                  Occupation Type <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="occupationType"
                    value={formData.occupationType}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none"
                  >
                    <option value="">Select Occupation</option>
                    <option value="STUDENT">Student</option>
                    <option value="JOB">Job / Service</option>
                    <option value="UNEMPLOYED">Unemployed</option>
                    <option value="BUSINESS_OWNER">Business Owner</option>
                    <option value="OTHER">Other</option>
                  </select>
                  <div className="absolute right-3 top-3.5 pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
                {formErrors.occupationType && (
                  <p className="text-rose-500 text-xs mt-1 font-medium">{formErrors.occupationType}</p>
                )}
              </div>

              <div>
                <label className="block text-slate-700 mb-2 font-medium text-sm">
                  Income Source <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="incomeSourceType"
                    value={formData.incomeSourceType}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none"
                  >
                    <option value="">Select Source</option>
                    <option value="SALARY">Salary</option>
                    <option value="BUSINESS">Business Income</option>
                    <option value="OTHER">Other</option>
                  </select>
                  <div className="absolute right-3 top-3.5 pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
                {formErrors.incomeSourceType && (
                  <p className="text-rose-500 text-xs mt-1 font-medium">{formErrors.incomeSourceType}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-700 mb-2 font-medium text-sm">
                  Gross Annual Income <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-slate-400">₹</div>
                  <input
                    type="number"
                    name="grossAnnualIncome"
                    value={formData.grossAnnualIncome}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 pl-8 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Enter annual income"
                  />
                </div>
                {formErrors.grossAnnualIncome && (
                  <p className="text-rose-500 text-xs mt-1 font-medium">{formErrors.grossAnnualIncome}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: KYC Documents */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-indigo-900 border-b border-indigo-100 pb-2 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">3</span>
              KYC Documents
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-slate-700 mb-2 font-medium text-sm">
                  Document Type <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="documentType"
                    value={formData.documentType}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none"
                  >
                    <option value="">Select Document</option>
                    <option value="AADHAAR">Aadhaar Card</option>
                    <option value="PAN">PAN Card</option>
                  </select>
                  <div className="absolute right-3 top-3.5 pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
                {formErrors.documentType && (
                  <p className="text-rose-500 text-xs mt-1 font-medium">{formErrors.documentType}</p>
                )}
              </div>

              <div>
                <label className="block text-slate-700 mb-2 font-medium text-sm">
                  Document Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="documentNumber"
                  value={formData.documentNumber}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder={
                    formData.documentType === "PAN" ? "ABCDE1234F" : "123456789012"
                  }
                />
                {formErrors.documentNumber && (
                  <p className="text-rose-500 text-xs mt-1 font-medium">{formErrors.documentNumber}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-700 mb-2 font-medium text-sm">
                  Upload Document (PDF) <span className="text-rose-500">*</span>
                </label>
                <div className="relative group">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf"
                    className="w-full bg-slate-50 border border-dashed border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                  />
                </div>
                {formErrors.documentFile && (
                  <p className="text-rose-500 text-xs mt-1 font-medium">{formErrors.documentFile}</p>
                )}
                <p className="text-xs text-slate-400 mt-1 ml-1">Accepted format: PDF only</p>
              </div>
            </div>
          </div>

          {/* Section 4: Nominee Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-indigo-900 border-b border-indigo-100 pb-2 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">4</span>
              Nominee Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-slate-700 mb-2 font-medium text-sm">
                  Nominee Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="nomineeName"
                  value={formData.nomineeName}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Enter full name"
                />
                {formErrors.nomineeName && (
                  <p className="text-rose-500 text-xs mt-1 font-medium">{formErrors.nomineeName}</p>
                )}
              </div>

              <div>
                <label className="block text-slate-700 mb-2 font-medium text-sm">
                  Relationship <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="e.g. Spouse, Parent"
                />
                {formErrors.relationship && (
                  <p className="text-rose-500 text-xs mt-1 font-medium">{formErrors.relationship}</p>
                )}
              </div>

              <div>
                <label className="block text-slate-700 mb-2 font-medium text-sm">
                  Nominee Age <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Age"
                />
                {formErrors.age && (
                  <p className="text-rose-500 text-xs mt-1 font-medium">{formErrors.age}</p>
                )}
              </div>

              <div>
                <label className="block text-slate-700 mb-2 font-medium text-sm">
                  Contact Number
                </label>
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="10-digit mobile number"
                  maxLength={10}
                />
                {formErrors.contactNumber && (
                  <p className="text-rose-500 text-xs mt-1 font-medium">{formErrors.contactNumber}</p>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4">
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.2)" }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all ${loading
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Open Account"
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AccountForm;
