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
    initialDeposit: "",
    occupationType: "",
    incomeSourceType: "",
    grossAnnualIncome: "",
    nomineeName: "",
    relationship: "",
    age: "",
    contactNumber: "",
  });

  const [loading, setLoading] = useState(false);

  const BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const {
      accountType,
      documentType,
      documentNumber,
      initialDeposit,
      occupationType,
      incomeSourceType,
      grossAnnualIncome,
      nomineeName,
      relationship,
      age,
    } = formData;

    if (!accountType) return toast.error("Please select account type");
    if (!documentType) return toast.error("Please select document type");
    if (!documentNumber) return toast.error("Please enter document number");
    if (!initialDeposit) return toast.error("Please enter initial deposit");
    if (!occupationType) return toast.error("Please select occupation type");
    if (!incomeSourceType) return toast.error("Please select income source");
    if (!grossAnnualIncome) return toast.error("Please enter annual income");
    if (!nomineeName) return toast.error("Please enter nominee name");
    if (!relationship) return toast.error("Please enter relationship");
    if (!age) return toast.error("Please enter nominee age");

    const deposit = parseFloat(initialDeposit);
    const minDeposit = accountType === "CURRENT" ? 10000 : 5000;
    if (deposit < minDeposit)
      return toast.error(
        `Minimum deposit for ${accountType} account is ₹${minDeposit}`
      );

    if (
      documentType === "PAN" &&
      !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(documentNumber)
    ) {
      return toast.error("Invalid PAN format (e.g., ABCDE1234F)");
    }
    if (documentType === "AADHAAR" && !/^\d{12}$/.test(documentNumber)) {
      return toast.error("Aadhaar must be a 12-digit number");
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

    try {
      setLoading(true);
      const res = await axios.post(endpoint, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Open a New Account
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Type */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Account Type <span className="text-red-500">*</span>
          </label>
          <select
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="SAVINGS">Savings Account</option>
            <option value="CURRENT">Current Account</option>
          </select>
        </div>

        {/* Business Name (only for Current Account) */}
        {formData.accountType === "CURRENT" && (
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Business Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter business name"
            />
          </div>
        )}

        {/* Initial Deposit */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Initial Deposit <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="initialDeposit"
            value={formData.initialDeposit}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Minimum ₹${minDeposit}`}
            min={minDeposit}
          />
        </div>

        {/* Document Type */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Document Type <span className="text-red-500">*</span>
          </label>
          <select
            name="documentType"
            value={formData.documentType}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="AADHAAR">Aadhaar</option>
            <option value="PAN">PAN</option>
          </select>
        </div>

        {/* Document Number */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Document Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="documentNumber"
            value={formData.documentNumber}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={
              formData.documentType === "PAN" ? "ABCDE1234F" : "123456789012"
            }
          />
        </div>

        {/* Occupation Type */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Occupation Type <span className="text-red-500">*</span>
          </label>
          <select
            name="occupationType"
            value={formData.occupationType}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="STUDENT">Student</option>
            <option value="JOB">Job</option>
            <option value="UNEMPLOYED">Unemployed</option>
            <option value="BUSINESS_OWNER">Business Owner</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        {/* Income Source */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Income Source <span className="text-red-500">*</span>
          </label>
          <select
            name="incomeSourceType"
            value={formData.incomeSourceType}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="SALARY">Salary</option>
            <option value="BUSINESS">Business</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        {/* Annual Income */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Gross Annual Income <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="grossAnnualIncome"
            value={formData.grossAnnualIncome}
            onChange={handleChange}
            placeholder="Enter amount in ₹"
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Nominee Name */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Nominee Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="nomineeName"
            value={formData.nomineeName}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter nominee name"
          />
        </div>

        {/* Relationship */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Relationship <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="relationship"
            value={formData.relationship}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Father, Wife"
          />
        </div>

        {/* Nominee Age */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Nominee Age <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter age"
          />
        </div>

        {/* Nominee Contact */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Nominee Contact (Optional)
          </label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="10-digit mobile number"
          />
        </div>

        {/* Submit Button (full width) */}
        <div className="md:col-span-2">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 shadow-md"
            }`}
          >
            {loading ? "Creating..." : "Create Account"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default AccountForm;
