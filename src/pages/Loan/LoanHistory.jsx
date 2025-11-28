import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoanListRequest } from "../../redux/loan/homeLoan/home.loan.slice";
import { FaEye, FaTimes, FaFileInvoiceDollar, FaBuilding, FaCalendarAlt, FaPercentage, FaClock } from "react-icons/fa";

const LoanHistory = () => {
  const dispatch = useDispatch();

  const { loanList = [], loading = false, error = null } = useSelector(
    (state) => state.homeLoan || {}
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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center text-red-500 bg-red-50 p-6 rounded-xl border border-red-100">
        <p className="font-semibold">Error loading loan history</p>
        <p className="text-sm mt-2">{typeof error === 'string' ? error : error?.message || 'Failed to load'}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Loan History</h2>
            <p className="text-gray-500 mt-1">Track and manage your loan applications</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
            <span className="text-gray-500 text-sm">Total Loans:</span>
            <span className="ml-2 font-semibold text-gray-900">{loanList.length}</span>
          </div>
        </div>

        {loanList.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FaFileInvoiceDollar className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No loans found</h3>
            <p className="text-gray-500 mt-2">You haven't applied for any loans yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-4">Loan ID</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Bank</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Applied On</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loanList.map((loan) => (
                    <tr key={loan.loanId} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        #{loan.loanId}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {loan.loanType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <FaBuilding className="text-gray-400" />
                          {loan.bankName}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        ₹{loan.requestedAmount?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={loan.status} />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(loan.appliedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => setSelectedLoan(loan)}
                          className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-full transition-colors"
                          title="View Details"
                        >
                          <FaEye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Loan Details Modal */}
      {selectedLoan && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto bg-white/30 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl">
              <h3 className="text-xl font-bold text-gray-900">
                Loan Details <span className="text-gray-400 font-normal">#{selectedLoan.loanId}</span>
              </h3>
              <button
                onClick={() => setSelectedLoan(null)}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DetailCard label="Loan Type" value={selectedLoan.loanType} icon={<FaFileInvoiceDollar />} />
                <DetailCard label="Status" value={<StatusBadge status={selectedLoan.status} />} />
                <DetailCard label="Bank Name" value={selectedLoan.bankName} icon={<FaBuilding />} />
                <DetailCard label="Account Number" value={selectedLoan.bankAccount} />
                <DetailCard label="IFSC Code" value={selectedLoan.ifscCode} />
                <DetailCard label="Requested Amount" value={`₹${selectedLoan.requestedAmount?.toLocaleString()}`} />
                <DetailCard
                  label="Approved Amount"
                  value={selectedLoan.approvedAmount ? `₹${selectedLoan.approvedAmount?.toLocaleString()}` : "Pending"}
                  highlight={!!selectedLoan.approvedAmount}
                />
                <DetailCard label="Interest Rate" value={`${selectedLoan.interestRate}%`} icon={<FaPercentage />} />
                <DetailCard label="Tenure" value={`${selectedLoan.tenureMonths} months`} icon={<FaClock />} />
                <DetailCard label="Applied On" value={new Date(selectedLoan.appliedAt).toLocaleString()} icon={<FaCalendarAlt />} />
              </div>

              {selectedLoan.homeLoanDetails && (
                <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                    Home Loan Specifics
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SimpleDetail label="Property Address" value={selectedLoan.homeLoanDetails.propertyAddress} />
                    <SimpleDetail label="Builder Name" value={selectedLoan.homeLoanDetails.builderName} />
                    <SimpleDetail label="Property Value" value={`₹${selectedLoan.homeLoanDetails.propertyValue?.toLocaleString()}`} />
                    <SimpleDetail label="Down Payment" value={`₹${selectedLoan.homeLoanDetails.downPayment?.toLocaleString()}`} />
                  </div>
                </div>
              )}

              {selectedLoan.carLoanDetails && (
                <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                    Car Loan Specifics
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SimpleDetail label="Car Model" value={selectedLoan.carLoanDetails.carModel} />
                    <SimpleDetail label="Manufacturer" value={selectedLoan.carLoanDetails.manufacturer} />
                    <SimpleDetail label="Car Price" value={`₹${selectedLoan.carLoanDetails.carValue?.toLocaleString()}`} />
                    <SimpleDetail label="Down Payment" value={`₹${selectedLoan.carLoanDetails.downPayment?.toLocaleString()}`} />
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 rounded-b-2xl flex justify-end">
              <button
                type="button"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors font-medium"
                onClick={() => setSelectedLoan(null)}
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
    REJECTED: "bg-red-100 text-red-800",
    PENDING: "bg-yellow-100 text-yellow-800",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-800"}`}>
      {status}
    </span>
  );
};

const DetailCard = ({ label, value, icon, highlight }) => (
  <div className={`p-4 rounded-lg border ${highlight ? 'bg-blue-50 border-blue-100' : 'bg-white border-gray-100'}`}>
    <div className="flex items-center gap-2 mb-1">
      {icon && <span className="text-gray-400 text-sm">{icon}</span>}
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
    </div>
    <div className={`text-sm font-semibold ${highlight ? 'text-blue-700' : 'text-gray-900'}`}>
      {value || "—"}
    </div>
  </div>
);

const SimpleDetail = ({ label, value }) => (
  <div>
    <span className="text-xs text-gray-500 block">{label}</span>
    <span className="text-sm font-medium text-gray-900 block mt-0.5">{value || "—"}</span>
  </div>
);

export default LoanHistory;