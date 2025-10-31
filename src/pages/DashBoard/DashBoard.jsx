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

// import React, { useEffect, useState } from "react";
// import {
//   FaExchangeAlt,
//   FaWallet,
//   FaChartPie,
//   FaHistory,
// } from "react-icons/fa";

// import axios from "axios";
// import { getCurrentUser } from "../../utils/auth";

// const DashBoard = () => {
//   const user = getCurrentUser; // get logged-in user

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

//   const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081/api/v1/";

//   useEffect(() => {
//     const fetchAccountData = async () => {
//       try {
//         // Fetch account summary from backend using user ID/email
//         const accountRes = await axios.get(`${API}accounts/${user?.id}`);
//         setAccountSummary({
//           accountNumber: accountRes.data.accountNumber,
//           balance: accountRes.data.balance,
//           accountType: accountRes.data.accountType,
//         });

//         // Fetch recent transactions for this account
//         const transRes = await axios.get(`${API}accounts/${user?.id}/transactions`);
//         setTransactions(transRes.data);
//       } catch (err) {
//         console.error("Error fetching dashboard data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user) {
//       fetchAccountData();
//     } else {
//       setLoading(false); // no user, stop loading
//     }
//   }, [user]);

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
//         Welcome, {user?.firstName || "User"}!
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
  // support both function or object export from your utils
  let maybeUser;
  try {
    maybeUser = typeof getCurrentUser === "function" ? getCurrentUser() : getCurrentUser;
  } catch (e) {
    maybeUser = undefined;
  }

  const authFromStorage = (() => {
    try {
      return JSON.parse(localStorage.getItem("auth"));
    } catch {
      return null;
    }
  })();

  const user = maybeUser || authFromStorage?.customer || null;
  const token = authFromStorage?.tokens?.accessToken || "";

  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accountSummary, setAccountSummary] = useState({
    accountNumber: "",
    accountStatus: "",
    accountType: "",
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasAccounts, setHasAccounts] = useState(true); // assume true until proven otherwise

  const API_BASE =
    (import.meta.env.VITE_API_BASE_URL &&
      import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, "")) ||
    "http://localhost:8080/api/v1";

  const cif =
    authFromStorage?.customer?.cifNumber || user?.cifNumber || null;
  const userId =
    authFromStorage?.customer?.customerId || user?.customerId || user?.id || null;

  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      setHasAccounts(true);
      try {
        let res;
        if (cif) {
          // fetch by CIF (returns array)
          res = await axios.get(`${API_BASE}/accounts/cif/${encodeURIComponent(cif)}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          });
        } else if (userId) {
          // if backend supports getting accounts by user id; may return single or list
          res = await axios.get(`${API_BASE}/accounts/${encodeURIComponent(userId)}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          });
        } else {
          // no identifier -> treat as no accounts
          setAccounts([]);
          setHasAccounts(false);
          setSelectedAccount(null);
          setAccountSummary({ accountNumber: "", accountStatus: "", accountType: "" });
          setTransactions([]);
          return;
        }

        // Normalize response to array of accounts
        const responseData = res?.data;
        const data = Array.isArray(responseData)
          ? responseData
          : responseData
          ? [responseData]
          : [];

        if (!data || data.length === 0) {
          // no accounts for this user
          setAccounts([]);
          setHasAccounts(false);
          setSelectedAccount(null);
          setAccountSummary({ accountNumber: "", accountStatus: "", accountType: "" });
          setTransactions([]);
        } else {
          setAccounts(data);
          setHasAccounts(true);
          setSelectedAccount(data[0]);
          updateSummaryAndTransactions(data[0], token);
        }
      } catch (err) {
        // If backend returns 404 or no content, treat as "no accounts" (do not show an error)
        const status = err?.response?.status;
        if (status === 404 || status === 204) {
          setAccounts([]);
          setHasAccounts(false);
          setSelectedAccount(null);
          setAccountSummary({ accountNumber: "", accountStatus: "", accountType: "" });
          setTransactions([]);
        } else {
          // For other errors, log but still show blank dashboard (per your request)
          console.error("Error fetching accounts:", err);
          setAccounts([]);
          setHasAccounts(false);
          setSelectedAccount(null);
          setAccountSummary({ accountNumber: "", accountStatus: "", accountType: "" });
          setTransactions([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateSummaryAndTransactions = async (account, tokenHeader) => {
    if (!account) {
      setAccountSummary({ accountNumber: "", accountStatus: "", accountType: "" });
      setTransactions([]);
      return;
    }

    setAccountSummary({
      accountNumber: account.accountNumber || "",
      accountStatus: account.status || "",
      accountType: account.accountType || "",
    });

    // Try to fetch transactions for the selected account — if endpoint exists
    try {
      const txRes = await axios.get(`${API_BASE}/accounts/${account.id}/transactions`, {
        headers: tokenHeader ? { Authorization: `Bearer ${tokenHeader}` } : token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      setTransactions(Array.isArray(txRes.data) ? txRes.data : []);
    } catch (err) {
      // If transactions endpoint isn't available or returns error, just clear transactions
      setTransactions([]);
    }
  };

  const handleAccountChange = (e) => {
    const account = accounts.find((a) => a.accountNumber === e.target.value);
    setSelectedAccount(account);
    updateSummaryAndTransactions(account);
  };

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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Account Summary</h2>

          {/* Account selector (only if multiple accounts) */}
          {accounts.length > 1 && (
            <select
              onChange={handleAccountChange}
              value={selectedAccount?.accountNumber || ""}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring focus:ring-blue-300"
            >
              {accounts.map((acc) => (
                <option key={acc.accountNumber} value={acc.accountNumber}>
                  {acc.accountType} - {acc.accountNumber}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-gray-800">
          <div className="bg-blue-50 rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-600">Account Number</p>
            <h3 className="text-lg font-semibold mt-1">
              {accountSummary.accountNumber || "-"}
            </h3>
          </div>

          <div className="bg-green-50 rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-600">Account Status</p>
            <h3 className="text-lg font-semibold mt-1">
              {accountSummary.accountStatus || "-"}
            </h3>
          </div>

          <div className="bg-yellow-50 rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-600">Account Type</p>
            <h3 className="text-lg font-semibold mt-1">
              {accountSummary.accountType || "-"}
            </h3>
          </div>
        </div>

        {/* If user has no accounts, show friendly message */}
        {!hasAccounts && (
          <p className="mt-4 text-center text-gray-600">
            You don't have any accounts yet.
          </p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-4xl border border-gray-100 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Quick Actions</h2>
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
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Transactions</h2>
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
                      txn.type?.toLowerCase() === "debit" ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {txn.type?.toLowerCase() === "debit" ? `- ₹${txn.amount}` : `+ ₹${txn.amount}`}
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
