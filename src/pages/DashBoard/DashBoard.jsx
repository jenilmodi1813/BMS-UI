// import React, { useEffect, useState } from "react";
// import {
//   FaExchangeAlt,
//   FaWallet,
//   FaChartPie,
//   FaHistory,
// } from "react-icons/fa";

// const DashBoard = () => {
//   // State for account summary
//   const [accountSummary, setAccountSummary] = useState({
//     accountNumber: "",
//     balance: "",
//     accountType: "",
//   });

//   // State for recent transactions
//   const [transactions, setTransactions] = useState([]);

//   // Loading state
//   const [loading, setLoading] = useState(true);

//   // Fetch account summary and transactions from API
//   useEffect(() => {
//     // Example API calls (replace URLs with your Java backend endpoints)
//     const fetchAccountData = async () => {
//       try {
//         // Fetch account summary
//         // const accountRes = await axios.get("http://localhost:8081/api/v1/accounts/summary");
//         // setAccountSummary(accountRes.data);

//         // Fetch recent transactions
//         // const transRes = await axios.get("http://localhost:8081/api/v1/accounts/transactions");
//         // setTransactions(transRes.data);

//         // For now, leave loading false (replace with actual API data)
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setLoading(false);
//       }
//     };

//     fetchAccountData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <p className="text-gray-700 text-lg">Loading dashboard...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
//       {/* Header */}
//       <h1 className="text-3xl font-semibold text-blue-500 mb-6 text-center">
//         Welcome to BankMate
//       </h1>

//       {/* Account Summary */}
//       <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-4xl border border-gray-100 mb-8">
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">
//           Account Summary
//         </h2>
//         <div className="grid md:grid-cols-3 gap-6 text-gray-800">
//           <div className="bg-blue-50 rounded-xl p-4 shadow-sm">
//             <p className="text-sm text-gray-600">Account Number</p>
//             <h3 className="text-lg font-semibold mt-1">
//               {accountSummary.accountNumber || "-"}
//             </h3>
//           </div>

//           <div className="bg-green-50 rounded-xl p-4 shadow-sm">
//             <p className="text-sm text-gray-600">Available Balance</p>
//             <h3 className="text-lg font-semibold mt-1">
//               {accountSummary.balance ? `₹ ${accountSummary.balance}` : "-"}
//             </h3>
//           </div>

//           <div className="bg-yellow-50 rounded-xl p-4 shadow-sm">
//             <p className="text-sm text-gray-600">Account Type</p>
//             <h3 className="text-lg font-semibold mt-1">
//               {accountSummary.accountType || "-"}
//             </h3>
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-4xl border border-gray-100 mb-8">
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">
//           Quick Actions
//         </h2>
//         <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
//           <button className="flex flex-col items-center bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 transition">
//             <FaExchangeAlt size={28} />
//             <span className="mt-2 text-sm font-medium">Transfer Money</span>
//           </button>

//           <button className="flex flex-col items-center bg-green-600 hover:bg-green-700 text-white rounded-xl py-4 transition">
//             <FaWallet size={28} />
//             <span className="mt-2 text-sm font-medium">Deposit Funds</span>
//           </button>

//           <button className="flex flex-col items-center bg-purple-600 hover:bg-purple-700 text-white rounded-xl py-4 transition">
//             <FaChartPie size={28} />
//             <span className="mt-2 text-sm font-medium">View Analytics</span>
//           </button>

//           <button className="flex flex-col items-center bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-4 transition">
//             <FaHistory size={28} />
//             <span className="mt-2 text-sm font-medium">Transaction History</span>
//           </button>
//         </div>
//       </div>

//       {/* Recent Transactions */}
//       <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-4xl border border-gray-100">
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">
//           Recent Transactions
//         </h2>
//         {transactions.length === 0 ? (
//           <p className="text-gray-500 text-center">No transactions yet.</p>
//         ) : (
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-gray-100 text-gray-700">
//                 <th className="py-2 px-4 text-sm">Date</th>
//                 <th className="py-2 px-4 text-sm">Description</th>
//                 <th className="py-2 px-4 text-sm">Type</th>
//                 <th className="py-2 px-4 text-sm text-right">Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               {transactions.map((txn, index) => (
//                 <tr key={index} className="border-t text-gray-800">
//                   <td className="py-2 px-4 text-sm">{txn.date}</td>
//                   <td className="py-2 px-4 text-sm">{txn.description}</td>
//                   <td className="py-2 px-4 text-sm">{txn.type}</td>
//                   <td
//                     className={`py-2 px-4 text-sm text-right ${
//                       txn.type.toLowerCase() === "debit"
//                         ? "text-red-600"
//                         : "text-green-600"
//                     }`}
//                   >
//                     {txn.type.toLowerCase() === "debit"
//                       ? `- ₹${txn.amount}`
//                       : `+ ₹${txn.amount}`}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DashBoard;

