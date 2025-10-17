import React, { useState } from "react";
import axios from "axios";

const LoanApplication = () => {
  const [form, setForm] = useState({
    fullName: "",
    customerId: "",
    loanType: "",
    amount: "",
    duration: "",
    income: "",
    purpose: "",
  });

  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const API =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8081/api/v1";

  const onChange = (e) => {
    const { id, value } = e.target;
    if (id === "customerId") {
      if (/^\d{0,10}$/.test(value)) setForm((p) => ({ ...p, [id]: value }));
    } else {
      setForm((p) => ({ ...p, [id]: value }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    if (!/^[0-9]{10}$/.test(form.customerId)) {
      setMsg({ type: "error", text: "Customer ID must be exactly 10 digits." });
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API}/loan/apply`, form);
      setMsg({
        type: "success",
        text: "Loan application submitted successfully!",
      });
      setForm({
        fullName: "",
        customerId: "",
        loanType: "",
        amount: "",
        duration: "",
        income: "",
        purpose: "",
      });
    } catch (err) {
      const error = err?.response?.data?.message || "Failed to apply for loan.";
      setMsg({ type: "error", text: error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg border border-gray-100">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
          Apply for Loan
        </h2>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <input
            id="fullName"
            type="text"
            value={form.fullName}
            onChange={onChange}
            placeholder="Full Name"
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            id="customerId"
            type="text"
            value={form.customerId}
            onChange={onChange}
            placeholder="Customer ID (10 digits)"
            maxLength={10}
            inputMode="numeric"
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            required
          />
          <select
            id="loanType"
            value={form.loanType}
            onChange={onChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            required
          >
            <option value="">Select Loan Type</option>
            <option value="Home">Home Loan</option>
            <option value="Personal">Personal Loan</option>
            <option value="Car">Car Loan</option>
            <option value="Education">Education Loan</option>
          </select>

          <input
            id="amount"
            type="number"
            value={form.amount}
            onChange={onChange}
            placeholder="Loan Amount (₹)"
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            id="duration"
            type="number"
            value={form.duration}
            onChange={onChange}
            placeholder="Duration (in months)"
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            id="income"
            type="number"
            value={form.income}
            onChange={onChange}
            placeholder="Monthly Income (₹)"
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            required
          />
          <textarea
            id="purpose"
            value={form.purpose}
            onChange={onChange}
            placeholder="Purpose of Loan"
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            rows={3}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full font-semibold transition disabled:opacity-70"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>

        {msg.text && (
          <p
            className={`mt-3 text-sm text-center ${
              msg.type === "error" ? "text-red-600" : "text-green-600"
            }`}
          >
            {msg.text}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoanApplication;
