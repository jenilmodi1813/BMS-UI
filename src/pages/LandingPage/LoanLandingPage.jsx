import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const LoanLandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4 bg-blue-100">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-500 mb-4">
          Welcome to BankMate Loan Center
        </h1>
        <p className="text-lg md:text-xl text-blue-600 mb-6 max-w-2xl">
          Explore our loan options and find the perfect solution for your financial needs. Fast, secure, and tailored for you.
        </p>
        <Link
          to="/loan/apply"
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-full font-semibold transition text-lg"
        >
          Apply Now
        </Link>
      </section>

      {/* Loan Options Section */}
      <section className="py-16 px-4 md:px-20">
        <h2 className="text-3xl font-bold text-center text-blue-500 mb-10">
          Our Loan Options
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Home Loan</h3>
            <p className="text-gray-600 mb-4">Low interest rates for your dream home.</p>
            <Link
              to="/loan/apply/home"
              className="text-blue-700 font-medium hover:underline"
            >
              Apply Now
            </Link>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Personal Loan</h3>
            <p className="text-gray-600 mb-4">Quick loans for personal needs and emergencies.</p>
            <Link
              to="/loan/apply"
              className="text-blue-700 font-medium hover:underline"
            >
              Apply Now
            </Link>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Car Loan</h3>
            <p className="text-gray-600 mb-4">Affordable car financing options.</p>
            <Link
              to="/loan/apply/car"
              className="text-blue-700 font-medium hover:underline"
            >
              Apply Now
            </Link>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Education Loan</h3>
            <p className="text-gray-600 mb-4">Support your education dreams without stress.</p>
            <Link
              to="/loan/apply/education"
              className="text-blue-700 font-medium hover:underline"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* Info / Why Choose Us */}
      <section className="py-16 px-4 md:px-20 bg-blue-50">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-10">
          Why Choose BankMate Loans?
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
            <h3 className="font-semibold text-blue-700 mb-2">Fast Approval</h3>
            <p className="text-gray-600">Get your loan approved quickly with minimal paperwork.</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
            <h3 className="font-semibold text-blue-700 mb-2">Low Interest</h3>
            <p className="text-gray-600">Competitive interest rates tailored for you.</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
            <h3 className="font-semibold text-blue-700 mb-2">Flexible Terms</h3>
            <p className="text-gray-600">Choose repayment plans that suit your needs.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LoanLandingPage;
