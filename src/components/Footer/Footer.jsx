import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

import logo from "../../assets/bank_logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-600 pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt="Bank Logo"
                className="w-8 h-8 rounded-full"
              />
              <h3 className="text-gray-900 font-bold text-2xl">BankMate</h3>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Your trusted partner for secure, fast, and smart digital banking.
              Experience the future of finance with BankMate.
            </p>
            <div className="flex gap-4 pt-2">
              <SocialLink href="#" icon={<FaFacebookF />} />
              <SocialLink href="#" icon={<FaTwitter />} />
              <SocialLink href="#" icon={<FaLinkedinIn />} />
              <SocialLink href="#" icon={<FaInstagram />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <FooterLink to="/dashboard">Dashboard</FooterLink>
              <FooterLink to="/accounts">My Accounts</FooterLink>
              <FooterLink to="/transfer">Money Transfer</FooterLink>
              <FooterLink to="/loan">Loans</FooterLink>
              <FooterLink to="/profile">Profile Settings</FooterLink>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-gray-900 font-semibold text-lg mb-6">Support</h4>
            <ul className="space-y-3">
              <FooterLink to="/loan/support">Help Center</FooterLink>
              <FooterLink to="#">FAQs</FooterLink>
              <FooterLink to="#">Privacy Policy</FooterLink>
              <FooterLink to="#">Terms of Service</FooterLink>
              <FooterLink to="#">Contact Us</FooterLink>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-gray-900 font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-500">
                <FaMapMarkerAlt className="mt-1 text-blue-600" />
                <span>123 Banking District,<br />Financial City, FC 40001</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-500">
                <FaPhone className="text-blue-600" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-500">
                <FaEnvelope className="text-blue-600" />
                <span>support@bankmate.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} BankMate. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Security</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon }) => (
  <a
    href={href}
    className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 shadow-sm"
  >
    {icon}
  </a>
);

const FooterLink = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="text-gray-500 hover:text-blue-600 transition-colors text-sm flex items-center gap-2"
    >
      <span className="w-1 h-1 bg-blue-600 rounded-full opacity-0 hover:opacity-100 transition-opacity"></span>
      {children}
    </Link>
  </li>
);

export default Footer;
