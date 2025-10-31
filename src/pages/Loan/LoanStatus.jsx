// src/pages/LoanStatus.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoanListRequest } from "../../redux/loan/homeLoan/home.loan.slice";
import axios from "axios";
import { BASE_URL } from "../../config/api.config";

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
        `${BASE_URL}/api/v1/loans/${loan.loanId}/emi/all`,
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
    return <div className="p-10 text-center text-blue-500">Loading...</div>;
  if (error)
    return (
      <div className="p-10 text-center text-red-500">
        {error.message || "Failed to load loans"}
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 border-b pb-2">
        Loan Status
      </h1>

      {loanList.length === 0 ? (
        <p className="text-gray-600 text-center mt-10">
          No loans found for your CIF.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loanList
            .filter(
              (loan) =>
                loan.status === "APPROVED" || loan.status === "DISBURSED"
            )
            .map((loan) => (
              <div
                key={loan.loanId}
                onClick={() => handleLoanClick(loan)}
                className="bg-white border border-gray-200 rounded-lg shadow-md p-5 hover:shadow-lg transition-all cursor-pointer relative"
              >
                {/* Status Badge - Top Right */}
                <div
                  className={`absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    loan.status === "APPROVED"
                      ? "bg-green-100 text-green-800"
                      : loan.status === "REJECTED"
                      ? "bg-red-100 text-red-800"
                      : loan.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {loan.status}
                </div>

                <h2 className="text-lg font-bold text-gray-800 mb-3">
                  Loan ID: {loan.loanId} ({loan.loanType})
                </h2>
                <p>
                  <strong>Requested Amount:</strong> ₹
                  {loan.requestedAmount?.toLocaleString()}
                </p>
                <p>
                  <strong>Tenure:</strong> {loan.tenureMonths} months
                </p>
                <p>
                  <strong>Bank:</strong> {loan.bankName}
                </p>
                <p>
                  <strong>Applied On:</strong>{" "}
                  {new Date(loan.appliedAt).toLocaleDateString()}
                </p>

                {loan.homeLoanDetails && (
                  <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-700">
                    <p>
                      <strong>Property:</strong>{" "}
                      {loan.homeLoanDetails.propertyAddress}
                    </p>
                    <p>
                      <strong>Value:</strong> ₹
                      {loan.homeLoanDetails.propertyValue?.toLocaleString()}
                    </p>
                  </div>
                )}

                <div className="mt-4 text-blue-600 text-sm font-medium">
                  → View EMI Schedule
                </div>
              </div>
            ))}
        </div>
      )}

      {/* EMI Details Modal */}
      {selectedLoan && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="border-b p-5 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                EMI Schedule — Loan #{selectedLoan.loanId}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
              >
                &times;
              </button>
            </div>

            <div className="overflow-auto flex-grow p-5">
              {emiLoading ? (
                <p className="text-center text-blue-500">
                  Loading EMI details...
                </p>
              ) : emiError ? (
                <p className="text-center text-red-500">{emiError}</p>
              ) : emiList.length === 0 ? (
                <p className="text-center text-gray-500">
                  No EMI records found.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-700">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2">Installment</th>
                        <th className="px-4 py-2">Due Date</th>
                        <th className="px-4 py-2">EMI (₹)</th>
                        <th className="px-4 py-2">Principal</th>
                        <th className="px-4 py-2">Interest</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Paid On</th>
                        <th className="px-4 py-2">Late Fee</th>
                      </tr>
                    </thead>
                    <tbody>
                      {emiList.map((emi) => (
                        <tr
                          key={emi.emiId}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="px-4 py-2">{emi.installmentNumber}</td>
                          <td className="px-4 py-2">{emi.dueDate}</td>
                          <td className="px-4 py-2">
                            ₹{emi.emiAmount?.toLocaleString()}
                          </td>
                          <td className="px-4 py-2">
                            ₹{emi.principalComponent?.toLocaleString()}
                          </td>
                          <td className="px-4 py-2">
                            ₹{emi.interestComponent?.toLocaleString()}
                          </td>
                          <td className="px-4 py-2">
                            <span
                              className={`px-2 py-0.5 rounded text-xs font-medium ${
                                emi.status === "PAID"
                                  ? "bg-green-100 text-green-800"
                                  : emi.status === "OVERDUE"
                                  ? "bg-red-100 text-red-800"
                                  : emi.status === "PENDING"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {emi.status}
                            </span>
                          </td>
                          <td className="px-4 py-2">
                            {emi.paymentDate || "—"}
                          </td>
                          <td className="px-4 py-2">
                            {emi.lateFee
                              ? `₹${emi.lateFee.toLocaleString()}`
                              : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="border-t p-4 text-center text-sm text-gray-500">
              Total EMIs: {emiList.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanStatus;
