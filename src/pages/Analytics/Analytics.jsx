import React from "react";
import { FaChartPie, FaChartBar, FaChartLine, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Analytics = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center mb-8">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="mr-4 text-gray-500 hover:text-blue-600 transition"
                    >
                        <FaArrowLeft size={24} />
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Financial Analytics
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">Total Income</h3>
                            <div className="p-3 bg-green-100 rounded-full text-green-600">
                                <FaChartLine size={20} />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">₹1,24,500</p>
                        <p className="text-sm text-green-500 mt-2">+12% from last month</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">Total Expenses</h3>
                            <div className="p-3 bg-red-100 rounded-full text-red-600">
                                <FaChartBar size={20} />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">₹45,200</p>
                        <p className="text-sm text-red-500 mt-2">+5% from last month</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">Net Savings</h3>
                            <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                                <FaChartPie size={20} />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">₹79,300</p>
                        <p className="text-sm text-blue-500 mt-2">On track for goals</p>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center h-96">
                    <p className="text-gray-500 text-lg">
                        Detailed charts and graphs coming soon...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
