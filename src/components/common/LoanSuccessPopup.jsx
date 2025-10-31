import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoanSuccessPopup = ({ isOpen, onClose, loanType }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isOpen) return null;

  const handleProceed = () => {
    if (!isAuthenticated) {
      onClose();
      navigate("/login");
      return;
    }

    onClose();
    navigate("/loan/status");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
          Confirm Your Loan Application
        </h2>

        <div className="space-y-4 text-gray-700">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              value={user?.firstName ? `${user.firstName} ${user.lastName || ""}` : ""}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 bg-gray-50"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 bg-gray-50"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Service Type</label>
            <input
              type="text"
              value={loanType}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 bg-gray-50"
            />
          </div>
        </div>

        <div className="mt-6 text-center text-gray-600 text-sm">
          We’ve received your request for <span className="font-medium">{loanType}</span>.
          You’ll be notified via your registered email for any updates.
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2 border border-gray-400 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleProceed}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanSuccessPopup;
