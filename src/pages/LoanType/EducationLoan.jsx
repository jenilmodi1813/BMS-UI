import React from "react";
import LoanCard from "../../components/LoadFormCard/LoanCard.";


const EducationLoan = () => {
  const fields = [
    { name: "courseName", label: "Course Name", placeholder: "e.g. Bachelor of Technology" },
    { name: "university", label: "University", placeholder: "e.g. Harvard University" },
    { name: "courseDurationMonths", label: "Course Duration (Months)", placeholder: "e.g. 48", type: "number" },
    { name: "tuitionFees", label: "Tuition Fees", placeholder: "e.g. 2000000", type: "number" },
    { name: "coApplicantName", label: "Co-Applicant Name", placeholder: "Enter full name of co-applicant" },
  ];

  const handleSubmit = () => {

    // TODO: Call API to save education loan details
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-6">
      <LoanCard title="Education Loan Application" fields={fields} onSubmit={handleSubmit} />
    </div>
  );
};

export default EducationLoan;
