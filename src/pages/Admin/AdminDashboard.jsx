import React from "react";
import { Link } from "react-router-dom";
import { Users, CreditCard, Activity, DollarSign } from "lucide-react";

const AdminDashboard = () => {
    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-600 mt-2">Welcome back, Admin. Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
                    <p className="text-2xl font-bold text-gray-800 mt-1">24,589</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-purple-100 p-3 rounded-lg">
                            <CreditCard className="w-6 h-6 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+5%</span>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Active Accounts</h3>
                    <p className="text-2xl font-bold text-gray-800 mt-1">18,230</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-amber-100 p-3 rounded-lg">
                            <Activity className="w-6 h-6 text-amber-600" />
                        </div>
                        <span className="text-sm font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">-2%</span>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Pending KYC</h3>
                    <p className="text-2xl font-bold text-gray-800 mt-1">145</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-emerald-100 p-3 rounded-lg">
                            <DollarSign className="w-6 h-6 text-emerald-600" />
                        </div>
                        <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+8%</span>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Total Transactions</h3>
                    <p className="text-2xl font-bold text-gray-800 mt-1">$4.2M</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
                    <div className="space-y-3">
                        <Link to="/admin/manage-users" className="block w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition flex items-center justify-between group">
                            <span className="font-medium text-gray-700 group-hover:text-blue-600">Manage Users</span>
                            <Users className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                        </Link>
                        <Link to="/admin/loans" className="block w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition flex items-center justify-between group">
                            <span className="font-medium text-gray-700 group-hover:text-blue-600">Loan Management</span>
                            <CreditCard className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                        </Link>
                        <Link to="/admin/interest-rates" className="block w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition flex items-center justify-between group">
                            <span className="font-medium text-gray-700 group-hover:text-blue-600">Interest Rates</span>
                            <DollarSign className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                        </Link>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0">
                                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                                <div>
                                    <p className="text-sm text-gray-800 font-medium">New user registration</p>
                                    <p className="text-xs text-gray-500">2 minutes ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
