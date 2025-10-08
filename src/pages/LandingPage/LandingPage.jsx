import React from "react";
import { FaLock, FaMobileAlt, FaMoneyBillWave, FaUserFriends } from "react-icons/fa";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-blue-700">SmartBank</h1>
        <div className="space-x-6">
          <a href="#features" className="hover:text-blue-700 font-medium">
            Features
          </a>
          <a href="#about" className="hover:text-blue-700 font-medium">
            About
          </a>
          <a href="#contact" className="hover:text-blue-700 font-medium">
            Contact
          </a>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-20 py-16 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-700 leading-tight">
            Your Digital Banking Partner
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Manage your accounts, transfer money, and track transactions — all in one secure platform.
          </p>
          <div className="mt-6 space-x-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
              Get Started
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white">
              Learn More
            </button>
          </div>
        </div>

        <div className="md:w-1/2 mb-10 md:mb-0">
          <img
            src="https://cdn.dribbble.com/userupload/10135609/file/original-b6ffb25c2f9896c5a0a29d76db6f1d37.png"
            alt="banking dashboard"
            className="w-full rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-8 md:px-20 bg-white">
        <h3 className="text-3xl font-bold text-center text-blue-700 mb-12">
          Why Choose SmartBank?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <FeatureCard
            icon={<FaLock className="text-3xl text-blue-600" />}
            title="Secure Transactions"
            desc="Your data and money are protected with advanced encryption."
          />
          <FeatureCard
            icon={<FaMobileAlt className="text-3xl text-blue-600" />}
            title="Mobile Banking"
            desc="Access your bank from anywhere, anytime on any device."
          />
          <FeatureCard
            icon={<FaMoneyBillWave className="text-3xl text-blue-600" />}
            title="Instant Transfers"
            desc="Send and receive money instantly with zero hassle."
          />
          <FeatureCard
            icon={<FaUserFriends className="text-3xl text-blue-600" />}
            title="24/7 Support"
            desc="We’re here round the clock to assist you whenever needed."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-700 text-white text-center py-6 mt-auto">
        <p>© {new Date().getFullYear()} SmartBank. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Reusable Feature Card component
const FeatureCard = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center bg-blue-50 p-6 rounded-xl shadow hover:shadow-md transition">
    {icon}
    <h4 className="mt-4 text-xl font-semibold">{title}</h4>
    <p className="mt-2 text-gray-600 text-center">{desc}</p>
  </div>
);

export default LandingPage;
