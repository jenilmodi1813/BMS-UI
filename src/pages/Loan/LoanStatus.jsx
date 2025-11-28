// src/pages/LoanStatus.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoanListRequest } from "../../redux/loan/homeLoan/home.loan.slice";
import axios from "axios";
import { BASE_URL } from "../../config/api.config";
import { FaFileInvoiceDollar, FaBuilding, FaCalendarAlt, FaTimes, FaChevronRight } from "react-icons/fa";

const LoanStatus = () => {
  const dispatch = useDispatch();
  const {
    loanList = [],
    loading = false,
    error = null,
  } = useSelector((state) => state.homeLoan || {});

  const [selectedLoan, setSelectedLoan] = useState(null);
  const [emiList, setEmiList] = useState([]);
  const [emiLoading, setEmiLoading] = useState(false);
  const [emiError, setEmiError] = useState(null);

  let cifNumber = null;
  try {
    const authData = localStorage.getItem("auth");
    if (authData) {
      const auth = JSON.parse(authData);
      cifNumber = auth.customer?.cifNumber || auth.cifNumber;
    }
  } catch (e) {
    console.warn("Failed to parse auth from localStorage", e);
  }

  useEffect(() => {
    if (cifNumber) {
      dispatch(fetchLoanListRequest(cifNumber));
    }
  }, [dispatch, cifNumber]);

  // Fetch EMI details when a loan is clicked
  const handleLoanClick = async (loan) => {
    setSelectedLoan(loan);
    setEmiLoading(true);
    setEmiError(null);
    setEmiList([]);

    try {
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      const response = await axios.get(
        `${BASE_URL}/loans/${loan.loanId}/emi/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setEmiList(response.data || []);
    } catch (err) {
      console.error("Failed to fetch EMI details:", err);
      setEmiError(err.response?.data?.message || "Failed to load EMI details");
    } finally {
      setEmiLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedLoan(null);
    setEmiList([]);
    setEmiError(null);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-red-500 bg-red-50 p-6 rounded-xl border border-red-100">
          <p className="font-semibold">Error loading loans</p>
          <p className="text-sm mt-2">{error.message || "Failed to load loans"}</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Loan Status</h1>
          <p className="text-gray-500 mt-1">Track your active loans and EMI schedules</p>
        </div>

        {loanList.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FaFileInvoiceDollar className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No loans found</h3>
            <p className="text-gray-500 mt-2">No active loans found for your account.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loanList
              .filter(
                (loan) =>
                  loan.status === "APPROVED" || loan.status === "DISBURSED"
              )
              .map((loan) => (
                <div
                  key={loan.loanId}
                  onClick={() => handleLoanClick(loan)}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <FaFileInvoiceDollar className="text-blue-600 text-xl" />
                      </div>
                      <StatusBadge status={loan.status} />
                    </div>

                    <h2 className="text-lg font-bold text-gray-900 mb-1">
                      {loan.loanType} Loan
                    </h2>
                    <p className="text-sm text-gray-500 mb-4">ID: #{loan.loanId}</p>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Amount</span>
                        <span className="font-semibold text-gray-900">₹{loan.requestedAmount?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Tenure</span>
                        <span className="font-semibold text-gray-900">{loan.tenureMonths} months</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Bank</span>
                        <span className="font-semibold text-gray-900 truncate max-w-[150px]">{loan.bankName}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center group-hover:bg-blue-50 transition-colors">
                    <span className="text-sm font-medium text-blue-600">View EMI Schedule</span>
                    <FaChevronRight className="text-blue-600 text-sm transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* EMI Details Modal */}
      {selectedLoan && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto bg-white/30 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-white rounded-t-2xl sticky top-0 z-20">
              <div>
                <h3 className="text-xl font-bold text-gray-900" id="modal-title">
                  EMI Schedule
                </h3>
                <p className="text-sm text-gray-500 mt-1">Loan #{selectedLoan.loanId} • {selectedLoan.loanType}</p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {emiLoading ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-gray-500">Loading schedule...</p>
                </div>
              ) : emiError ? (
                <div className="flex flex-col items-center justify-center h-64 text-red-500 bg-red-50 rounded-xl p-6">
                  <p className="font-medium mb-2">Error loading schedule</p>
                  <p className="text-sm">{emiError}</p>
                </div>
              ) : emiList.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500 bg-gray-50 rounded-xl">
                  <p>No EMI records found.</p>
                </div>
              ) : (
                <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-700">
                      <thead className="bg-gray-50 text-gray-600">
                        <tr>
                          <th className="px-6 py-3 font-semibold whitespace-nowrap">#</th>
                          <th className="px-6 py-3 font-semibold whitespace-nowrap">Due Date</th>
                          <th className="px-6 py-3 font-semibold whitespace-nowrap">EMI Amount</th>
                          <th className="px-6 py-3 font-semibold whitespace-nowrap">Principal</th>
                          <th className="px-6 py-3 font-semibold whitespace-nowrap">Interest</th>
                          <th className="px-6 py-3 font-semibold whitespace-nowrap">Status</th>
                          <th className="px-6 py-3 font-semibold whitespace-nowrap">Paid On</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {emiList.map((emi) => (
                          <tr
                            key={emi.emiId}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4 font-medium text-gray-900">{emi.installmentNumber}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{emi.dueDate}</td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                              ₹{emi.emiAmount?.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                              ₹{emi.principalComponent?.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                              ₹{emi.interestComponent?.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <StatusBadge status={emi.status} />
                            </td>
                            <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                              {emi.paymentDate || "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t border-gray-200 rounded-b-2xl sticky bottom-0 z-20">
              <span className="text-sm text-gray-500 font-medium">Total EMIs: {emiList.length}</span>
              <button
                type="button"
                className="inline-flex justify-center rounded-lg border border-transparent shadow-sm px-6 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    APPROVED: "bg-green-100 text-green-800",
    PAID: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
    OVERDUE: "bg-red-100 text-red-800",
    PENDING: "bg-yellow-100 text-yellow-800",
    DISBURSED: "bg-blue-100 text-blue-800",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-800"}`}>
      {status}
    </span>
  );
};

export default LoanStatus;
