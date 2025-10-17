import React, { useState } from "react";

const LoanCard = ({ title, fields, onSubmit }) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  const [errors, setErrors] = useState({});

  const handleChange = (e, field) => {
    const { name, value } = e.target;

    // Numeric validation for number fields
    if (field.type === "number" && value && isNaN(value)) return;

    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let newErrors = {};
    fields.forEach((field) => {
      if (!formData[field.name]?.toString().trim()) {
        newErrors[field.name] = `${field.label} is required.`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}));
    }
  };

  return (
    <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 border-t-4 border-blue-600">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-6">
        {title}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
            </label>
            <input
              type={field.type || "text"}
              name={field.name}
              value={formData[field.name]}
              onChange={(e) => handleChange(e, field)}
              placeholder={field.placeholder}
              className={`w-full border ${
                errors[field.name] ? "border-red-500" : "border-gray-300"
              } rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
            />
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-md"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default LoanCard;
