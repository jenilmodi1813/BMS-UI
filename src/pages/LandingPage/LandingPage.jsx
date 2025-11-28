import React from "react";
import poster from "../../assets/landing_hero.png";
import {
  FaLock,
  FaMobileAlt,
  FaMoneyBillWave,
  FaUserFriends,
  FaArrowRight,
  FaShieldAlt,
  FaChartLine
} from "react-icons/fa";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-6">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
                The Future of Banking is Here
              </div>
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                <span className="block xl:inline">Banking made</span>{" "}
                <span className="block text-blue-600 xl:inline">simple & secure</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Experience the next generation of digital banking. Manage your savings,
                investments, and daily transactions with our award-winning platform.
                Join millions of satisfied users today.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/signUp"
                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Get Started
                    <FaArrowRight className="ml-2" />
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    Log In
                  </Link>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  No credit card required · Free 30-day trial · Cancel anytime
                </p>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-2xl shadow-2xl lg:max-w-md overflow-hidden transform hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent z-10"></div>
                <img
                  className="w-full h-full object-cover"
                  src={poster}
                  alt="Banking App Interface"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-200/30 blur-3xl"></div>
          <div className="absolute top-1/2 -left-24 w-72 h-72 rounded-full bg-purple-200/30 blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to manage your wealth
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Our platform provides a comprehensive suite of tools designed to help you achieve your financial goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FaShieldAlt className="text-white text-2xl" />}
              title="Bank-Grade Security"
              description="Your data is protected by 256-bit encryption and multi-factor authentication."
              color="bg-blue-500"
            />
            <FeatureCard
              icon={<FaMoneyBillWave className="text-white text-2xl" />}
              title="Instant Transfers"
              description="Send money to anyone, anywhere in the world instantly with zero hidden fees."
              color="bg-green-500"
            />
            <FeatureCard
              icon={<FaChartLine className="text-white text-2xl" />}
              title="Smart Analytics"
              description="Track your spending habits and get personalized insights to save more."
              color="bg-purple-500"
            />
            <FeatureCard
              icon={<FaMobileAlt className="text-white text-2xl" />}
              title="Mobile First"
              description="Access your account on the go with our top-rated mobile application."
              color="bg-indigo-500"
            />
            <FeatureCard
              icon={<FaUserFriends className="text-white text-2xl" />}
              title="24/7 Support"
              description="Our dedicated support team is available around the clock to assist you."
              color="bg-orange-500"
            />
            <FeatureCard
              icon={<FaLock className="text-white text-2xl" />}
              title="Secure Vault"
              description="Store your important documents and assets in our digital secure vault."
              color="bg-red-500"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to start your financial journey?
          </h2>
          <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
            Join over 2 million users who trust BankMate for their daily banking needs.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/signUp"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-blue-600 bg-white hover:bg-blue-50 md:py-4 md:text-lg shadow-lg transition-all duration-300"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, color }) => (
  <div className="bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 group">
    <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-500 leading-relaxed">
      {description}
    </p>
  </div>
);

export default LandingPage;
