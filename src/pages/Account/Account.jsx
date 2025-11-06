// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { motion } from "framer-motion";
// // import { FaSearch, FaTrashAlt, FaPlus, FaMoneyBillWave } from "react-icons/fa";
// // import toast from "react-hot-toast";
// // import AccountForm from "../../components/Account/AccountForm";

// // const Account = () => {
// //   const [accounts, setAccounts] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [showForm, setShowForm] = useState(false);
// //   const [loading, setLoading] = useState(false);

// //   const BASE_URL =
// //     import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";
// //   const cifNumber =
// //     JSON.parse(localStorage.getItem("auth"))?.customer?.cifNumber || "";

// //   // Fetch accounts
// //   const fetchAccounts = async () => {
// //     if (!cifNumber) return;
// //     try {
// //       setLoading(true);
// //       const { data } = await axios.get(`${BASE_URL}/accounts/cif/${cifNumber}`);
// //       setAccounts(data);
// //     } catch (err) {
// //       toast.error("Failed to fetch accounts");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchAccounts();
// //   }, []);

// //   // Delete account
// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Are you sure you want to delete this account?")) return;
// //     try {
// //       await axios.delete(`${BASE_URL}/accounts/${id}`);
// //       toast.success("Account deleted successfully!");
// //       fetchAccounts();
// //     } catch (err) {
// //       toast.error("Failed to delete account");
// //     }
// //   };

// //   // Filter by account number
// //   const filteredAccounts = accounts.filter((acc) =>
// //     acc.accountNumber.toLowerCase().includes(search.toLowerCase())
// //   );

// //   return (
// //     <motion.div
// //       className="p-6 bg-gray-50 min-h-screen"
// //       initial={{ opacity: 0 }}
// //       animate={{ opacity: 1 }}
// //     >
// //       {/* Header */}
// //       <div className="flex justify-between items-center mb-6">
// //         <h2 className="text-3xl font-semibold text-gray-800">My Accounts</h2>
// //         <button
// //           onClick={() => setShowForm(!showForm)}
// //           className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition-all"
// //         >
// //           <FaPlus /> {showForm ? "Close Form" : "Open New Account"}
// //         </button>
// //       </div>

// //       {/* Form */}
// //       {showForm && (
// //         <motion.div
// //           className="bg-white rounded-xl shadow-lg p-6 mb-6"
// //           initial={{ opacity: 0, y: -20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //         >
// //           <AccountForm
// //             onSuccess={() => {
// //               fetchAccounts();
// //               setShowForm(false);
// //             }}
// //           />
// //         </motion.div>
// //       )}

// //       {/* Search */}
// //       <div className="flex items-center bg-white shadow-md rounded-lg p-3 mb-6">
// //         <FaSearch className="text-gray-400 mr-2" />
// //         <input
// //           type="text"
// //           placeholder="Search by Account Number..."
// //           value={search}
// //           onChange={(e) => setSearch(e.target.value)}
// //           className="flex-1 outline-none text-gray-700"
// //         />
// //       </div>

// //       {/* Accounts */}
// //       {loading ? (
// //         <p className="text-center text-gray-500">Loading accounts...</p>
// //       ) : filteredAccounts.length > 0 ? (
// //         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
// //           {filteredAccounts.map((acc) => (
// //             <motion.div
// //               key={acc.id}
// //               className="bg-white shadow-lg rounded-2xl p-5 border border-gray-100 hover:shadow-2xl transition-all"
// //               whileHover={{ scale: 1.02 }}
// //             >
// //               <div className="flex justify-between items-center mb-2">
// //                 <h3 className="text-xl font-semibold text-gray-800">
// //                   {acc.accountType} ACCOUNT
// //                 </h3>
// //                 <span
// //                   className={`text-sm font-medium px-3 py-1 rounded-full ${
// //                     acc.status === "ACTIVE"
// //                       ? "bg-green-100 text-green-700"
// //                       : "bg-yellow-100 text-yellow-700"
// //                   }`}
// //                 >
// //                   {acc.status}
// //                 </span>
// //               </div>

