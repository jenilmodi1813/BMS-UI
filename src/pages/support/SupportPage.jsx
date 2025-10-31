// src/pages/Support/SupportPage.jsx
import React, { useState } from "react";
import axios from "axios";

const SupportPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(""); // 'success', 'error', or ''

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      // Adjust this URL to your actual backend endpoint
      await axios.post("http://localhost:8080/api/v1/support/contact", formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Support form error:", err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-blue-700">Customer Support</h1>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            We're here to help! Reach out with any questions, feedback, or issues.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 px-4 rounded-lg font-medium text-white transition ${
                  isSubmitting
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {submitStatus === "success" && (
                <p className="mt-3 text-green-600 font-medium">Message sent! We’ll get back to you soon.</p>
              )}
              {submitStatus === "error" && (
                <p className="mt-3 text-red-600 font-medium">Failed to send. Please try again.</p>
              )}
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              <div className="space-y-3 text-gray-600">
                <div>
                  <p className="font-medium">Email</p>
                  <p>support@bankmate.com</p>
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p>+91 1800 123 4567 (Toll-Free)</p>
                  <p className="text-sm text-gray-500">Mon–Sat, 9 AM – 7 PM IST</p>
                </div>
                <div>
                  <p className="font-medium">Head Office</p>
                  <p className="text-sm">
                    BankMate Financial Services<br />
                    Plot No. 45, Cyber City<br />
                    Gurugram, Haryana 122002<br />
                    India
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="font-medium text-gray-800 mb-3">Our Location</h3>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border">
                <iframe
                  title="BankMate Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.380338303294!2d77.0887453750885!3d28.45949657570359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18f8b5b7f8a7%3A0x4e5f8e5e5e5e5e5e!2sCyber%20City%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;