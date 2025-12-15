import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaTimes,
    FaUser,
    FaPhone,
    FaBuilding,
    FaCalendar,
    FaMoneyBillWave,
    FaKey,
    FaUniversity,
    FaBriefcase,
    FaChartLine,
    FaWallet,
    FaIdCard
} from "react-icons/fa";

const AccountDetailsModal = ({
    account,
    onClose,
    onCheckBalance,
    onChangePin,
    balance
}) => {
    if (!account) return null;

    const getAccountGradient = (type) => {
        switch (type?.toUpperCase()) {
            case "SAVINGS": return "from-blue-600 to-blue-500";
            case "CURRENT": return "from-purple-600 to-purple-500";
            case "SALARY": return "from-emerald-600 to-emerald-500";
            default: return "from-slate-600 to-slate-500";
        }
    };

    const getAccountIcon = (type) => {
        switch (type?.toUpperCase()) {
            case "SAVINGS": return <FaWallet />;
            case "CURRENT": return <FaBriefcase />;
            case "SALARY": return <FaChartLine />;
            default: return <FaUniversity />;
        }
    };

    const InfoRow = ({ label, value, icon }) => (
        <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-white hover:shadow-sm border border-slate-100 transition-all">
            {icon && <div className="mt-0.5 text-slate-400 text-sm">{icon}</div>}
            <div className="flex-1">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
                <p className="text-slate-800 font-medium break-all">{value || "N/A"}</p>
            </div>
        </div>
    );

    const SectionHeader = ({ title }) => (
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 mb-3 flex items-center gap-2 mt-6 first:mt-0">
            <span className="w-1 h-4 bg-blue-500 rounded-full"></span>
            {title}
        </h3>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            />

            <motion.div
                className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className={`relative p-6 sm:p-8 bg-gradient-to-r ${getAccountGradient(account.accountType)} text-white`}>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
                    >
                        <FaTimes />
                    </button>

                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-2xl shadow-lg">
                            {getAccountIcon(account.accountType)}
                        </div>
                        <div>
                            <p className="opacity-80 text-sm font-medium tracking-wide">Account Details</p>
                            <h2 className="text-2xl font-bold">{account.accountType} Account</h2>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mt-2">
                        <div className="font-mono text-xl sm:text-2xl tracking-wider opacity-90">
                            {account.accountNumber}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${account.status === "ACTIVE"
                            ? "bg-emerald-400/20 border-emerald-400/30 text-emerald-50"
                            : "bg-rose-400/20 border-rose-400/30 text-rose-50"
                            }`}>
                            {account.status}
                        </span>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-2">

                    {/* General Information */}
                    <SectionHeader title="General Information" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <InfoRow label="CIF Number" value={account.cifNumber} icon={<FaIdCard />} />


                    </div>

                    {/* Personal & Financial */}
                    <SectionHeader title="Personal & Financial" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <InfoRow label="Occupation" value={account.occupation} icon={<FaBriefcase />} />
                        <InfoRow label="Income Source" value={account.sourceOfIncome} />
                        <InfoRow label="Gross Annual Income" value={account.grossAnnualIncome ? `₹${account.grossAnnualIncome.toLocaleString()}` : null} />
                    </div>

                    {/* Nominee Details */}
                    {(account.nomineeName || account.nomineeRelation) && (
                        <>
                            <SectionHeader title="Nominee Details" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <InfoRow label="Nominee Name" value={account.nomineeName} icon={<FaUser />} />
                                <InfoRow label="Relationship" value={account.nomineeRelation} />
                                {account.nomineeAge && <InfoRow label="Age" value={`${account.nomineeAge} Years`} />}
                                {account.nomineeContact && <InfoRow label="Contact" value={account.nomineeContact} icon={<FaPhone />} />}
                            </div>
                        </>
                    )}

                    {/* Account Specific Details */}
                    {account.savingsDetails && (
                        <>
                            <SectionHeader title="Savings Account Features" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <InfoRow label="Interest Rate" value={account.savingsDetails.interestRate ? `${account.savingsDetails.interestRate}%` : "N/A"} />

                                <InfoRow label="Withdrawal Limit (Monthly)" value={account.savingsDetails.withdrawalLimitPerMonth} />
                                <InfoRow label="Cheque Book" value={account.savingsDetails.chequeBookAvailable ? "Available" : "Not Available"} />
                            </div>
                        </>
                    )}

                    {account.currentDetails && (
                        <>
                            <SectionHeader title="Current Account Features" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <InfoRow label="Business Name" value={account.currentDetails.businessName} icon={<FaBuilding />} />
                                <InfoRow label="Overdraft Limit" value={account.currentDetails.overdraftLimit ? `₹${account.currentDetails.overdraftLimit.toLocaleString()}` : "N/A"} />
                                <InfoRow label="Monthly Service Charge" value={account.currentDetails.monthlyServiceCharge ? `₹${account.currentDetails.monthlyServiceCharge.toLocaleString()}` : "N/A"} />
                                <InfoRow label="Overdraft Facility" value={account.currentDetails.hasOverdraftFacility ? "Enabled" : "Disabled"} />
                            </div>
                        </>
                    )}

                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 bg-white border border-slate-200 rounded-xl p-3 flex justify-between items-center shadow-sm">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase">Available Balance</p>
                            {balance ? (
                                <p className="text-xl font-bold text-slate-900">₹{balance.toLocaleString()}</p>
                            ) : (
                                <p className="text-lg font-bold text-slate-300">••••••</p>
                            )}
                        </div>
                        <button
                            onClick={() => onCheckBalance(account.id, account.accountNumber)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${balance
                                ? "bg-slate-100 text-slate-500 cursor-default"
                                : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20"
                                }`}
                            disabled={!!balance}
                        >
                            {balance ? "Visible" : "Check Balance"}
                        </button>
                    </div>

                    <button
                        onClick={() => onChangePin(account.accountNumber)}
                        className="px-6 py-3 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-900 transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                        <FaKey className="text-sm" />
                        Change PIN
                    </button>
                </div>

            </motion.div>
        </div>
    );
};

export default AccountDetailsModal;