// //               <p className="text-gray-600 text-sm mb-2">
// //                 Account No: <span className="font-medium">{acc.accountNumber}</span>
// //               </p>
// //               <p className="text-gray-600 text-sm mb-2">
// //                 CIF: <span className="font-medium">{acc.cifNumber}</span>
// //               </p>
// //               <p className="text-gray-600 text-sm mb-2">
// //                 Balance: <span className="font-semibold">₹{acc.balance}</span>
// //               </p>
// //               <p className="text-gray-600 text-sm mb-2">
// //                 KYC ID: <span className="font-medium">{acc.kycId}</span>
// //               </p>

// //               {/* Savings Account */}
// //               {acc.savingsDetails && (
// //                 <div className="mt-3 text-sm text-gray-700">
// //                   <p>Interest Rate: {acc.savingsDetails.interestRate}%</p>
// //                   <p>
// //                     Withdrawal Limit: {acc.savingsDetails.withdrawalLimitPerMonth}/month
// //                   </p>
// //                   <p>
// //                     Cheque Book:{" "}
// //                     {acc.savingsDetails.chequeBookAvailable
// //                       ? "Available"
// //                       : "Not Available"}
// //                   </p>
// //                 </div>
// //               )}

// //               {/* Current Account */}
// //               {acc.currentDetails && (
// //                 <div className="mt-3 text-sm text-gray-700">
// //                   <p>Business: {acc.currentDetails.businessName}</p>
// //                   <p>Overdraft Limit: ₹{acc.currentDetails.overdraftLimit}</p>
// //                   <p>Service Charge: ₹{acc.currentDetails.monthlyServiceCharge}</p>
// //                   <p>
// //                     Overdraft Facility:{" "}
// //                     {acc.currentDetails.hasOverdraftFacility ? "Yes" : "No"}
// //                   </p>
// //                 </div>
// //               )}

// //               {/* Buttons */}
// //               <div className="flex justify-between mt-5">
// //                 <button
// //                   onClick={() => toast.info(`Balance: ₹${acc.balance}`)}
// //                   className="flex items-center gap-2 bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 rounded-lg transition-all"
// //                 >
// //                   <FaMoneyBillWave /> Check Balance
// //                 </button>
// //                 <button
// //                   onClick={() => handleDelete(acc.id)}
// //                   className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg transition-all"
// //                 >
// //                   <FaTrashAlt /> Delete
// //                 </button>
// //               </div>
// //             </motion.div>
// //           ))}
// //         </div>
// //       ) : (
// //         <p className="text-center text-gray-500">No accounts found.</p>
// //       )}
// //     </motion.div>
// //   );
// // };

// // export default Account;

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { motion } from "framer-motion";
// // import { FaSearch, FaPlus, FaMoneyBillWave } from "react-icons/fa";
// // import toast from "react-hot-toast";
// // import AccountForm from "../../components/Account/AccountForm";

// // const Account = () => {
// //   const [accounts, setAccounts] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [showForm, setShowForm] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [visibleBalances, setVisibleBalances] = useState({}); // {accountId: balance}

// //   const BASE_URL =
// //     import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";
// //   const cifNumber =
// //     JSON.parse(localStorage.getItem("auth"))?.customer?.cifNumber || "";

// //   // Fetch accounts
// //   const fetchAccounts = async () => {
// //     if (!cifNumber) return;
// //     try {
// //       setLoading(true);
// //       const { data } = await axios.get(`${BASE_URL}/accounts/cif/${cifNumber}`);
// //       setAccounts(data);
// //     } catch (err) {
// //       toast.error("Failed to fetch accounts");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchAccounts();
// //   }, []);

// //   // Handle balance check
// //   const handleCheckBalance = async (accId) => {
// //     const pin = prompt("Enter your 4-digit PIN:");
// //     if (!pin || pin.length !== 4 || isNaN(pin)) {
// //       toast.error("Please enter a valid 4-digit PIN");
// //       return;
// //     }

