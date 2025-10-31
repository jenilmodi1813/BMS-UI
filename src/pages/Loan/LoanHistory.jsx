import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoanListRequest } from "../../redux/loan/homeLoan/home.loan.slice";

const LoanHistory = () => {
  const dispatch = useDispatch();

  // ✅ FIX: Read from "homeLoan", NOT "loan"
  const { loanList = [], loading = false, error = null } = useSelector(
    (state) => state.homeLoan || {} // ← safe fallback
  );

  const [selectedLoan, setSelectedLoan] = useState(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    const user = storedAuth ? JSON.parse(storedAuth) : null;
    const cifNumber = user?.customer?.cifNumber;

    if (cifNumber) {
      dispatch(fetchLoanListRequest(cifNumber));
    }
  }, [dispatch]);

  if (loading) return <p className="text-center text-gray-600 mt-10">Loading your loan history...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Error: {typeof error === 'string' ? error : error?.message || 'Failed to load'}</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-8">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800 border-b pb-2">
        Loan History
      </h2>

      {loanList.length === 0 ? (
        <p className="text-gray-500 text-center">No loans found for your account.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
          <table className="w-full border-collapse text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-800">
              <tr>
                <th className="border-b p-3 text-left font-medium">Loan ID</th>
                <th className="border-b p-3 text-left font-medium">Type</th>
                <th className="border-b p-3 text-left font-medium">Bank</th>
                <th className="border-b p-3 text-left font-medium">Amount</th>
                <th className="border-b p-3 text-left font-medium">Status</th>
                <th className="border-b p-3 text-left font-medium">Applied On</th>
                <th className="border-b p-3 text-center font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {loanList.map((loan) => (
                <tr
                  key={loan.loanId}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="border-b p-3">{loan.loanId}</td>
                  <td className="border-b p-3">{loan.loanType}</td>
                  <td className="border-b p-3">{loan.bankName}</td>
                  <td className="border-b p-3">
                    ₹{loan.requestedAmount?.toFixed(2)}
                  </td>
                  <td
                    className={`border-b p-3 font-medium ${
                      loan.status === "APPROVED"
                        ? "text-green-600"
                        : loan.status === "REJECTED"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {loan.status}
                  </td>
                  <td className="border-b p-3">
                    {new Date(loan.appliedAt).toLocaleDateString()}
                  </td>
                  <td className="border-b p-3 text-center">
                    <button
                      onClick={() => setSelectedLoan(loan)}
                      className="px-4 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Loan Details Modal */}
      {selectedLoan && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative border border-gray-200">
            <button
              onClick={() => setSelectedLoan(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-semibold"
            >
              ×
            </button>

            <h3 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
              Loan #{selectedLoan.loanId} Details
            </h3>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <Detail label="Loan Type" value={selectedLoan.loanType} />
              <Detail label="Status" value={selectedLoan.status} />
              <Detail label="Bank" value={selectedLoan.bankName} />
              <Detail label="Account" value={selectedLoan.bankAccount} />
              <Detail label="IFSC" value={selectedLoan.ifscCode} />
              <Detail label="Requested Amount" value={`₹${selectedLoan.requestedAmount}`} />
              <Detail
                label="Approved Amount"
                value={
                  selectedLoan.approvedAmount
                    ? `₹${selectedLoan.approvedAmount}`
                    : "Pending"
                }
              />
              <Detail label="Interest Rate" value={`${selectedLoan.interestRate}%`} />
              <Detail label="Tenure" value={`${selectedLoan.tenureMonths} months`} />
              <Detail
                label="Applied On"
                value={new Date(selectedLoan.appliedAt).toLocaleString()}
              />
            </div>

            {selectedLoan.homeLoanDetails && (
              <div className="mt-6 border-t pt-4">
                <h4 className="text-lg font-semibold mb-3 text-gray-700">
                  Home Loan Details
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <Detail
                    label="Property Address"
                    value={selectedLoan.homeLoanDetails.propertyAddress}
                  />
                  <Detail
                    label="Builder Name"
                    value={selectedLoan.homeLoanDetails.builderName}
                  />
                  <Detail
                    label="Property Value"
                    value={`₹${selectedLoan.homeLoanDetails.propertyValue}`}
                  />
                  <Detail
                    label="Down Payment"
                    value={`₹${selectedLoan.homeLoanDetails.downPayment}`}
                  />
                  <Detail
                    label="Approved by Authority"
                    value={
                      selectedLoan.homeLoanDetails.approvedByAuthority
                        ? "Yes"
                        : "No"
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-xs text-gray-500 uppercase tracking-wide">{label}</span>
    <span className="text-sm font-medium text-gray-800 mt-1">{value || "—"}</span>
  </div>
);

export default LoanHistory;