import React, { useEffect, useState } from "react";
import {
  FaExchangeAlt,
  FaWallet,
  FaChartPie,
  FaHistory,
} from "react-icons/fa";

import axios from "axios";
import { getCurrentUser } from "../../utils/auth";

const DashBoard = () => {
  const user = getCurrentUser; // get logged-in user

  // State for account summary
  const [accountSummary, setAccountSummary] = useState({
    accountNumber: "",
    balance: "",
    accountType: "",
  });

  // State for recent transactions
  const [transactions, setTransactions] = useState([]);
  const [profile, setProfile] = useState(null);

  // Loading state
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1/";


    useEffect(() => {
      const data = JSON.parse(localStorage.getItem("auth"));
      if (data && data.customer) {
        setProfile(data.customer);
      }
    }, []);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        // Fetch account summary from backend using user ID/email
        const accountRes = await axios.get(`${API}accounts/${user?.id}`);
        setAccountSummary({
          accountNumber: accountRes.data.accountNumber,
          balance: accountRes.data.balance,
          accountType: accountRes.data.accountType,
        });

        // Fetch recent transactions for this account
        const transRes = await axios.get(`${API}accounts/${user?.id}/transactions`);
        setTransactions(transRes.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAccountData();
    } else {
      setLoading(false); // no user, stop loading
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-700 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      {/* Header */}
      <h1 className="text-3xl font-semibold text-blue-500 mb-6 text-center">
        Welcome, {profile?.firstName || "User"}!
      </h1>

      {/* Account Summary */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-4xl border border-gray-100 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Account Summary
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-gray-800">
          <div className="bg-blue-50 rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-600">Account Number</p>
            <h3 className="text-lg font-semibold mt-1">
              {accountSummary.accountNumber || "-"}
            </h3>
          </div>

          <div className="bg-green-50 rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-600">Available Balance</p>
            <h3 className="text-lg font-semibold mt-1">
              {accountSummary.balance ? `₹ ${accountSummary.balance}` : "-"}
            </h3>
          </div>

          <div className="bg-yellow-50 rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-600">Account Type</p>
            <h3 className="text-lg font-semibold mt-1">
              {accountSummary.accountType || "-"}
            </h3>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-4xl border border-gray-100 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Quick Actions
        </h2>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
          <button className="flex flex-col items-center bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 transition">
            <FaExchangeAlt size={28} />
            <span className="mt-2 text-sm font-medium">Transfer Money</span>
          </button>

          <button className="flex flex-col items-center bg-green-600 hover:bg-green-700 text-white rounded-xl py-4 transition">
            <FaWallet size={28} />
            <span className="mt-2 text-sm font-medium">Deposit Funds</span>
          </button>

          <button className="flex flex-col items-center bg-purple-600 hover:bg-purple-700 text-white rounded-xl py-4 transition">
            <FaChartPie size={28} />
            <span className="mt-2 text-sm font-medium">View Analytics</span>
          </button>

          <button className="flex flex-col items-center bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-4 transition">
            <FaHistory size={28} />
            <span className="mt-2 text-sm font-medium">Transaction History</span>
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-4xl border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Recent Transactions
        </h2>
        {transactions.length === 0 ? (
          <p className="text-gray-500 text-center">No transactions yet.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-2 px-4 text-sm">Date</th>
                <th className="py-2 px-4 text-sm">Description</th>
                <th className="py-2 px-4 text-sm">Type</th>
                <th className="py-2 px-4 text-sm text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn, index) => (
                <tr key={index} className="border-t text-gray-800">
                  <td className="py-2 px-4 text-sm">{txn.date}</td>
                  <td className="py-2 px-4 text-sm">{txn.description}</td>
                  <td className="py-2 px-4 text-sm">{txn.type}</td>
                  <td
                    className={`py-2 px-4 text-sm text-right ${
                      txn.type.toLowerCase() === "debit"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {txn.type.toLowerCase() === "debit"
                      ? `- ₹${txn.amount}`
                      : `+ ₹${txn.amount}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
