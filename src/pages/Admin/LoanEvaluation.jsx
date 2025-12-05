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
    evaluateLoanApplication,
    getKycDocumentDownloadUrl,
    getLoanById,
    rejectDocument,
    downloadDocument,
    getAllLoansByCif
} from "../../api/adminApi";
import { FaCheckCircle, FaTimesCircle, FaFileAlt, FaMoneyBillWave, FaClipboardCheck, FaArrowLeft, FaDownload, FaUser, FaCalendarAlt, FaChartLine, FaClock } from "react-icons/fa";
import toast from "react-hot-toast";

const LoanEvaluation = () => {
    const { loanId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [loan, setLoan] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [customerLoans, setCustomerLoans] = useState({ active: [], closed: [] });
    const [loading, setLoading] = useState(false);
    // const [selectedDoc, setSelectedDoc] = useState(null); // Removed modal state

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
            fetchData();
        }
    }, [loanId]);

    const fetchData = async () => {
        try {
            setLoading(true);
            // Fetch loan details first
            const loanData = await getLoanById(loanId);
            setLoan(loanData);

            // Pre-fill form data if available
            if (loanData) {
                if (loanData.loanType === 'CAR' && loanData.carLoanDetails) {
                    setCarEvaluation({
                        downPayment: loanData.carLoanDetails.downPayment || "",
                        insuranceValid: loanData.carLoanDetails.insuranceValid || false,
                        carConditionScore: loanData.carLoanDetails.carConditionScore === -1 ? "" : loanData.carLoanDetails.carConditionScore,
                        employmentStabilityYears: loanData.carLoanDetails.employmentStabilityYears || ""
                    });
                }
                if (loanData.educationLoanDetails) {
                    setEduVerification(prev => ({
                        ...prev,
                        ...loanData.educationLoanDetails
                    }));
                }
                if (loanData.homeLoanDetails) {
                    setHomeVerification(prev => ({
                        ...prev,
                        ...loanData.homeLoanDetails,
                        loanId: loanId // Ensure loanId is preserved
                    }));
                }
            }

            // Try to fetch documents, but don't block if it fails
            try {
                const docsData = await getDocumentsByLoanId(loanId);
                console.log("Fetched Documents:", JSON.stringify(docsData, null, 2)); // Debug log
                setDocuments(docsData || []);
            } catch (docError) {
                console.error("Error fetching documents:", docError);
                setDocuments([]);
                setDocuments([]);
            }

            // Fetch all loans for this customer
            if (loanData?.cifNumber) {
                try {
                    const allLoans = await getAllLoansByCif(loanData.cifNumber);
                    // Filter loans into active and closed
                    const active = allLoans.filter(l =>
                        ['APPLIED', 'PENDING', 'APPROVED', 'DISBURSED'].includes(l.status) && l.loanId !== loanId
                    );
                    const closed = allLoans.filter(l =>
                        ['CLOSED', 'REJECTED'].includes(l.status) && l.loanId !== loanId
                    );
                    setCustomerLoans({ active, closed });
                } catch (err) {
                    console.error("Error fetching customer history:", err);
                }
            }

        } catch (error) {
            console.error("Error fetching loan data:", error);
            toast.error("Failed to fetch loan details");
        } finally {
            setLoading(false);
        }
    };

    const handleDocumentVerify = async (docId) => {
        try {
            await verifyDocument(docId);
            toast.success("Document verified successfully");
            fetchData();
        } catch (error) {
            toast.error("Failed to verify document");
        }
    };

    const handleDocumentReject = async (docId) => {
        try {
            await rejectDocument(docId);
            toast.success("Document rejected");
            fetchData();
        } catch (error) {
            toast.error("Failed to reject document");
        }
    };

    const handleViewDocument = async (docId, fileName) => {
        try {
            const blob = await downloadDocument(docId);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            // link.download = fileName; // Uncomment if you want to force download instead of view
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            // window.URL.revokeObjectURL(url); // Revoke after some time or immediately if download
        } catch (error) {
            console.error("Error downloading document:", error);
            toast.error("Failed to view document");
        }
    };

    const getLoanStatusColor = (status) => {
        switch (status) {
            case "APPROVED":
            case "VERIFIED":
                return "bg-green-100 text-green-800";
            case "PENDING":
                return "bg-yellow-100 text-yellow-800";
            case "REJECTED":
                return "bg-red-100 text-red-800";
            case "DISBURSED":
                return "bg-blue-100 text-blue-800";
            case "EVALUATED":
                return "bg-indigo-100 text-indigo-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const handleVerificationSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Check if all documents are verified
            const unverifiedDocs = documents.filter(doc =>
                !doc.verified && doc.kycStatus !== 'VERIFIED' && doc.documentStatus !== 'VERIFIED'
            );

            if (unverifiedDocs.length > 0) {
                toast.error(`Please verify all ${documents.length} documents before submitting verification.`);
                setLoading(false);
                return;
            }

            if (loan.loanType === "CAR") {
                await updateCarLoanEvaluation(loanId, carEvaluation);
            } else if (loan.loanType === "EDUCATION") {
                await verifyEducationBackground(loanId, eduVerification);
            } else if (loan.loanType === "HOME") {
                await verifyHomeProperty({ ...homeVerification, loanId });
            }

            toast.success("Verification submitted successfully");
            fetchData(); // Refresh to get updated status (expected: VERIFIED)
        } catch (error) {
            console.error("Verification error:", error);
            toast.error("Failed to submit verification");
        } finally {
            setLoading(false);
        }
    };

    const handleEvaluate = async () => {
        setLoading(true);
        try {
            await evaluateLoanApplication(loanId);
            toast.success("Loan Evaluated Successfully");
            fetchData(); // Refresh to get updated status (expected: EVALUATED/APPROVED/REJECTED)
        } catch (error) {
            console.error("Evaluation error:", error);
            toast.error("Failed to evaluate loan");
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
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-1 ${getLoanStatusColor(loan.status)}`}>
                            {loan.status}
                        </span>
                    </div>
                </div>

                {/* Detailed Loan Info */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <FaMoneyBillWave className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Loan Amount</p>
                                <p className="font-semibold text-gray-900">
                                    ₹{loan.requestedAmount?.toLocaleString()}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-purple-50 rounded-lg">
                                <FaCalendarAlt className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Applied Date</p>
                                <p className="font-semibold text-gray-900">
                                    {new Date(loan.appliedAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-orange-50 rounded-lg">
                                <FaUser className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Applicant CIF</p>
                                <p className="font-semibold text-gray-900">{loan.cifNumber}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-green-50 rounded-lg">
                                <FaChartLine className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Tenure</p>
                                <p className="font-semibold text-gray-900">{loan.tenureMonths} Months</p>
                            </div>
                        </div>
                    </div>
                    {loan.remarks && (
                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Remarks</h3>
                            <p className="text-gray-600 text-sm">{loan.remarks}</p>
                        </div>
                    )}
                </div>

                {/* Customer Loan History */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Active Loans */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-green-50">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <FaChartLine className="text-green-600" /> Active Loans
                            </h2>
                        </div>
                        <div className="p-4">
                            {customerLoans.active.length > 0 ? (
                                <div className="space-y-3">
                                    {customerLoans.active.map(l => (
                                        <div key={l.loanId} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                                            <div>
                                                <p className="font-medium text-gray-900">{l.loanType} Loan</p>
                                                <p className="text-xs text-gray-500">#{l.loanId} • ₹{l.requestedAmount?.toLocaleString()}</p>
                                            </div>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLoanStatusColor(l.status)}`}>
                                                {l.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm text-center py-4">No other active loans found.</p>
                            )}
                        </div>
                    </div>

                    {/* Closed/Rejected Loans */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <FaClipboardCheck className="text-gray-600" /> Closed / Past Loans
                            </h2>
                        </div>
                        <div className="p-4">
                            {customerLoans.closed.length > 0 ? (
                                <div className="space-y-3">
                                    {customerLoans.closed.map(l => (
                                        <div key={l.loanId} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                                            <div>
                                                <p className="font-medium text-gray-900">{l.loanType} Loan</p>
                                                <p className="text-xs text-gray-500">#{l.loanId} • ₹{l.requestedAmount?.toLocaleString()}</p>
                                            </div>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLoanStatusColor(l.status)}`}>
                                                {l.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm text-center py-4">No closed or rejected loans found.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Document Verification Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <FaFileAlt className="text-blue-600" /> Document Verification
                        </h2>
                        <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">
                            {documents.length} Documents
                        </span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/4">Document Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/4">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {documents.map((doc, index) => {
                                    const docId = doc.documentId || doc.id || doc.loanApplicationId;
                                    return (
                                        <tr key={docId || index} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {doc.documentType}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                {doc.kycStatus === 'VERIFIED' || doc.verified ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200 gap-1.5">
                                                        <FaCheckCircle className="text-green-600" /> Verified
                                                    </span>
                                                ) : doc.kycStatus === 'REJECTED' || doc.documentStatus === 'REJECTED' ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200 gap-1.5">
                                                        <FaTimesCircle className="text-red-600" /> Rejected
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200 gap-1.5">
                                                        <FaClock className="text-yellow-600" /> Pending
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end items-center gap-3">
                                                    {!docId ? (
                                                        <span className="text-xs text-red-500 font-medium bg-red-50 px-2 py-1 rounded border border-red-100">
                                                            ID Missing
                                                        </span>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => handleViewDocument(docId, doc.documentName)}
                                                                className="text-gray-600 hover:text-blue-600 bg-white hover:bg-blue-50 border border-gray-300 hover:border-blue-200 px-3 py-1.5 rounded-lg transition-all flex items-center gap-2 text-xs font-medium shadow-sm"
                                                                title="View Document"
                                                            >
                                                                <FaDownload /> View
                                                            </button>
                                                            {(!doc.verified && doc.kycStatus !== 'VERIFIED' && doc.kycStatus !== 'REJECTED' && doc.documentStatus !== 'REJECTED') && (
                                                                <>
                                                                    <button
                                                                        onClick={() => handleDocumentVerify(docId)}
                                                                        className="text-white bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 shadow-sm"
                                                                        title="Approve Document"
                                                                    >
                                                                        <FaCheckCircle /> Approve
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDocumentReject(docId)}
                                                                        className="text-white bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 shadow-sm"
                                                                        title="Reject Document"
                                                                    >
                                                                        <FaTimesCircle /> Reject
                                                                    </button>
                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                                {documents.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-8 text-center text-gray-500 text-sm bg-gray-50">
                                            <div className="flex flex-col items-center justify-center">
                                                <FaFileAlt className="text-gray-300 text-4xl mb-2" />
                                                <p>No documents found for this loan application.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Verification Form */}
                {(loan.status === "PENDING" || loan.status === "APPLIED") && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <FaClipboardCheck className="text-blue-600" /> Verification Details
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">Verify the details to proceed with the loan application.</p>
                        </div>

                        <div className="p-6">
                            <form onSubmit={handleVerificationSubmit} className="space-y-8">

                                {/* Car Loan Fields */}
                                {loan.loanType === "CAR" && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <div className="col-span-full">
                                            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">Vehicle Assessment</h3>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Down Payment (₹)</label>
                                            <div className="relative rounded-md shadow-sm">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <span className="text-gray-500 sm:text-sm">₹</span>
                                                </div>
                                                <input
                                                    type="number"
                                                    value={carEvaluation.downPayment}
                                                    onChange={(e) => setCarEvaluation({ ...carEvaluation, downPayment: parseFloat(e.target.value) })}
                                                    className="block w-full pl-7 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
                                                    placeholder="0.00"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Car Condition Score (1-10)</label>
                                            <input
                                                type="number"
                                                min="1" max="10"
                                                value={carEvaluation.carConditionScore}
                                                onChange={(e) => setCarEvaluation({ ...carEvaluation, carConditionScore: parseInt(e.target.value) })}
                                                className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
                                                placeholder="Score 1-10"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Employment Stability (Years)</label>
                                            <input
                                                type="number"
                                                value={carEvaluation.employmentStabilityYears}
                                                onChange={(e) => setCarEvaluation({ ...carEvaluation, employmentStabilityYears: parseInt(e.target.value) })}
                                                className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
                                                placeholder="Years"
                                                required
                                            />
                                        </div>

                                        <div className="flex items-center h-full pt-6">
                                            <label className="flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={carEvaluation.insuranceValid}
                                                    onChange={(e) => setCarEvaluation({ ...carEvaluation, insuranceValid: e.target.checked })}
                                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
                                                />
                                                <span className="ml-3 text-sm font-medium text-gray-900">Insurance Valid</span>
                                            </label>
                                        </div>
                                    </div>
                                )}

                                {/* Education Loan Fields */}
                                {loan.loanType === "EDUCATION" && (
                                    <div className="space-y-6">
                                        <div className="col-span-full">
                                            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">Academic Verification</h3>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                                            <label className="flex items-center cursor-pointer p-2 hover:bg-white rounded-md transition-colors">
                                                <input
                                                    type="checkbox"
                                                    checked={eduVerification.admissionVerified}
                                                    onChange={(e) => setEduVerification({ ...eduVerification, admissionVerified: e.target.checked })}
                                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                />
                                                <span className="ml-3 text-sm font-medium text-gray-900">Admission Verified</span>
                                            </label>
                                            <label className="flex items-center cursor-pointer p-2 hover:bg-white rounded-md transition-colors">
                                                <input
                                                    type="checkbox"
                                                    checked={eduVerification.collegeRecognized}
                                                    onChange={(e) => setEduVerification({ ...eduVerification, collegeRecognized: e.target.checked })}
                                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                />
                                                <span className="ml-3 text-sm font-medium text-gray-900">College Recognized</span>
                                            </label>
                                            <label className="flex items-center cursor-pointer p-2 hover:bg-white rounded-md transition-colors">
                                                <input
                                                    type="checkbox"
                                                    checked={eduVerification.feeStructureVerified}
                                                    onChange={(e) => setEduVerification({ ...eduVerification, feeStructureVerified: e.target.checked })}
                                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                />
                                                <span className="ml-3 text-sm font-medium text-gray-900">Fee Structure Verified</span>
                                            </label>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Officer Name</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <FaUser className="text-gray-400" />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={eduVerification.officerName}
                                                        onChange={(e) => setEduVerification({ ...eduVerification, officerName: e.target.value })}
                                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                        placeholder="Verifying Officer"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Verification Date</label>
                                                <input
                                                    type="date"
                                                    value={eduVerification.verificationDate}
                                                    onChange={(e) => setEduVerification({ ...eduVerification, verificationDate: e.target.value })}
                                                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    required
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Officer Remarks</label>
                                                <textarea
                                                    value={eduVerification.officerRemarks}
                                                    onChange={(e) => setEduVerification({ ...eduVerification, officerRemarks: e.target.value })}
                                                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    rows="3"
                                                    placeholder="Enter any additional observations..."
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Home Loan Fields */}
                                {loan.loanType === "HOME" && (
                                    <div className="space-y-6">
                                        <div className="col-span-full">
                                            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">Property Verification</h3>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                                            <label className="flex items-center cursor-pointer p-2 hover:bg-white rounded-md transition-colors">
                                                <input
                                                    type="checkbox"
                                                    checked={homeVerification.addressVerified}
                                                    onChange={(e) => setHomeVerification({ ...homeVerification, addressVerified: e.target.checked })}
                                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                />
                                                <span className="ml-3 text-sm font-medium text-gray-900">Address Verified</span>
                                            </label>
                                            <label className="flex items-center cursor-pointer p-2 hover:bg-white rounded-md transition-colors">
                                                <input
                                                    type="checkbox"
                                                    checked={homeVerification.ownershipVerified}
                                                    onChange={(e) => setHomeVerification({ ...homeVerification, ownershipVerified: e.target.checked })}
                                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                />
                                                <span className="ml-3 text-sm font-medium text-gray-900">Ownership Verified</span>
                                            </label>
                                            <label className="flex items-center cursor-pointer p-2 hover:bg-white rounded-md transition-colors">
                                                <input
                                                    type="checkbox"
                                                    checked={homeVerification.propertyConditionOk}
                                                    onChange={(e) => setHomeVerification({ ...homeVerification, propertyConditionOk: e.target.checked })}
                                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                />
                                                <span className="ml-3 text-sm font-medium text-gray-900">Property Condition OK</span>
                                            </label>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Evaluated Value (₹)</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <span className="text-gray-500 sm:text-sm">₹</span>
                                                    </div>
                                                    <input
                                                        type="number"
                                                        value={homeVerification.evaluatedValue}
                                                        onChange={(e) => setHomeVerification({ ...homeVerification, evaluatedValue: parseFloat(e.target.value) })}
                                                        className="block w-full pl-7 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
                                                        placeholder="0.00"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Visit Date</label>
                                                <input
                                                    type="date"
                                                    value={homeVerification.visitDate}
                                                    onChange={(e) => setHomeVerification({ ...homeVerification, visitDate: e.target.value })}
                                                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Officer Name</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <FaUser className="text-gray-400" />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={homeVerification.officerName}
                                                        onChange={(e) => setHomeVerification({ ...homeVerification, officerName: e.target.value })}
                                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                        placeholder="Verifying Officer"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Officer Remarks</label>
                                                <textarea
                                                    value={homeVerification.officerRemarks}
                                                    onChange={(e) => setHomeVerification({ ...homeVerification, officerRemarks: e.target.value })}
                                                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    rows="3"
                                                    placeholder="Enter any additional observations..."
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-end pt-4 border-t border-gray-100">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 shadow-md transition-all transform hover:-translate-y-0.5"
                                    >
                                        {loading ? (
                                            <span className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Submitting...
                                            </span>
                                        ) : (
                                            "Submit Verification"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Evaluation Action (Only if Verified) */}
                {loan.status === "VERIFIED" && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Ready for Evaluation</h2>
                            <p className="text-gray-500 text-sm">Verification is complete. Proceed to evaluate the loan application.</p>
                        </div>
                        <button
                            onClick={handleEvaluate}
                            disabled={loading}
                            className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 shadow-lg"
                        >
                            {loading ? "Evaluating..." : "Evaluate Application"}
                        </button>
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
