// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Transfer = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     fromAccount: "",
//     toAccount: "",
//     recipientName: "",
//     amount: "",
//     transferType: "IMMEDIATE",
//     description: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState({ type: "", text: "" });

//   const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081/api/v1";

//   const onChange = (e) => {
//     setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setMsg({ type: "", text: "" });
//     setLoading(true);

//     try {
//       // Replace /transfer with your actual backend API
//       await axios.post(`${API}/transfer`, form);
//       setMsg({ type: "success", text: "Transfer successful!" });
//       setTimeout(() => navigate("/dashboard"), 1500);
//     } catch (err) {
//       const serverMsg =
//         err?.response?.data?.message || "Transfer failed. Please check details.";
//       setMsg({ type: "error", text: serverMsg });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-gray-50 px-4 py-10">
//       <h1 className="text-3xl font-semibold text-blue-500 mb-6">
//         Make a Transfer
//       </h1>

//       <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200">
//         <form onSubmit={onSubmit} className="flex flex-col gap-4">
//           {/* From Account */}
//           <div>
//             <label htmlFor="fromAccount" className="text-sm font-medium text-gray-700">
//               From Account
//             </label>
//             <select
//               id="fromAccount"
//               value={form.fromAccount}
//               onChange={onChange}
//               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//               required
//             >
//               <option value="">Select Account</option>
//               <option value="1234567890">Savings - 1234567890</option>
//               <option value="9876543210">Current - 9876543210</option>
//             </select>
//           </div>

//           {/* To Account */}
//           <div>
//             <label htmlFor="toAccount" className="text-sm font-medium text-gray-700">
//               Recipient Account Number
//             </label>
//             <input
//               id="toAccount"
//               type="text"
//               value={form.toAccount}
//               onChange={onChange}
//               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//               placeholder="Enter recipient account number"
//               required
//             />
//           </div>

//           {/* Recipient Name */}
//           <div>
//             <label htmlFor="recipientName" className="text-sm font-medium text-gray-700">
//               Recipient Name
//             </label>
//             <input
//               id="recipientName"
//               type="text"
//               value={form.recipientName}
//               onChange={onChange}
//               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//               placeholder="Enter recipient name"
//               required
//             />
//           </div>

//           {/* Amount */}
//           <div>
//             <label htmlFor="amount" className="text-sm font-medium text-gray-700">
//               Amount
//             </label>
//             <input
//               id="amount"
//               type="number"
//               min={1}
//               value={form.amount}
//               onChange={onChange}
//               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//               placeholder="Enter amount"
//               required
//             />
//           </div>

//           {/* Transfer Type */}
//           <div>
//             <label htmlFor="transferType" className="text-sm font-medium text-gray-700">
//               Transfer Type
//             </label>
//             <select
//               id="transferType"
//               value={form.transferType}
//               onChange={onChange}
//               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//             >
//               <option value="IMMEDIATE">Immediate</option>
//               <option value="SCHEDULED">Scheduled</option>
//             </select>
//           </div>

//           {/* Description */}
//           <div>
//             <label htmlFor="description" className="text-sm font-medium text-gray-700">
//               Description (Optional)
//             </label>
//             <textarea
//               id="description"
//               value={form.description}
//               onChange={onChange}
//               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//               placeholder="Enter description"
//               rows={2}
//             ></textarea>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-blue-700 hover:bg-blue-800 text-white py-2 mt-2 rounded-full font-semibold transition disabled:opacity-70"
//           >
//             {loading ? "Processing..." : "Transfer"}
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
//       </div>
//     </div>
//   );
// };

// export default Transfer;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Transfer = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fromAccountId: "",
    toAccountNumber: "",
    amount: "",
    description: "",
  });
  const [accounts, setAccounts] = useState([]); // user's accounts
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081/api/v1";

  // Fetch user's accounts to populate "From Account" dropdown
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await axios.get(`${API}/accounts`); // you need API to get user's accounts
        setAccounts(res.data);
      } catch (err) {
        console.error("Failed to fetch accounts", err);
      }
    };
    fetchAccounts();
  }, []);

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });
    setLoading(true);

    try {
      await axios.post(`${API}/transactions/transfer`, form);
      setMsg({ type: "success", text: "Transfer successful!" });
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      const serverMsg =
        err?.response?.data?.message || "Transfer failed. Check the details.";
      setMsg({ type: "error", text: serverMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 px-4 py-10">
      <h1 className="text-3xl font-semibold text-blue-700 mb-6">Make a Transfer</h1>

      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {/* From Account */}
          <div>
            <label htmlFor="fromAccountId" className="text-sm font-medium text-gray-700">
              From Account
            </label>
            <select
              id="fromAccountId"
              value={form.fromAccountId}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">Select Account</option>
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.accountNumber} - {acc.accountType}
                </option>
              ))}
            </select>
          </div>

          {/* To Account Number */}
          <div>
            <label htmlFor="toAccountNumber" className="text-sm font-medium text-gray-700">
              Recipient Account Number
            </label>
            <input
              id="toAccountNumber"
              type="text"
              value={form.toAccountNumber}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter recipient account number"
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              id="amount"
              type="number"
              min={1}
              value={form.amount}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter amount"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description (Optional)
            </label>
            <textarea
              id="description"
              value={form.description}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter description"
              rows={2}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-700 hover:bg-blue-800 text-white py-2 mt-2 rounded-full font-semibold transition disabled:opacity-70"
          >
            {loading ? "Processing..." : "Transfer"}
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
      </div>
    </div>
  );
};

export default Transfer;