// //     try {
// //       const { data } = await axios.get(`${BASE_URL}/accounts/pin/${pin}/balance`);
// //       setVisibleBalances((prev) => ({ ...prev, [accId]: data }));
// //       toast.success("Balance retrieved successfully!");
// //     } catch (err) {
// //       toast.error("Invalid PIN or failed to fetch balance");
// //     }
// //   };

// //   // Filter accounts
// //   const filteredAccounts = accounts.filter((acc) =>
// //     acc.accountNumber.toLowerCase().includes(search.toLowerCase())
// //   );

// //   return (
// //     <motion.div
// //       className="p-6 bg-gray-50 min-h-screen"
// //       initial={{ opacity: 0 }}
// //       animate={{ opacity: 1 }}
// //     >
// //       {/* Header */}
// //       <div className="flex justify-between items-center mb-6">
// //         <h2 className="text-3xl font-semibold text-gray-800">My Accounts</h2>
// //         <button
// //           onClick={() => setShowForm(!showForm)}
// //           className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition-all"
// //         >
// //           <FaPlus /> {showForm ? "Close Form" : "Open New Account"}
// //         </button>
// //       </div>

// //       {/* Form */}
// //       {showForm && (
// //         <motion.div
// //           className="bg-white rounded-xl shadow-lg p-6 mb-6"
// //           initial={{ opacity: 0, y: -20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //         >
// //           <AccountForm
// //             onSuccess={() => {
// //               fetchAccounts();
// //               setShowForm(false);
// //             }}
// //           />
// //         </motion.div>
// //       )}

// //       {/* Search */}
// //       <div className="flex items-center bg-white shadow-md rounded-lg p-3 mb-6">
// //         <FaSearch className="text-gray-400 mr-2" />
// //         <input
// //           type="text"
// //           placeholder="Search by Account Number..."
// //           value={search}
// //           onChange={(e) => setSearch(e.target.value)}
// //           className="flex-1 outline-none text-gray-700"
// //         />
// //       </div>

// //       {/* Accounts */}
// //       {loading ? (
// //         <p className="text-center text-gray-500">Loading accounts...</p>
// //       ) : filteredAccounts.length > 0 ? (
// //         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
// //           {filteredAccounts.map((acc) => (
// //             <motion.div
// //               key={acc.id}
// //               className="bg-white shadow-lg rounded-2xl p-5 border border-gray-100 hover:shadow-2xl transition-all"
// //               whileHover={{ scale: 1.02 }}
// //             >
// //               <div className="flex justify-between items-center mb-2">
// //                 <h3 className="text-xl font-semibold text-gray-800">
// //                   {acc.accountType} ACCOUNT
// //                 </h3>
// //                 <span
// //                   className={`text-sm font-medium px-3 py-1 rounded-full ${
// //                     acc.status === "ACTIVE"
// //                       ? "bg-green-100 text-green-700"
// //                       : "bg-yellow-100 text-yellow-700"
// //                   }`}
// //                 >
// //                   {acc.status}
// //                 </span>
// //               </div>

// //               <p className="text-gray-600 text-sm mb-2">
// //                 Account No:{" "}
// //                 <span className="font-medium">{acc.accountNumber}</span>
// //               </p>
// //               <p className="text-gray-600 text-sm mb-2">
// //                 CIF: <span className="font-medium">{acc.cifNumber}</span>
// //               </p>

// //               {/* Show balance if retrieved */}
// //               {visibleBalances[acc.id] ? (
// //                 <p className="text-gray-700 text-base font-semibold mb-2">
// //                   Balance: ₹{visibleBalances[acc.id]}
// //                 </p>
// //               ) : (
// //                 <p className="text-gray-500 text-sm mb-2 italic">
// //                   Balance hidden (check using PIN)
// //                 </p>
// //               )}

