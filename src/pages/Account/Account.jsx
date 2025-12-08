import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaPlus, FaMoneyBillWave, FaKey, FaTimes, FaWallet, FaUniversity, FaBriefcase, FaChartLine } from "react-icons/fa";
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

  const [enteredPin, setEnteredPin] = useState("");
  const [selectedAccountForBalance, setSelectedAccountForBalance] = useState(null);
  const [selectedAccountNumber, setSelectedAccountNumber] = useState(null);

  const BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";
  const cifNumber =
    JSON.parse(localStorage.getItem("auth"))?.customer?.cifNumber || "";

  const fetchAccounts = async () => {
    if (!cifNumber) return;
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/accounts/cif/${cifNumber}`);
      setAccounts(data);

      if (data.length === 0) {
        toast.error("No accounts found for the provided CIF number.");
      }
    } catch {
      // ignore error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

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
    } catch {
      // ignore error
      toast.error("Invalid PIN or failed to fetch balance");
    }
  };

  // Filter accounts
  const filteredAccounts = accounts.filter((acc) =>
    acc.accountNumber?.toLowerCase().includes(search.toLowerCase())
  );

  // Get account type gradient
  const getAccountGradient = (type) => {
    switch (type?.toUpperCase()) {
      case "SAVINGS":
        return "from-blue-500 to-blue-600";
      case "CURRENT":
        return "from-purple-500 to-purple-600";
      case "SALARY":
        return "from-green-500 to-green-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  // Get account icon
  const getAccountIcon = (type) => {
    switch (type?.toUpperCase()) {
      case "SAVINGS":
        return <FaWallet className="text-2xl" />;
      case "CURRENT":
        return <FaBriefcase className="text-2xl" />;
      case "SALARY":
        return <FaChartLine className="text-2xl" />;
      default:
        return <FaUniversity className="text-2xl" />;
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Accounts</h1>
            <p className="text-gray-600">Manage your bank accounts and balances</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            {showForm ? <FaTimes /> : <FaPlus />}
            {showForm ? "Close Form" : "Open New Account"}
          </button>
        </div>

        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100"
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AccountForm
                onSuccess={() => {
                  fetchAccounts();
                  setShowForm(false);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search */}
        <div className="flex items-center bg-white shadow-md rounded-xl p-4 mb-8 border border-gray-100">
          <FaSearch className="text-gray-400 mr-3 text-lg" />
          <input
            type="text"
            placeholder="Search by account number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none text-gray-700 placeholder-gray-400"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* Accounts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : filteredAccounts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAccounts.map((acc) => (
              <motion.div
                key={acc.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -4 }}
              >
                {/* Card Header with Gradient */}
                <div className={`bg-gradient-to-r ${getAccountGradient(acc.accountType)} p-6 text-white`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                      {getAccountIcon(acc.accountType)}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${acc.status === "ACTIVE"
                        ? "bg-green-500/30 text-white"
                        : acc.status === "PENDING"
                          ? "bg-amber-500/30 text-white"
                          : "bg-red-500/30 text-white"
                        }`}
                    >
                      {acc.status}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{acc.accountType} ACCOUNT</h3>
                  <p className="text-white/80 text-sm">Account No: {acc.accountNumber}</p>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-gray-500 text-xs mb-1">CIF Number</p>
                    <p className="text-gray-900 font-semibold">{acc.cifNumber}</p>
                  </div>

                  {/* Balance */}
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 mb-4">
                    {visibleBalances[acc.id] ? (
                      <div>
                        <p className="text-gray-600 text-xs mb-1">Available Balance</p>
                        <p className="text-3xl font-bold text-gray-900">₹{visibleBalances[acc.id].toLocaleString()}</p>
                      </div>
                    ) : (
                      <div className="text-center py-2">
                        <p className="text-gray-500 text-sm">Balance hidden</p>
                        <p className="text-gray-400 text-xs">Enter PIN to view</p>
                      </div>
                    )}
                  </div>

                  {/* Additional Details */}
                  {(acc.occupation || acc.sourceOfIncome || acc.grossAnnualIncome) && (
                    <div className="mb-4 space-y-2 text-sm">
                      {acc.occupation && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Occupation:</span>
                          <span className="text-gray-900 font-medium">{acc.occupation}</span>
                        </div>
                      )}
                      {acc.sourceOfIncome && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Income Source:</span>
                          <span className="text-gray-900 font-medium">{acc.sourceOfIncome}</span>
                        </div>
                      )}
                      {acc.grossAnnualIncome && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Annual Income:</span>
                          <span className="text-gray-900 font-medium">₹{acc.grossAnnualIncome.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Nominee Info */}
                  {(acc.nomineeName || acc.nomineeRelation) && (
                    <div className="border-t border-gray-100 pt-4 mb-4">
                      <p className="text-gray-700 font-semibold text-sm mb-2">Nominee Details</p>
                      <div className="space-y-1 text-sm">
                        {acc.nomineeName && <p className="text-gray-600">Name: <span className="text-gray-900">{acc.nomineeName}</span></p>}
                        {acc.nomineeRelation && <p className="text-gray-600">Relation: <span className="text-gray-900">{acc.nomineeRelation}</span></p>}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleCheckBalance(acc.id, acc.accountNumber)}
                      className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg font-medium"
                    >
                      <FaMoneyBillWave />
                      Balance
                    </button>
                    <button
                      onClick={() => setSelectedAccountForPin(acc.accountNumber)}
                      className="flex-1 flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg font-medium"
                    >
                      <FaKey />
                      Change PIN
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="max-w-md mx-auto">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUniversity className="text-4xl text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No Accounts Found</h3>
              <p className="text-gray-600 mb-6">
                {search
                  ? "No accounts match your search. Try a different account number."
                  : "You don't have any accounts yet. Open a new account to get started!"}
              </p>
              {!search && (
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <FaPlus />
                  Open New Account
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Change PIN Modal */}
      <AnimatePresence>
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
      </AnimatePresence>

      {/* PIN Entry Modal */}
      <AnimatePresence>
        {selectedAccountForBalance && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSelectedAccountForBalance(null);
              setEnteredPin("");
              localStorage.removeItem("selectedAccountNumber");
            }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaKey className="text-3xl text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enter PIN</h3>
                <p className="text-gray-600">Enter your 4-digit PIN to view balance</p>
              </div>

              <input
                type="password"
                maxLength={4}
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && submitPin(selectedAccountForBalance)}
                className="w-full text-center text-3xl tracking-widest border-2 border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none mb-6 font-mono"
                placeholder="••••"
                autoFocus
              />

              <div className="flex gap-3">
                <button
                  onClick={() => submitPin(selectedAccountForBalance)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg font-semibold"
                >
                  Submit
                </button>
                <button
                  onClick={() => {
                    setSelectedAccountForBalance(null);
                    setEnteredPin("");
                    localStorage.removeItem("selectedAccountNumber");
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl transition-all duration-300 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Account;
