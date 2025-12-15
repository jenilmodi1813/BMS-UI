import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaPlus, FaKey, FaTimes, FaUniversity, FaWallet, FaBriefcase, FaChartLine } from "react-icons/fa";
import toast from "react-hot-toast";
import AccountForm from "../../components/Account/AccountForm";
import ChangePinForm from "../../components/Account/ChangePinForm";
import AccountDetailsModal from "../../components/Account/AccountDetailsModal";

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

  // New state for details modal
  const [selectedAccountDetails, setSelectedAccountDetails] = useState(null);

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
      // Toggle off if already selected (though logic usually implies opening the modal)
      // For the modal flow, we probably just want to open the PIN entry if balance is not visible
      if (visibleBalances[accId]) {
        // already visible, do nothing or toggle? Let's just keep it visible
        return;
      }
    }

    setSelectedAccountForBalance(accId);
    setSelectedAccountNumber(accNumber);
    localStorage.setItem("selectedAccountNumber", accNumber);
    setEnteredPin("");
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
      const { data } = await axios.post(
        `${BASE_URL}/accounts/checkBalance`,
        {
          accountNumber: accNumber,
          accountPin: enteredPin,
        }
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
      let errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Invalid PIN or failed to fetch balance";

      const lockTime = err.response?.data?.lockExpiresInSeconds;
      if (lockTime) {
        const minutes = Math.floor(lockTime / 60);
        const seconds = lockTime % 60;
        const timeString = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
        errorMessage += ` Try again in ${timeString}.`;
      }

      toast.error(errorMessage);
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
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-indigo-800 tracking-tight mb-2">
              My Accounts
            </h1>
            <p className="text-slate-600 text-lg font-medium">
              Manage your wealth and banking details
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12 origin-left" />
            {showForm ? <FaTimes className="text-lg" /> : <FaPlus className="text-lg" />}
            <span>{showForm ? "Close Form" : "Open New Account"}</span>
          </button>
        </div>

        {/* Form Section */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-1 mb-10 overflow-hidden ring-1 ring-black/5"
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="p-6 sm:p-8">
                <AccountForm
                  onSuccess={() => {
                    fetchAccounts();
                    setShowForm(false);
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Bar */}
        <div className="relative group mb-10">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FaSearch className="text-slate-400 group-focus-within:text-blue-500 transition-colors text-lg" />
          </div>
          <input
            type="text"
            placeholder="Search accounts by number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-12 py-4 bg-white/70 backdrop-blur-md border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent focus:bg-white shadow-sm transition-all text-lg"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
            >
              <FaTimes className="text-lg" />
            </button>
          )}
        </div>

        {/* Accounts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 animate-pulse h-48">
                <div className="h-8 bg-slate-200 rounded-full w-2/3 mb-6"></div>
                <div className="h-4 bg-slate-200 rounded-full w-1/2 mb-3"></div>
              </div>
            ))}
          </div>
        ) : filteredAccounts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredAccounts.map((acc) => (
              <motion.div
                key={acc.id}
                onClick={() => setSelectedAccountDetails(acc)}
                className="group relative bg-white/80 backdrop-blur-md rounded-[2.5rem] shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 overflow-hidden cursor-pointer hover:border-blue-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Top gradient strip */}
                <div className={`h-2 w-full bg-gradient-to-r ${getAccountGradient(acc.accountType)}`} />

                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${getAccountGradient(acc.accountType)} text-white shadow-lg group-hover:shadow-blue-500/30 transition-shadow`}>
                      {getAccountIcon(acc.accountType)}
                    </div>
                    <span
                      className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm ${acc.status === "ACTIVE"
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        : acc.status === "PENDING"
                          ? "bg-amber-100 text-amber-700 border border-amber-200"
                          : "bg-rose-100 text-rose-700 border border-rose-200"
                        }`}
                    >
                      {acc.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2 truncate">
                      {acc.accountType}
                    </h3>
                    <p className="font-mono text-slate-500 text-lg tracking-wider opacity-90 truncate">
                      {acc.accountNumber}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                    View Details &rarr;
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center py-20 bg-white/60 backdrop-blur-lg rounded-[2.5rem] border border-white/40 shadow-xl text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="bg-blue-50 w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <FaUniversity className="text-5xl text-blue-500/80" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-3">No Accounts Found</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-8 text-lg">
              {search
                ? "We couldn't find any accounts matching your search criteria."
                : "It looks like you haven't opened any accounts yet. Start your journey today!"}
            </p>
            {!search && (
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/25 transition-all hover:scale-105"
              >
                <FaPlus />
                Open First Account
              </button>
            )}
          </motion.div>
        )}
      </div>

      {/* Account Details Modal */}
      <AnimatePresence>
        {selectedAccountDetails && (
          <AccountDetailsModal
            account={selectedAccountDetails}
            onClose={() => setSelectedAccountDetails(null)}
            onCheckBalance={handleCheckBalance}
            onChangePin={setSelectedAccountForPin}
            balance={visibleBalances[selectedAccountDetails.id]}
          />
        )}
      </AnimatePresence>

      {/* Change PIN Modal */}
      <AnimatePresence>
        {selectedAccountForPin && (
          <div className="relative z-[60]">
            {/* z-60 to be above details modal if needed, though usually render order handles it. 
                 Since Details modal is in the same stacking context, strict z-index helps.
                 DetailsModal usually has z-50.
             */}
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <ChangePinForm
                accountNumber={selectedAccountForPin}
                onSuccess={() => {
                  setSelectedAccountForPin(null);
                  fetchAccounts();
                }}
                onCancel={() => setSelectedAccountForPin(null)}
              />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* PIN Entry Modal (for Balance) */}
      <AnimatePresence>
        {selectedAccountForBalance && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => {
                setSelectedAccountForBalance(null);
                setEnteredPin("");
                localStorage.removeItem("selectedAccountNumber");
              }}
            />

            <motion.div
              className="relative bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm border border-slate-100 overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", bounce: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative background blob */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="text-center mb-8 relative">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm rotate-3">
                  <FaKey className="text-2xl text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Enter Security PIN</h3>
                <p className="text-slate-500 text-sm mt-1">Authenticate to view balance</p>
              </div>

              <input
                type="password"
                maxLength={4}
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && submitPin(selectedAccountForBalance)}
                className="w-full text-center text-4xl tracking-[0.5em] font-bold text-slate-800 border-b-2 border-slate-200 bg-transparent py-4 focus:border-blue-500 outline-none transition-all placeholder-slate-200 mb-8"
                placeholder="••••"
                autoFocus
              />

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setSelectedAccountForBalance(null);
                    setEnteredPin("");
                    localStorage.removeItem("selectedAccountNumber");
                  }}
                  className="px-4 py-3 rounded-xl text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => submitPin(selectedAccountForBalance)}
                  className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 transition-all hover:scale-105 active:scale-95"
                >
                  Verify
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