// //               {/* Savings Account */}
// //               {acc.savingsDetails && (
// //                 <div className="mt-3 text-sm text-gray-700">
// //                   <p>Interest Rate: {acc.savingsDetails.interestRate}%</p>
// //                   <p>
// //                     Withdrawal Limit:{" "}
// //                     {acc.savingsDetails.withdrawalLimitPerMonth}/month
// //                   </p>
// //                   <p>
// //                     Cheque Book:{" "}
// //                     {acc.savingsDetails.chequeBookAvailable
// //                       ? "Available"
// //                       : "Not Available"}
// //                   </p>
// //                 </div>
// //               )}

// //               {/* Current Account */}
// //               {acc.currentDetails && (
// //                 <div className="mt-3 text-sm text-gray-700">
// //                   <p>Business: {acc.currentDetails.businessName}</p>
// //                   <p>Overdraft Limit: ₹{acc.currentDetails.overdraftLimit}</p>
// //                   <p>Service Charge: ₹{acc.currentDetails.monthlyServiceCharge}</p>
// //                   <p>
// //                     Overdraft Facility:{" "}
// //                     {acc.currentDetails.hasOverdraftFacility ? "Yes" : "No"}
// //                   </p>
// //                 </div>
// //               )}

// //               {/* Buttons */}
// //               <div className="flex justify-center mt-5">
// //                 <button
// //                   onClick={() => handleCheckBalance(acc.id)}
// //                   className="flex items-center gap-2 bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg transition-all"
// //                 >
// //                   <FaMoneyBillWave /> Check Balance
// //                 </button>
// //               </div>
// //             </motion.div>
// //           ))}
// //         </div>
// //       ) : (
// //         <p className="text-center text-gray-500">No accounts found.</p>
// //       )}
// //     </motion.div>
// //   );
// // };

// // export default Account;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { FaSearch, FaPlus, FaMoneyBillWave, FaKey } from "react-icons/fa";
// import toast from "react-hot-toast";
// import AccountForm from "../../components/Account/AccountForm";
// import ChangePinForm from "../../components/Account/ChangePinForm";

// const Account = () => {
//   const [accounts, setAccounts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [visibleBalances, setVisibleBalances] = useState({});
//   const [selectedAccountForPin, setSelectedAccountForPin] = useState(null);

//   // For PIN Center Form
//   const [enteredPin, setEnteredPin] = useState("");
//   const [selectedAccountForBalance, setSelectedAccountForBalance] = useState(null);

//   const BASE_URL =
//     import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";
//   const cifNumber =
//     JSON.parse(localStorage.getItem("auth"))?.customer?.cifNumber || "";

//   // Fetch accounts
//   const fetchAccounts = async () => {
//     if (!cifNumber) return;
//     try {
//       setLoading(true);
//       const { data } = await axios.get(`${BASE_URL}/accounts/cif/${cifNumber}`);
//       setAccounts(data);
//     } catch (err) {
//       toast.error("Failed to fetch accounts");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAccounts();
//   }, []);

//   // Open Center PIN Form
//   const handleCheckBalance = (accId) => {
//     if (selectedAccountForBalance === accId) {
//       setSelectedAccountForBalance(null);
//       setEnteredPin("");
//     } else {
//       setSelectedAccountForBalance(accId);
//       setEnteredPin("");
//     }
//   };

//   // Submit PIN
//   const submitPin = async (accId) => {
//     if (!enteredPin || enteredPin.length !== 4 || isNaN(enteredPin)) {
//       toast.error("Please enter a valid 4-digit PIN");
//       return;
//     }

//     try {
//       const { data } = await axios.get(
//         `${BASE_URL}/accounts/pin/${enteredPin}/balance`
//       );
//       setVisibleBalances((prev) => ({
//         ...prev,
//         [accId]: data,
//       }));
//       toast.success("Balance retrieved successfully!");
//       setSelectedAccountForBalance(null);
//       setEnteredPin("");
//     } catch (err) {
//       toast.error("Invalid PIN or failed to fetch balance");
//     }
//   };

