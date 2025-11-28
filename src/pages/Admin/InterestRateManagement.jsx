import React, { useState, useEffect } from "react";
import { getAllInterestRates, updateInterestRate, deleteInterestRate } from "../../api/adminApi";
import { FaEdit, FaTrash, FaPlus, FaPercentage, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const InterestRateManagement = () => {
    const [rates, setRates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRate, setEditingRate] = useState(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        loanType: "HOME_LOAN",
        baseRate: "",
        maxLTV: "",
        minTenure: "",
        maxTenure: ""
    });

    useEffect(() => {
        fetchRates();
    }, []);

    const fetchRates = async () => {
        setLoading(true);
        try {
            const data = await getAllInterestRates();
            setRates(data || []);
        } catch (error) {
            console.error("Error fetching rates:", error);
            // toast.error("Failed to fetch interest rates");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingRate) {
                await updateInterestRate(editingRate.id, formData);
                toast.success("Interest rate updated successfully");
            } else {
                // Assuming create endpoint exists or update handles it? 
                // User prompt only gave PUT /api/interest-rates/{id}. 
                // I'll assume for now we only update existing ones or maybe there's a create one I missed.
                // Actually, usually there's a POST. But based on prompt "Update Interest Rate", I'll focus on update.
                // If "Add" is needed, I'd need a POST endpoint.
                // For now, I'll assume this form is primarily for UPDATING.
                // But to make it functional for "Add", I'll try a POST to /api/interest-rates if id is missing, 
                // but since I don't have that endpoint confirmed, I'll stick to editing.
                // Wait, if I can't create, how do I populate?
                // Let's assume the list is pre-populated or I can't add new types easily without backend support.
                // I will allow editing only for now based on the prompt.
            }
            setIsModalOpen(false);
            fetchRates();
            setEditingRate(null);
        } catch (error) {
            toast.error("Failed to save interest rate");
        }
    };

    const handleEdit = (rate) => {
        setEditingRate(rate);
        setFormData({
            loanType: rate.loanType,
            baseRate: rate.baseRate,
            maxLTV: rate.maxLTV,
            minTenure: rate.minTenure,
            maxTenure: rate.maxTenure
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this interest rate?")) return;
        try {
            await deleteInterestRate(id);
            toast.success("Interest rate deleted");
            fetchRates();
        } catch (error) {
            toast.error("Failed to delete interest rate");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                        >
                            <FaArrowLeft className="mr-2" /> Back
                        </button>
                        <h1 className="text-3xl font-bold text-gray-900">Interest Rates</h1>
                        <p className="text-gray-500 mt-1">Manage loan interest rates and policies</p>
                    </div>
                    {/* <button
            onClick={() => { setEditingRate(null); setFormData({ loanType: "HOME_LOAN", baseRate: "", maxLTV: "", minTenure: "", maxTenure: "" }); setIsModalOpen(true); }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <FaPlus /> Add Rate
          </button> */}
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loan Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Base Rate</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Max LTV</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tenure Range</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {rates.map((rate) => (
                                <tr key={rate.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rate.loanType}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rate.baseRate}%</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rate.maxLTV}%</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rate.minTenure} - {rate.maxTenure} months</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleEdit(rate)} className="text-blue-600 hover:text-blue-900 mr-4">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleDelete(rate.id)} className="text-red-600 hover:text-red-900">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {rates.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                        No interest rates found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            {editingRate ? "Edit Interest Rate" : "Add Interest Rate"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Loan Type</label>
                                <select
                                    value={formData.loanType}
                                    onChange={(e) => setFormData({ ...formData, loanType: e.target.value })}
                                    className="block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    disabled={!!editingRate} // Disable changing type if editing
                                >
                                    <option value="HOME_LOAN">Home Loan</option>
                                    <option value="CAR_LOAN">Car Loan</option>
                                    <option value="EDUCATION_LOAN">Education Loan</option>
                                    <option value="PERSONAL_LOAN">Personal Loan</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Base Rate (%)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.baseRate}
                                    onChange={(e) => setFormData({ ...formData, baseRate: parseFloat(e.target.value) })}
                                    className="block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Max LTV (%)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.maxLTV}
                                    onChange={(e) => setFormData({ ...formData, maxLTV: parseFloat(e.target.value) })}
                                    className="block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Tenure</label>
                                    <input
                                        type="number"
                                        value={formData.minTenure}
                                        onChange={(e) => setFormData({ ...formData, minTenure: parseInt(e.target.value) })}
                                        className="block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Tenure</label>
                                    <input
                                        type="number"
                                        value={formData.maxTenure}
                                        onChange={(e) => setFormData({ ...formData, maxTenure: parseInt(e.target.value) })}
                                        className="block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InterestRateManagement;
