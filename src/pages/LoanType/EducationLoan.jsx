import React from "react";
import LoanCard from "../../components/LoadFormCard/LoanCard.";


const EducationLoan = () => {
  const fields = [
    { name: "courseName", label: "Course Name", placeholder: "Enter course name" },
    { name: "university", label: "University", placeholder: "Enter university name" },
    { name: "courseDurationMonths", label: "Course Duration (Months)", placeholder: "Enter duration in months", type: "number" },
    { name: "tuitionFees", label: "Tuition Fees", placeholder: "Enter tuition fees", type: "number" },
    { name: "coApplicantName", label: "Co-Applicant Name", placeholder: "Enter co-applicant name" },
  ];

  const handleSubmit = (data) => {
    console.log("Education Loan Submitted:", data);
    // TODO: Call API to save education loan details
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-6">
      <LoanCard title="Education Loan Application" fields={fields} onSubmit={handleSubmit} />
    </div>
  );
};

export default EducationLoan;