//   // Filter accounts
//   const filteredAccounts = accounts.filter((acc) =>
//     acc.accountNumber?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <motion.div
//       className="p-6 bg-gray-50 min-h-screen relative"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//     >
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-3xl font-semibold text-gray-800">My Accounts</h2>
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition-all"
//         >
//           <FaPlus /> {showForm ? "Close Form" : "Open New Account"}
//         </button>
//       </div>

//       {/* Form */}
//       {showForm && (
//         <motion.div
//           className="bg-white rounded-xl shadow-lg p-6 mb-6"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <AccountForm
//             onSuccess={() => {
//               fetchAccounts();
//               setShowForm(false);
//             }}
//           />
//         </motion.div>
//       )}

//       {/* Search */}
//       <div className="flex items-center bg-white shadow-md rounded-lg p-3 mb-6">
//         <FaSearch className="text-gray-400 mr-2" />
//         <input
//           type="text"
//           placeholder="Search by Account Number..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="flex-1 outline-none text-gray-700"
//         />
//       </div>

//       {/* Accounts */}
//       {loading ? (
//         <p className="text-center text-gray-500">Loading accounts...</p>
//       ) : filteredAccounts.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {filteredAccounts.map((acc) => (
//             <motion.div
//               key={acc.id}
//               className="bg-white shadow-lg rounded-2xl p-5 border border-gray-100 hover:shadow-2xl transition-all"
//               whileHover={{ scale: 1.02 }}
//             >
//               {/* Header */}
//               <div className="flex justify-between items-center mb-2">
//                 <h3 className="text-xl font-semibold text-gray-800">
//                   {acc.accountType} ACCOUNT
//                 </h3>
//                 <span
//                   className={`text-sm font-medium px-3 py-1 rounded-full ${
//                     acc.status === "ACTIVE"
//                       ? "bg-green-100 text-green-700"
//                       : "bg-yellow-100 text-yellow-700"
//                   }`}
//                 >
//                   {acc.status}
//                 </span>
//               </div>

//               {/* Basic Info */}
//               <p className="text-gray-600 text-sm mb-2">
//                 Account No:{" "}
//                 <span className="font-medium">{acc.accountNumber}</span>
//               </p>
//               <p className="text-gray-600 text-sm mb-2">
//                 CIF: <span className="font-medium">{acc.cifNumber}</span>
//               </p>

//               {/* Balance */}
//               {visibleBalances[acc.id] ? (
//                 <p className="text-gray-700 text-base font-semibold mb-2">
//                   Balance: ₹{visibleBalances[acc.id]}
//                 </p>
//               ) : (
//                 <p className="text-gray-500 text-sm mb-2 italic">
//                   Balance hidden (check using PIN)
//                 </p>
//               )}

//               {/* Occupation & Income */}
//               <div className="mt-3 text-sm text-gray-700">
//                 {acc.occupation && (
//                   <p>
//                     Occupation:{" "}
//                     <span className="font-medium">{acc.occupation}</span>
//                   </p>
//                 )}
//                 {acc.sourceOfIncome && (
//                   <p>
//                     Source of Income:{" "}
//                     <span className="font-medium">{acc.sourceOfIncome}</span>
//                   </p>
//                 )}
//                 {acc.grossAnnualIncome && (
//                   <p>
//                     Gross Annual Income: ₹
//                     <span className="font-medium">{acc.grossAnnualIncome}</span>
//                   </p>
//                 )}
//               </div>

//               {/* Nominee Info */}
//               {(acc.nomineeName || acc.nomineeRelation) && (
//                 <div className="mt-3 text-sm text-gray-700 border-t border-gray-200 pt-2">
//                   <p className="font-medium text-gray-800 mb-1">
//                     Nominee Details:
//                   </p>
//                   <p>Name: {acc.nomineeName}</p>
//                   <p>Relation: {acc.nomineeRelation}</p>
//                   {acc.nomineeAge && <p>Age: {acc.nomineeAge}</p>}
//                   {acc.nomineeContact && <p>Contact: {acc.nomineeContact}</p>}
//                 </div>
//               )}

