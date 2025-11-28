import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import {
    updateCarLoanEvaluation,
    verifyEducationBackground,
    verifyHomeProperty,
    sanctionHomeLoan,
    disburseLoan,
    getDocumentsByLoanId,
    verifyDocument,
    evaluateLoanApplication
} from "../../api/adminApi";
import { FaCheckCircle, FaTimesCircle, FaFileAlt, FaMoneyBillWave, FaClipboardCheck, FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";

const LoanEvaluation = () => {
    const { loanId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [loan, setLoan] = useState(location.state?.loan || null);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);

    // Form States
    const [carEvaluation, setCarEvaluation] = useState({
        downPayment: "",
        insuranceValid: false,
        carConditionScore: "",
        employmentStabilityYears: ""
    });

    const [eduVerification, setEduVerification] = useState({
        admissionVerified: false,
        collegeRecognized: false,
        feeStructureVerified: false,
        officerName: "",
        officerRemarks: "",
        verificationDate: new Date().toISOString().split('T')[0]
    });

    const [homeVerification, setHomeVerification] = useState({
        loanId: loanId,
        addressVerified: false,
        ownershipVerified: false,
        propertyConditionOk: false,
        evaluatedValue: "",
        officerName: "",
        officerRemarks: "",
        visitDate: new Date().toISOString().split('T')[0]
    });

    const [sanctionData, setSanctionData] = useState({
        sanctionedAmount: "",
        interestRate: "",
        tenureMonths: ""
    });

    useEffect(() => {
        if (loanId) {
            fetchDocuments();
        }
    }, [loanId]);

    const fetchDocuments = async () => {
        try {
            const docs = await getDocumentsByLoanId(loanId);
            setDocuments(docs || []);
        } catch (error) {
            console.error("Error fetching documents:", error);
            // toast.error("Failed to load documents");
        }
    };

    const handleDocumentVerify = async (docId) => {
        try {
            await verifyDocument(docId);
            toast.success("Document verified successfully");
            fetchDocuments();
        } catch (error) {
            toast.error("Failed to verify document");
        }
    };

    const handleEvaluationSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (loan.loanType === "CAR") {
                await updateCarLoanEvaluation(loanId, carEvaluation);
            } else if (loan.loanType === "EDUCATION") {
                await verifyEducationBackground(loanId, eduVerification);
            } else if (loan.loanType === "HOME") {
                await verifyHomeProperty({ ...homeVerification, loanId });
            }

            // Trigger automated evaluation after manual input
            await evaluateLoanApplication(loanId);

            toast.success("Evaluation submitted successfully");
            navigate("/admin/loans");
        } catch (error) {
            console.error("Evaluation error:", error);
            toast.error("Failed to submit evaluation");
        } finally {
            setLoading(false);
        }
    };

    const handleSanctionSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await sanctionHomeLoan(loanId, sanctionData);
            toast.success("Loan Sanctioned Successfully!");
            navigate("/admin/loans");
        } catch (error) {
            toast.error("Failed to sanction loan");
        } finally {
            setLoading(false);
        }
    };

    const handleDisburse = async () => {
        if (!window.confirm("Are you sure you want to disburse this loan?")) return;
        setLoading(true);
        try {
            await disburseLoan(loanId);
            toast.success("Loan Disbursed Successfully!");
            navigate("/admin/loans");
        } catch (error) {
            toast.error("Failed to disburse loan");
        } finally {
            setLoading(false);
        }
    };

    if (!loan) return <div className="p-8 text-center">Loading loan details...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex justify-between items-start">
                    <div>
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                        >
                            <FaArrowLeft className="mr-2" /> Back
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900">Loan Evaluation</h1>
                        <p className="text-gray-500">#{loanId} • {loan.loanType} Loan</p>
                    </div>
                    <div className="text-right">
                        <span className="block text-sm text-gray-500">Current Status</span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mt-1">
                            {loan.status}
                        </span>
                    </div>
                </div>

                {/* Document Verification Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <FaFileAlt className="text-blue-600" /> Document Verification
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {documents.map((doc) => (
                                    <tr key={doc.documentId}>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{doc.documentType}</td>
                                        <td className="px-6 py-4 text-sm">
                                            {doc.verified ? (
                                                <span className="text-green-600 flex items-center gap-1"><FaCheckCircle /> Verified</span>
                                            ) : (
                                                <span className="text-yellow-600 flex items-center gap-1"><FaTimesCircle /> Pending</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {!doc.verified && (
                                                <button
                                                    onClick={() => handleDocumentVerify(doc.documentId)}
                                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                >
                                                    Verify Now
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {documents.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-4 text-center text-gray-500 text-sm">No documents found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Evaluation Form */}
                {loan.status === "PENDING" && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                            <FaClipboardCheck className="text-blue-600" /> Evaluation Details
                        </h2>
                        <form onSubmit={handleEvaluationSubmit} className="space-y-6">

                            {/* Car Loan Fields */}
                            {loan.loanType === "CAR" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment</label>
                                        <input
                                            type="number"
                                            value={carEvaluation.downPayment}
                                            onChange={(e) => setCarEvaluation({ ...carEvaluation, downPayment: parseFloat(e.target.value) })}
                                            className="block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Car Condition Score (1-10)</label>
                                        <input
                                            type="number"
                                            min="1" max="10"
                                            value={carEvaluation.carConditionScore}
                                            onChange={(e) => setCarEvaluation({ ...carEvaluation, carConditionScore: parseInt(e.target.value) })}
                                            className="block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Employment Stability (Years)</label>
                                        <input
                                            type="number"
                                            value={carEvaluation.employmentStabilityYears}
                                            onChange={(e) => setCarEvaluation({ ...carEvaluation, employmentStabilityYears: parseInt(e.target.value) })}
                                            className="block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center pt-6">
                                        <input
                                            type="checkbox"
                                            checked={carEvaluation.insuranceValid}
                                            onChange={(e) => setCarEvaluation({ ...carEvaluation, insuranceValid: e.target.checked })}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label className="ml-2 block text-sm text-gray-900">Insurance Valid</label>
                                    </div>
                                </div>
                            )}

                            {/* Education Loan Fields */}
                            {loan.loanType === "EDUCATION" && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={eduVerification.admissionVerified}
                                                onChange={(e) => setEduVerification({ ...eduVerification, admissionVerified: e.target.checked })}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <label className="ml-2 block text-sm text-gray-900">Admission Verified</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={eduVerification.collegeRecognized}
                                                onChange={(e) => setEduVerification({ ...eduVerification, collegeRecognized: e.target.checked })}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <label className="ml-2 block text-sm text-gray-900">College Recognized</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={eduVerification.feeStructureVerified}
                                                onChange={(e) => setEduVerification({ ...eduVerification, feeStructureVerified: e.target.checked })}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <label className="ml-2 block text-sm text-gray-900">Fee Structure Verified</label>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Officer Name</label>
                                            <input
                                                type="text"
                                                value={eduVerification.officerName}
                                                onChange={(e) => setEduVerification({ ...eduVerification, officerName: e.target.value })}
                                                className="block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Verification Date</label>
                                            <input
                                                type="date"
                                                value={eduVerification.verificationDate}
                                                onChange={(e) => setEduVerification({ ...eduVerification, verificationDate: e.target.value })}
                                                className="block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Officer Remarks</label>
                                            <textarea
                                                value={eduVerification.officerRemarks}
                                                onChange={(e) => setEduVerification({ ...eduVerification, officerRemarks: e.target.value })}
                                                className="block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                rows="3"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Home Loan Fields */}
                            {loan.loanType === "HOME" && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={homeVerification.addressVerified}
                                                onChange={(e) => setHomeVerification({ ...homeVerification, addressVerified: e.target.checked })}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <label className="ml-2 block text-sm text-gray-900">Address Verified</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={homeVerification.ownershipVerified}
                                                onChange={(e) => setHomeVerification({ ...homeVerification, ownershipVerified: e.target.checked })}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <label className="ml-2 block text-sm text-gray-900">Ownership Verified</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={homeVerification.propertyConditionOk}
                                                onChange={(e) => setHomeVerification({ ...homeVerification, propertyConditionOk: e.target.checked })}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <label className="ml-2 block text-sm text-gray-900">Property Condition OK</label>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Evaluated Value</label>
                                            <input
                                                type="number"
                                                value={homeVerification.evaluatedValue}
                                                onChange={(e) => setHomeVerification({ ...homeVerification, evaluatedValue: parseFloat(e.target.value) })}
                                                className="block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Visit Date</label>
                                            <input
                                                type="date"
                                                value={homeVerification.visitDate}
                                                onChange={(e) => setHomeVerification({ ...homeVerification, visitDate: e.target.value })}
                                                className="block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Officer Name</label>
                                            <input
                                                type="text"
                                                value={homeVerification.officerName}
                                                onChange={(e) => setHomeVerification({ ...homeVerification, officerName: e.target.value })}
                                                className="block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Officer Remarks</label>
                                            <textarea
                                                value={homeVerification.officerRemarks}
                                                onChange={(e) => setHomeVerification({ ...homeVerification, officerRemarks: e.target.value })}
                                                className="block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                rows="3"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                >
                                    {loading ? "Submitting..." : "Submit Evaluation"}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Sanction Form (Only if Approved/Evaluated but not Sanctioned) */}
                {/* Note: Logic depends on backend status flow. Assuming 'APPROVED' means ready for sanction or already sanctioned? 
            Usually: PENDING -> EVALUATED -> APPROVED (Sanctioned) -> DISBURSED.
            The user prompt says "Sanction Home Loan" endpoint. 
            I'll show this if status is 'PENDING' (after evaluation) or a specific intermediate status if exists.
            For now, I'll show it if status is 'PENDING' or 'EVALUATED' (if that exists) to allow sanctioning.
        */}
                {(loan.status === "PENDING" || loan.status === "APPROVED") && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                            <FaMoneyBillWave className="text-blue-600" /> Sanction Details
                        </h2>
                        <form onSubmit={handleSanctionSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sanctioned Amount</label>
                                <input
                                    type="number"
                                    value={sanctionData.sanctionedAmount}
                                    onChange={(e) => setSanctionData({ ...sanctionData, sanctionedAmount: parseFloat(e.target.value) })}
                                    className="block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={sanctionData.interestRate}
                                    onChange={(e) => setSanctionData({ ...sanctionData, interestRate: parseFloat(e.target.value) })}
                                    className="block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tenure (Months)</label>
                                <input
                                    type="number"
                                    value={sanctionData.tenureMonths}
                                    onChange={(e) => setSanctionData({ ...sanctionData, tenureMonths: parseInt(e.target.value) })}
                                    className="block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="md:col-span-3 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                                >
                                    Sanction Loan
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Disbursal Action */}
                {loan.status === "APPROVED" && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Ready for Disbursal</h2>
                            <p className="text-gray-500 text-sm">Loan has been sanctioned and is ready to be disbursed to the customer.</p>
                        </div>
                        <button
                            onClick={handleDisburse}
                            disabled={loading}
                            className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 shadow-lg"
                        >
                            Disburse Loan
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoanEvaluation;
