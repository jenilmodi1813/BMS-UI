import React, { useState, useEffect } from "react";
import axios from "axios";

import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AllTransactions = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("ALL");

    const API_BASE =
        (import.meta.env.VITE_API_BASE_URL &&
            import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, "")) ||
        "http://localhost:8080/api/v1";

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            try {
                const authData = JSON.parse(localStorage.getItem("auth"));
                const token = authData?.tokens?.accessToken;
                const userId = authData?.customer?.customerId;

                if (!userId) return;

                // Fetch accounts first to get account IDs
                const accRes = await axios.get(`${API_BASE} /accounts/${userId} `, {
                    headers: { Authorization: `Bearer ${token} ` },
                });

                const accounts = Array.isArray(accRes.data)
                    ? accRes.data
                    : [accRes.data];

                if (accounts.length === 0) {
                    setTransactions([]);
                    return;
                }

                // Fetch transactions for the first account (simplified for now)
                // In a real app, we might fetch for all or let user select account
                const accountId = accounts[0].id;
                const txRes = await axios.get(
                    `${API_BASE} /accounts/${accountId}/transactions`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                setTransactions(Array.isArray(txRes.data) ? txRes.data : []);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    const filteredTransactions = transactions.filter((txn) => {
        if (filter === "ALL") return true;
        return txn.type?.toUpperCase() === filter;
    });

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center">
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="mr-4 text-gray-500 hover:text-blue-600 transition"
                        >
                            <FaArrowLeft size={24} />
                        </button>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Transaction History
                        </h1>
                    </div>
                    <div className="flex space-x-2">
                        {["ALL", "CREDIT", "DEBIT"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilter(type)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === type
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
                    {loading ? (
                        <div className="p-8 text-center text-gray-500">Loading...</div>
                    ) : filteredTransactions.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            No transactions found.
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="py-4 px-6 text-sm font-semibold text-gray-600">
                                        Date
                                    </th>
                                    <th className="py-4 px-6 text-sm font-semibold text-gray-600">
                                        Description
                                    </th>
                                    <th className="py-4 px-6 text-sm font-semibold text-gray-600">
                                        Type
                                    </th>
                                    <th className="py-4 px-6 text-sm font-semibold text-gray-600 text-right">
                                        Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredTransactions.map((txn, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition">
                                        <td className="py-4 px-6 text-sm text-gray-700">
                                            {txn.date}
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-700">
                                            {txn.description}
                                        </td>
                                        <td className="py-4 px-6 text-sm">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${txn.type?.toLowerCase() === "debit"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-green-100 text-green-700"
                                                    }`}
                                            >
                                                {txn.type}
                                            </span>
                                        </td>
                                        <td
                                            className={`py-4 px-6 text-sm font-semibold text-right ${txn.type?.toLowerCase() === "debit"
                                                ? "text-red-600"
                                                : "text-green-600"
                                                }`}
                                        >
                                            {txn.type?.toLowerCase() === "debit"
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
        </div>
    );
};

export default AllTransactions;