//               {/* Savings Account */}
//               {acc.savingsDetails && (
//                 <div className="mt-3 text-sm text-gray-700 border-t border-gray-200 pt-2">
//                   <p className="font-medium text-gray-800 mb-1">
//                     Savings Details:
//                   </p>
//                   <p>Interest Rate: {acc.savingsDetails.interestRate}%</p>
//                   <p>
//                     Withdrawal Limit:{" "}
//                     {acc.savingsDetails.withdrawalLimitPerMonth}/month
//                   </p>
//                   <p>
//                     Cheque Book:{" "}
//                     {acc.savingsDetails.chequeBookAvailable
//                       ? "Available"
//                       : "Not Available"}
//                   </p>
//                 </div>
//               )}

//               {/* Current Account */}
//               {acc.currentDetails && (
//                 <div className="mt-3 text-sm text-gray-700 border-t border-gray-200 pt-2">
//                   <p className="font-medium text-gray-800 mb-1">
//                     Current Details:
//                   </p>
//                   <p>Business: {acc.currentDetails.businessName}</p>
//                   <p>Overdraft Limit: ₹{acc.currentDetails.overdraftLimit}</p>
//                   <p>
//                     Service Charge: ₹{acc.currentDetails.monthlyServiceCharge}
//                   </p>
//                   <p>
//                     Overdraft Facility:{" "}
//                     {acc.currentDetails.hasOverdraftFacility ? "Yes" : "No"}
//                   </p>
//                 </div>
//               )}

//               {/* Buttons */}
//               <div className="flex justify-center gap-3 mt-5">
//                 <button
//                   onClick={() => handleCheckBalance(acc.id)}
//                   className="flex items-center gap-2 bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg transition-all"
//                 >
//                   <FaMoneyBillWave /> Check Balance
//                 </button>

//                 <button
//                   onClick={() => setSelectedAccountForPin(acc.accountNumber)}
//                   className="flex items-center gap-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-4 py-2 rounded-lg transition-all"
//                 >
//                   <FaKey /> Change PIN
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500">No accounts found.</p>
//       )}

//       {/* Change PIN Modal */}
//       {selectedAccountForPin && (
//         <ChangePinForm
//           accountNumber={selectedAccountForPin}
//           onSuccess={() => {
//             setSelectedAccountForPin(null);
//             fetchAccounts();
//           }}
//           onCancel={() => setSelectedAccountForPin(null)}
//         />
//       )}

//       {/* Center Fixed PIN Form */}
//       {selectedAccountForBalance && (
//         <motion.div
//           className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-50"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//         >
//           <motion.div
//             className="bg-white rounded-2xl shadow-xl p-8 w-80 text-center relative"
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//           >
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">
//               Enter Your 4-Digit PIN
//             </h3>

//             <input
//               type="password"
//               maxLength={4}
//               value={enteredPin}
//               onChange={(e) => setEnteredPin(e.target.value)}
//               className="w-full text-center text-xl border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none mb-6"
//               placeholder="••••"
//             />

//             <div className="flex justify-center gap-3">
//               <button
//                 onClick={() => submitPin(selectedAccountForBalance)}
//                 className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all"
//               >
//                 Submit
//               </button>
//               <button
//                 onClick={() => {
//                   setSelectedAccountForBalance(null);
//                   setEnteredPin("");
//                 }}
//                 className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-all"
//               >
//                 Cancel
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };

// export default Account;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaSearch, FaPlus, FaMoneyBillWave, FaKey } from "react-icons/fa";
import toast from "react-hot-toast";
import AccountForm from "../../components/Account/AccountForm";
import ChangePinForm from "../../components/Account/ChangePinForm";

