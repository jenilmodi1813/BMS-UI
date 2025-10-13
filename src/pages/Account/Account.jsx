import React, { useState, useEffect } from "react";
import { FaMoneyBillWave, FaExchangeAlt, FaPlus } from "react-icons/fa";

const Account = () => {
  // Mock data for the logged-in user's account
  const [account, setAccount] = useState({
    type: "Savings",
    number: "XXXX-XXXX-1234",
    balance: 54320,
    status: "Active",
  });

  const [transactions, setTransactions] = useState([
    {
      date: "2025-10-11",
      description: "ATM Withdrawal",
      type: "Debit",
      amount: -2000,
      balance: 54320,
    },
    {
      date: "2025-10-10",
      description: "Salary Credit",
      type: "Credit",
      amount: 40000,
      balance: 56320,
    },
    {
      date: "2025-10-09",
      description: "Electricity Bill",
      type: "Debit",
      amount: -1200,
      balance: 16320,
    },
  ]);

  // You can replace this with an API call to fetch user's account data
  useEffect(() => {
    // Example:
    // axios.get('/api/v1/accounts/me').then(res => setAccount(res.data))
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <h1 className="text-3xl font-semibold text-blue-500 mb-6 text-center">
        My Account
      </h1>

      {/* Account Info */}
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-2xl mx-auto mb-8 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Account Details</h2>
        <div className="grid grid-cols-1 gap-4 text-gray-800">
          <div className="bg-blue-50 rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-600">Account Number</p>
            <h3 className="text-lg font-semibold mt-1">{account.number}</h3>
          </div>

          <div className="bg-green-50 rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-600">Available Balance</p>
            <h3 className="text-lg font-semibold mt-1">₹ {account.balance.toLocaleString()}</h3>
          </div>

          <div className="bg-yellow-50 rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-600">Account Type</p>
            <h3 className="text-lg font-semibold mt-1">{account.type}</h3>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-600">Status</p>
            <h3
              className={`text-lg font-semibold mt-1 ${
                account.status === "Active" ? "text-green-600" : "text-red-600"
              }`}
            >
              {account.status}
            </h3>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-8 max-w-2xl mx-auto border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-4">
          <button className="flex items-center gap-2 justify-center py-3 px-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">
            <FaMoneyBillWave /> Transfer Money
          </button>
          <button className="flex items-center gap-2 justify-center py-3 px-4 rounded-xl bg-green-600 text-white hover:bg-green-700 transition">
            <FaPlus /> Deposit Funds
          </button>
          <button className="flex items-center gap-2 justify-center py-3 px-4 rounded-xl bg-orange-600 text-white hover:bg-orange-700 transition">
            <FaExchangeAlt /> Withdraw Funds
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-2xl mx-auto border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Description</th>
                <th className="py-2 px-4 text-left">Type</th>
                <th className="py-2 px-4 text-right">Amount</th>
                <th className="py-2 px-4 text-right">Balance</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, idx) => (
                <tr key={idx} className="border-t text-gray-800">
                  <td className="py-2 px-4">{tx.date}</td>
                  <td className="py-2 px-4">{tx.description}</td>
                  <td className="py-2 px-4">{tx.type}</td>
                  <td
                    className={`py-2 px-4 text-right font-medium ${
                      tx.type === "Credit" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {tx.type === "Credit" ? "+" : "-"} ₹{Math.abs(tx.amount).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 text-right">₹ {tx.balance.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Account;
