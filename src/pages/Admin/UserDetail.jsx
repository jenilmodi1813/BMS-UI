import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Calendar, User, Shield, CreditCard, FileText, Check, X, Download } from "lucide-react";
import { getCustomerById, approveCustomerKyc, rejectCustomerKyc, getKycDocumentDownloadUrl } from "../../api/adminApi";
import toast from "react-hot-toast";

const UserDetail = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUser = async () => {
        try {
            const data = await getCustomerById(userId);
            setUser(data);
        } catch (err) {
            setError("Failed to fetch user details");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [userId]);

    const handleVerifyDocument = async (docId) => {
        try {
            await approveCustomerKyc(docId);
            toast.success("Document verified successfully");
            fetchUser();
        } catch (error) {
            toast.error("Failed to verify document");
            console.error(error);
        }
    };

    const handleRejectDocument = async (docId) => {
        if (!window.confirm("Are you sure you want to reject this document?")) return;
        try {
            await rejectCustomerKyc(docId);
            toast.success("Document rejected");
            fetchUser();
        } catch (error) {
            toast.error("Failed to reject document");
            console.error(error);
        }
    };

    if (loading) return <div className="p-6 text-center">Loading...</div>;
    if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
    if (!user) return <div className="p-6 text-center">User not found</div>;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link to="/admin/manage-users" className="p-2 hover:bg-gray-100 rounded-full transition">
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">User Details</h1>
                    <p className="text-gray-600 mt-1">View customer information</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Info Card */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
                                {user.firstName[0]}{user.lastName[0]}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">{user.firstName} {user.lastName}</h2>
                                <p className="text-gray-500">Customer ID: {user.customerId}</p>
                            </div>
                            <div className="ml-auto">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${user.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                                    user.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                    {user.status}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-sm text-gray-500 flex items-center gap-2">
                                    <Mail className="w-4 h-4" /> Email
                                </label>
                                <p className="font-medium text-gray-900">{user.email}</p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm text-gray-500 flex items-center gap-2">
                                    <Phone className="w-4 h-4" /> Phone
                                </label>
                                <p className="font-medium text-gray-900">{user.phoneNo}</p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm text-gray-500 flex items-center gap-2">
                                    <User className="w-4 h-4" /> Gender
                                </label>
                                <p className="font-medium text-gray-900">{user.gender}</p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm text-gray-500 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" /> Date of Birth
                                </label>
                                <p className="font-medium text-gray-900">{user.dob}</p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm text-gray-500 flex items-center gap-2">
                                    <Shield className="w-4 h-4" /> Role
                                </label>
                                <p className="font-medium text-gray-900">{user.role}</p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm text-gray-500 flex items-center gap-2">
                                    <CreditCard className="w-4 h-4" /> CIF Number
                                </label>
                                <p className="font-medium text-gray-900">{user.cifNumber}</p>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Address</h3>
                            <p className="text-gray-600">{user.address}</p>
                        </div>
                    </div>
                </div>

                {/* KYC Documents Side Panel */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-gray-500" />
                            KYC Documents
                        </h3>

                        {user.kycDocuments && user.kycDocuments.length > 0 ? (
                            <div className="space-y-4">
                                {user.kycDocuments.map((doc) => (
                                    <div key={doc.kycId} className="p-3 border border-gray-200 rounded-lg">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="font-medium text-gray-900">{doc.documentType}</span>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${doc.documentStatus === 'APPROVED' ? 'bg-green-100 text-green-800' :
                                                doc.documentStatus === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                {doc.documentStatus}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-2">Number: {doc.documentNumber}</p>

                                        <div className="flex items-center justify-between mt-3">
                                            {/* <a 
                                                href={getKycDocumentDownloadUrl(doc.kycId)} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
                                            >
                                                <Download className="w-3 h-3" /> View/Download
                                            </a> */}
                                            <div></div>

                                            {doc.documentStatus === 'PENDING' && (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleVerifyDocument(doc.kycId)}
                                                        className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200 transition"
                                                        title="Verify"
                                                    >
                                                        <Check className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleRejectDocument(doc.kycId)}
                                                        className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                                                        title="Reject"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {doc.approvalDate && (
                                            <p className="text-xs text-gray-400 mt-2">Processed: {doc.approvalDate}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">No KYC documents found.</p>
                        )}
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Metadata</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Created At</span>
                                <span className="text-gray-900">{new Date(user.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
