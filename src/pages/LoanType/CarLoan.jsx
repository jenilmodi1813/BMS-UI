import React from "react";
import LoanCard from "../../components/LoadFormCard/LoanCard.";


const CarLoan = () => {
  const fields = [
    { name: "carModel", label: "Car Model", placeholder: "Enter car model" },
    { name: "manufacturer", label: "Manufacturer", placeholder: "Enter manufacturer" },
    { name: "manufactureYear", label: "Manufacture Year", placeholder: "Enter year", type: "number" },
    { name: "carValue", label: "Car Value", placeholder: "Enter car value", type: "number" },
    { name: "registrationNumber", label: "Registration Number", placeholder: "Enter registration number" },
  ];

  const handleSubmit = (data) => {
    console.log("Car Loan Submitted:", data);
    // TODO: Call API to save car loan details
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-6">
      <LoanCard title="Car Loan Application" fields={fields} onSubmit={handleSubmit} />
    </div>
  );
};

export default CarLoan;
