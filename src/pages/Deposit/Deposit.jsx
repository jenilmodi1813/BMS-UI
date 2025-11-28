import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaWallet } from "react-icons/fa";

const Deposit = () => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [selectedAccountId, setSelectedAccountId] = useState("");

    const API_BASE =
        (import.meta.env.VITE_API_BASE_URL &&
            import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, "")) ||
        "http://localhost:8080/api/v1";

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const authData = JSON.parse(localStorage.getItem("auth"));
                const token = authData?.tokens?.accessToken;
                const userId = authData?.customer?.customerId;

                if (!userId) return;

                const res = await axios.get(`${API_BASE}/accounts/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = Array.isArray(res.data) ? res.data : [res.data];
                setAccounts(data);
                if (data.length > 0) {
                    setSelectedAccountId(data[0].id);
                }
            } catch (error) {
                console.error("Error fetching accounts:", error);
                toast.error("Failed to load accounts");
            }
        };

        fetchAccounts();
    }, []);

    const handleDeposit = (e) => {
        e.preventDefault();
        if (!selectedAccountId) {
            toast.error("Please select an account");
            return;
        }
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            toast.success(`Successfully deposited ₹${amount}`);
            setAmount("");
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md relative">
                <button
                    onClick={() => navigate("/dashboard")}
                    className="absolute top-4 left-4 text-gray-500 hover:text-blue-600 transition flex items-center gap-2"
                >
                    <FaArrowLeft /> Back
                </button>

                <div className="flex justify-center mb-4 mt-6">
                    <div className="bg-green-100 p-4 rounded-full text-green-600">
                        <FaWallet size={32} />
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
                    Deposit Funds
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Add money to your account securely.
                </p>

                <form onSubmit={handleDeposit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Account
                        </label>
                        <select
                            value={selectedAccountId}
                            onChange={(e) => setSelectedAccountId(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition bg-white"
                        >
                            {accounts.length === 0 ? (
                                <option value="">Loading accounts...</option>
                            ) : (
                                accounts.map((acc) => (
                                    <option key={acc.id} value={acc.id}>
                                        {acc.accountType} - {acc.accountNumber}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Amount (₹)
                        </label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount to deposit"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || accounts.length === 0}
                        className={`w-full py-3 text-white font-semibold rounded-lg transition-all duration-300 shadow-md ${loading || accounts.length === 0
                                ? "bg-green-400 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700 hover:shadow-lg"
                            }`}
                    >
                        {loading ? "Processing..." : "Deposit Now"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Deposit;
