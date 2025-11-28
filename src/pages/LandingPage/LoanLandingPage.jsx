import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaCar, FaGraduationCap, FaMoneyBillWave, FaArrowLeft } from "react-icons/fa";

const LoanLandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm py-4 px-6 flex items-center">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center text-gray-600 hover:text-blue-600 transition font-medium"
        >
          <FaArrowLeft className="mr-2" /> Back to Dashboard
        </button>
      </nav>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Achieve Your Dreams with BankMate Loans
          </h1>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Whether it's a new home, a car, or your education, we have the perfect loan solution for you with competitive interest rates and flexible repayment options.
          </p>
        </div>
      </section>

      {/* Loan Options Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Choose Your Loan Type
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Home Loan */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-100 flex flex-col items-center text-center">
            <div className="bg-blue-100 p-4 rounded-full text-blue-600 mb-6">
              <FaHome size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Home Loan</h3>
            <p className="text-gray-600 mb-6 text-sm">
              Turn your dream home into reality with our low-interest home loans.
            </p>
            <Link
              to="/loan/apply/home"
              className="mt-auto bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition w-full"
            >
              Apply Now
            </Link>
          </div>

          {/* Car Loan */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-100 flex flex-col items-center text-center">
            <div className="bg-green-100 p-4 rounded-full text-green-600 mb-6">
              <FaCar size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Car Loan</h3>
            <p className="text-gray-600 mb-6 text-sm">
              Drive your dream car today with our hassle-free car financing.
            </p>
            <Link
              to="/loan/apply/car"
              className="mt-auto bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition w-full"
            >
              Apply Now
            </Link>
          </div>

          {/* Education Loan */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-100 flex flex-col items-center text-center">
            <div className="bg-purple-100 p-4 rounded-full text-purple-600 mb-6">
              <FaGraduationCap size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Education Loan</h3>
            <p className="text-gray-600 mb-6 text-sm">
              Invest in your future with our student-friendly education loans.
            </p>
            <Link
              to="/loan/apply/education"
              className="mt-auto bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition w-full"
            >
              Apply Now
            </Link>
          </div>

          {/* Personal Loan */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-100 flex flex-col items-center text-center">
            <div className="bg-orange-100 p-4 rounded-full text-orange-600 mb-6">
              <FaMoneyBillWave size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Personal Loan</h3>
            <p className="text-gray-600 mb-6 text-sm">
              Quick funds for any personal need or emergency expenses.
            </p>
            <Link
              to="/loan/apply"
              className="mt-auto bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition w-full"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose BankMate?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <h3 className="text-xl font-bold text-blue-600 mb-3">Fast Approval</h3>
              <p className="text-gray-600">
                Get your loan approved in record time with our streamlined digital process.
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-blue-600 mb-3">Low Interest Rates</h3>
              <p className="text-gray-600">
                We offer some of the most competitive interest rates in the market.
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-blue-600 mb-3">Flexible Repayment</h3>
              <p className="text-gray-600">
                Choose a repayment tenure that fits your budget and financial goals.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoanLandingPage;
