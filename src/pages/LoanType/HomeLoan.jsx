import React from "react";
import LoanCard from "../../components/LoadFormCard/LoanCard.";


const HomeLoan = () => {
  const fields = [
    { name: "propertyAddress", label: "Property Address", placeholder: "Enter property address" },
    { name: "propertyValue", label: "Property Value", placeholder: "Enter property value", type: "number" },
    { name: "builderName", label: "Builder Name", placeholder: "Enter builder name" },
    { name: "downPayment", label: "Down Payment", placeholder: "Enter down payment", type: "number" },
  ];

  const handleSubmit = (data) => {
    console.log("Home Loan Submitted:", data);
    // TODO: call API to save home loan
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-6">
      <LoanCard title="Home Loan Application" fields={fields} onSubmit={handleSubmit} />
    </div>
  );
};

export default HomeLoan;