const Account = () => {
  const [accounts, setAccounts] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visibleBalances, setVisibleBalances] = useState({});
  const [selectedAccountForPin, setSelectedAccountForPin] = useState(null);

  // For PIN Center Form
  const [enteredPin, setEnteredPin] = useState("");
  const [selectedAccountForBalance, setSelectedAccountForBalance] = useState(null);
  const [selectedAccountNumber, setSelectedAccountNumber] = useState(null);

  const BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";
  const cifNumber =
    JSON.parse(localStorage.getItem("auth"))?.customer?.cifNumber || "";

  // Fetch accounts
  const fetchAccounts = async () => {
    if (!cifNumber) return;
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/accounts/cif/${cifNumber}`);
      setAccounts(data);
    } catch (err) {
      toast.error("Failed to fetch accounts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // Open Center PIN Form
  const handleCheckBalance = (accId, accNumber) => {
    if (selectedAccountForBalance === accId) {
      setSelectedAccountForBalance(null);
      setEnteredPin("");
      setSelectedAccountNumber(null);
      localStorage.removeItem("selectedAccountNumber");
    } else {
      setSelectedAccountForBalance(accId);
      setSelectedAccountNumber(accNumber);
      localStorage.setItem("selectedAccountNumber", accNumber);
      setEnteredPin("");
    }
  };

  // Submit PIN (with account number)
  const submitPin = async (accId) => {
    if (!enteredPin || enteredPin.length !== 4 || isNaN(enteredPin)) {
      toast.error("Please enter a valid 4-digit PIN");
      return;
    }

    const accNumber =
      selectedAccountNumber || localStorage.getItem("selectedAccountNumber");

    if (!accNumber) {
      toast.error("Account number not found. Please try again.");
      return;
    }

    try {
      const { data } = await axios.get(
        `${BASE_URL}/accounts/${accNumber}/pin/${enteredPin}/balance`
      );

      setVisibleBalances((prev) => ({
        ...prev,
        [accId]: data,
      }));

      toast.success("Balance retrieved successfully!");
      setSelectedAccountForBalance(null);
      setEnteredPin("");
      localStorage.removeItem("selectedAccountNumber");
    } catch (err) {
      toast.error("Invalid PIN or failed to fetch balance");
    }
  };

  // Filter accounts
  const filteredAccounts = accounts.filter((acc) =>
    acc.accountNumber?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      className="p-6 bg-gray-50 min-h-screen relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">My Accounts</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition-all"
        >
          <FaPlus /> {showForm ? "Close Form" : "Open New Account"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AccountForm
            onSuccess={() => {
              fetchAccounts();
              setShowForm(false);
            }}
          />
        </motion.div>
      )}

      {/* Search */}
      <div className="flex items-center bg-white shadow-md rounded-lg p-3 mb-6">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search by Account Number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none text-gray-700"
        />
      </div>

      {/* Accounts */}
      {loading ? (
        <p className="text-center text-gray-500">Loading accounts...</p>
      ) : filteredAccounts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAccounts.map((acc) => (
            <motion.div
              key={acc.id}
              className="bg-white shadow-lg rounded-2xl p-5 border border-gray-100 hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.02 }}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  {acc.accountType} ACCOUNT
                </h3>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    acc.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {acc.status}
                </span>
              </div>

              {/* Basic Info */}
              <p className="text-gray-600 text-sm mb-2">
                Account No:{" "}
                <span className="font-medium">{acc.accountNumber}</span>
              </p>
              <p className="text-gray-600 text-sm mb-2">
                CIF: <span className="font-medium">{acc.cifNumber}</span>
              </p>

              {/* Balance */}
              {visibleBalances[acc.id] ? (
                <p className="text-gray-700 text-base font-semibold mb-2">
                  Balance: ₹{visibleBalances[acc.id]}
                </p>
              ) : (
                <p className="text-gray-500 text-sm mb-2 italic">
                  Balance hidden (check using PIN)
                </p>
              )}

              {/* Occupation & Income */}
              <div className="mt-3 text-sm text-gray-700">
                {acc.occupation && (
                  <p>
                    Occupation:{" "}
                    <span className="font-medium">{acc.occupation}</span>
                  </p>
                )}
                {acc.sourceOfIncome && (
                  <p>
                    Source of Income:{" "}
                    <span className="font-medium">{acc.sourceOfIncome}</span>
                  </p>
                )}
                {acc.grossAnnualIncome && (
                  <p>
                    Gross Annual Income: ₹
                    <span className="font-medium">{acc.grossAnnualIncome}</span>
                  </p>
                )}
              </div>

              {/* Nominee Info */}
              {(acc.nomineeName || acc.nomineeRelation) && (
                <div className="mt-3 text-sm text-gray-700 border-t border-gray-200 pt-2">
                  <p className="font-medium text-gray-800 mb-1">
                    Nominee Details:
                  </p>
                  <p>Name: {acc.nomineeName}</p>
                  <p>Relation: {acc.nomineeRelation}</p>
                  {acc.nomineeAge && <p>Age: {acc.nomineeAge}</p>}
                  {acc.nomineeContact && <p>Contact: {acc.nomineeContact}</p>}
                </div>
              )}

              {/* Savings Account */}
              {acc.savingsDetails && (
                <div className="mt-3 text-sm text-gray-700 border-t border-gray-200 pt-2">
                  <p className="font-medium text-gray-800 mb-1">
                    Savings Details:
                  </p>
                  <p>Interest Rate: {acc.savingsDetails.interestRate}%</p>
                  <p>
                    Withdrawal Limit:{" "}
                    {acc.savingsDetails.withdrawalLimitPerMonth}/month
                  </p>
                  <p>
                    Cheque Book:{" "}
                    {acc.savingsDetails.chequeBookAvailable
                      ? "Available"
                      : "Not Available"}
                  </p>
                </div>
              )}

              {/* Current Account */}
              {acc.currentDetails && (
                <div className="mt-3 text-sm text-gray-700 border-t border-gray-200 pt-2">
                  <p className="font-medium text-gray-800 mb-1">
                    Current Details:
                  </p>
                  <p>Business: {acc.currentDetails.businessName}</p>
                  <p>Overdraft Limit: ₹{acc.currentDetails.overdraftLimit}</p>
                  <p>
                    Service Charge: ₹{acc.currentDetails.monthlyServiceCharge}
                  </p>
                  <p>
                    Overdraft Facility:{" "}
                    {acc.currentDetails.hasOverdraftFacility ? "Yes" : "No"}
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-center gap-3 mt-5">
                <button
                  onClick={() =>
                    handleCheckBalance(acc.id, acc.accountNumber)
                  }
                  className="flex items-center gap-2 bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg transition-all"
                >
                  <FaMoneyBillWave /> Check Balance
                </button>

                <button
                  onClick={() => setSelectedAccountForPin(acc.accountNumber)}
                  className="flex items-center gap-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-4 py-2 rounded-lg transition-all"
                >
                  <FaKey /> Change PIN
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No accounts found.</p>
      )}

      {/* Change PIN Modal */}
      {selectedAccountForPin && (
        <ChangePinForm
          accountNumber={selectedAccountForPin}
          onSuccess={() => {
            setSelectedAccountForPin(null);
            fetchAccounts();
          }}
          onCancel={() => setSelectedAccountForPin(null)}
        />
      )}

      {/* Center Fixed PIN Form */}
      {selectedAccountForBalance && (
        <motion.div
          className="fixed inset-0  flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 w-80 text-center relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Enter Your 4-Digit PIN
            </h3>

            <input
              type="password"
              maxLength={4}
              value={enteredPin}
              onChange={(e) => setEnteredPin(e.target.value)}
              className="w-full text-center text-xl border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none mb-6"
              placeholder="••••"
            />

            <div className="flex justify-center gap-3">
              <button
                onClick={() => submitPin(selectedAccountForBalance)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all"
              >
                Submit
              </button>
              <button
                onClick={() => {
                  setSelectedAccountForBalance(null);
                  setEnteredPin("");
                  localStorage.removeItem("selectedAccountNumber");
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-all"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Account;
