import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaExchangeAlt, FaArrowRight, FaCreditCard, FaMoneyBillWave, FaAlignLeft } from "react-icons/fa";

const Transfer = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fromAccountId: "",
    toAccountNumber: "",
    amount: "",
    description: "",
  });
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081/api/v1";

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await axios.get(`${API}/accounts`);
        setAccounts(res.data);

        if (res.data.length > 0) {
          setForm((prev) => ({
            ...prev,
            fromAccountId: res.data[0].id,
          }));
        }
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <FaExchangeAlt className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Transfer Money</h2>
          <p className="mt-2 text-sm text-gray-600">
            Securely transfer funds to any bank account
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100 sm:px-10">
          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label htmlFor="fromAccountId" className="block text-sm font-medium text-gray-700 mb-1">
                From Account
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCreditCard className="text-gray-400" />
                </div>
                <select
                  id="fromAccountId"
                  value={form.fromAccountId}
                  onChange={onChange}
                  required
                  className="block w-full pl-10 pr-10 py-3 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-xl"
                >
                  <option value="">Select Account</option>
                  {accounts.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.accountNumber} - {acc.accountType}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="toAccountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Recipient Account
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaArrowRight className="text-gray-400" />
                </div>
                <input
                  id="toAccountNumber"
                  type="text"
                  required
                  value={form.toAccountNumber}
                  onChange={onChange}
                  className="block w-full pl-10 sm:text-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-xl py-3"
                  placeholder="Enter recipient account number"
                />
              </div>
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMoneyBillWave className="text-gray-400" />
                </div>
                <input
                  id="amount"
                  type="number"
                  min="1"
                  required
                  value={form.amount}
                  onChange={onChange}
                  className="block w-full pl-10 sm:text-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-xl py-3"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description (Optional)
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                  <FaAlignLeft className="text-gray-400" />
                </div>
                <textarea
                  id="description"
                  rows={3}
                  value={form.description}
                  onChange={onChange}
                  className="block w-full pl-10 sm:text-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-xl py-3"
                  placeholder="What's this transfer for?"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "Transfer Funds"
                )}
              </button>
            </div>
          </form>

          {msg.text && (
            <div className={`mt-4 rounded-lg p-4 ${msg.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
              <div className="flex">
                <div className="flex-shrink-0">
                  {msg.type === 'error' ? (
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{msg.text}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transfer;
