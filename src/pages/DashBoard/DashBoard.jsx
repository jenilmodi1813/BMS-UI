import React, { useEffect, useState } from "react";
import {
  FaExchangeAlt,
  FaWallet,
  FaChartPie,
  FaHistory,
  FaMoneyCheckAlt,
  FaUserCircle,
  FaUniversity,
} from "react-icons/fa";
import axios from "axios";
import { getCurrentUser } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const navigate = useNavigate();
  let maybeUser;
  try {
    maybeUser = typeof getCurrentUser === "function" ? getCurrentUser() : getCurrentUser;
  } catch {
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
    balance: "0.00", // Added balance placeholder
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasAccounts, setHasAccounts] = useState(true);

  const API_BASE =
    (import.meta.env.VITE_API_BASE_URL &&
      import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, "")) ||
    "http://localhost:8080/api/v1";

  const cif = authFromStorage?.customer?.cifNumber || user?.cifNumber || null;
  const userId =
    authFromStorage?.customer?.customerId ||
    user?.customerId ||
    user?.id ||
    null;

  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      setHasAccounts(true);
      try {
        let res;
        if (cif) {
          res = await axios.get(
            `${API_BASE}/accounts/cif/${encodeURIComponent(cif)}`,
            {
              headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            }
          );
        } else if (userId) {
          res = await axios.get(
            `${API_BASE}/accounts/${encodeURIComponent(userId)}`,
            {
              headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            }
          );
        } else {
          setAccounts([]);
          setHasAccounts(false);
          return;
        }

        const responseData = res?.data;
        const data = Array.isArray(responseData)
          ? responseData
          : responseData
            ? [responseData]
            : [];

        if (!data || data.length === 0) {
          setAccounts([]);
          setHasAccounts(false);
        } else {
          setAccounts(data);
          setHasAccounts(true);
          setSelectedAccount(data[0]);
          updateSummaryAndTransactions(data[0], token);
        }
      } catch (err) {
        console.error("Error fetching accounts:", err);
        setAccounts([]);
        setHasAccounts(false);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const updateSummaryAndTransactions = async (account, tokenHeader) => {
    if (!account) return;

    setAccountSummary({
      accountNumber: account.accountNumber || "",
      accountStatus: account.status || "",
      accountType: account.accountType || "",
      balance: account.balance || "0.00", // Assuming balance is available
    });

    try {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth() + 1; // 1-12

      const txRes = await axios.get(
        `${API_BASE}/transactions/month`,
        {
          params: {
            accountNumber: account.accountNumber,
            year: currentYear,
            month: currentMonth
          },
          headers: tokenHeader
            ? { Authorization: `Bearer ${tokenHeader}` }
            : token
              ? { Authorization: `Bearer ${token}` }
              : undefined,
        }
      );
      setTransactions(Array.isArray(txRes.data) ? txRes.data : []);
    } catch {
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
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.firstName || "User"}!
          </h1>
          <p className="mt-2 text-gray-600">
            Here's what's happening with your accounts today.
          </p>
        </div>

        {/* Account Summary Card */}
        {hasAccounts && selectedAccount ? (
          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-700 to-blue-600 rounded-3xl shadow-2xl p-6 sm:p-8 text-white mb-8 group transition-all duration-300 hover:shadow-blue-900/20">
            {/* Background Decorations for Premium Feel */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                    <FaUniversity className="opacity-80" />
                    Account Overview
                  </h2>
                  <p className="text-blue-100 text-sm mt-1 font-medium opacity-80">
                    Manage and view your account details
                  </p>
                </div>
                {accounts.length > 1 && (
                  <div className="relative w-full sm:w-auto">
                    <select
                      onChange={handleAccountChange}
                      value={selectedAccount?.accountNumber || ""}
                      className="w-full sm:w-auto appearance-none bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm rounded-xl focus:ring-2 focus:ring-white/50 focus:border-transparent py-3 pl-4 pr-10 cursor-pointer hover:bg-white/20 transition-all font-medium outline-none"
                    >
                      {accounts.map((acc) => (
                        <option key={acc.accountNumber} value={acc.accountNumber} className="text-gray-900">
                          {acc.accountType} - {acc.accountNumber}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/80">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Account Number */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/10 flex flex-col justify-center hover:bg-white/15 transition-colors">
                  <p className="text-blue-200 text-xs uppercase tracking-wider font-bold mb-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-300"></span>
                    Account Number
                  </p>
                  <p className="font-mono text-2xl tracking-wider text-white drop-shadow-sm truncate" title={accountSummary.accountNumber}>
                    {accountSummary.accountNumber}
                  </p>
                </div>

                {/* Status */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/10 flex flex-col justify-center hover:bg-white/15 transition-colors">
                  <p className="text-blue-200 text-xs uppercase tracking-wider font-bold mb-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-300"></span>
                    Status
                  </p>
                  <div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm border ${accountSummary.accountStatus === "ACTIVE"
                          ? "bg-emerald-500/20 text-emerald-100 border-emerald-400/30"
                          : "bg-rose-500/20 text-rose-100 border-rose-400/30"
                        }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${accountSummary.accountStatus === "ACTIVE" ? "bg-emerald-400" : "bg-rose-400"
                        } animate-pulse`}></span>
                      {accountSummary.accountStatus}
                    </span>
                  </div>
                </div>

                {/* Account Type */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/10 flex flex-col justify-center hover:bg-white/15 transition-colors">
                  <p className="text-blue-200 text-xs uppercase tracking-wider font-bold mb-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-300"></span>
                    Account Type
                  </p>
                  <p className="text-xl font-semibold capitalize flex items-center gap-2">
                    <FaMoneyCheckAlt className="text-blue-300 opacity-70 text-lg" />
                    {accountSummary.accountType}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center mb-8">
            <FaUniversity className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No accounts found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new account.
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate("/accounts")}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Open Account
              </button>
            </div>
          </div>
        )}

        {/* Quick Actions Grid */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <QuickAction
            icon={<FaExchangeAlt />}
            label="Transfer"
            color="bg-blue-500"
            onClick={() => navigate("/transfer")}
          />
          <QuickAction
            icon={<FaWallet />}
            label="Deposit"
            color="bg-green-500"
            onClick={() => navigate("/deposit")}
          />
          <QuickAction
            icon={<FaChartPie />}
            label="Analytics"
            color="bg-purple-500"
            onClick={() => navigate("/analytics")}
          />
          <QuickAction
            icon={<FaHistory />}
            label="History"
            color="bg-orange-500"
            onClick={() => navigate("/transactions")}
          />
          <QuickAction
            icon={<FaMoneyCheckAlt />}
            label="Loans"
            color="bg-indigo-500"
            onClick={() => navigate("/loan")}
          />
          <QuickAction
            icon={<FaUserCircle />}
            label="Profile"
            color="bg-teal-500"
            onClick={() => navigate("/profile")}
          />
        </div>

        {/* Recent Transactions */}
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Transactions
            </h2>
            <button
              onClick={() => navigate("/transactions")}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              View All
            </button>
          </div>

          {transactions.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No recent transactions.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.slice(0, 5).map((txn, index) => {
                    const creditTypes = [
                      "DEPOSIT",
                      "LOAN_DISBURSEMENT",
                      "REFUND",
                      "CASH_DEPOSIT",
                      "REVERSAL"
                    ];
                    const isDebit = !creditTypes.includes(txn.transactionType?.toUpperCase());

                    return (
                      <tr key={index} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {txn.transactionDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {txn.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isDebit
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                              }`}
                          >
                            {txn.transactionType}
                          </span>
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm text-right font-bold ${isDebit
                            ? "text-red-600"
                            : "text-green-600"
                            }`}
                        >
                          {isDebit
                            ? `- ₹${txn.amount}`
                            : `+ ₹${txn.amount}`}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const QuickAction = ({ icon, label, color, onClick }) => (
  <button
    onClick={onClick}
    className={`${color} hover:opacity-90 text-white rounded-xl p-4 flex flex-col items-center justify-center shadow-md transition-transform transform hover:scale-105`}
  >
    <div className="text-2xl mb-2">{icon}</div>
    <span className="text-sm font-medium">{label}</span>
  </button>
);

export default DashBoard;
