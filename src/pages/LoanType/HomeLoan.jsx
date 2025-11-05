import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyLoanRequest } from "../../redux/loan/homeLoan/home.loan.slice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



const HomeLoan = () => {
  const dispatch = useDispatch();
  const { loading, loanResponse, error } = useSelector((state) => state.loan || {});
  const [profile, setProfile] = useState(null);
    const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("auth"));
      if (data && data.customer) setProfile(data.customer);
    } catch (e) {
      console.error("Error parsing auth from localStorage", e);
    }
  }, []);

  const [formData, setFormData] = useState({
    customerDetails: {
      firstName: profile ? profile.firstName : "",
      lastName: profile ? profile.lastName : "",
      email: profile ? profile.email : "",
      phoneNo: profile ? profile.phoneNo : "",
      password: "",
      address: profile ? profile.address : "",
      dob: profile ? profile.dob : "",
      gender: profile ? profile.gender : "",
    },

    cifNumber: "",
    loanType: "HOME",
    requestedAmount: "",
    requestedTenureMonths: "",
    employmentType: "",
    monthlyIncome: "",
    bankName: "",
    bankAccount: "",
    ifscCode: "",

    homeDetails: {
      propertyAddress: "",
      propertyValue: "",
      builderName: "",
      downPayment: "",
      propertyType: "",
      ownershipType: "",
      registrationNumber: "",
    },
  });

   useEffect(() => {
    if (profile) {
      setFormData((prev) => ({
        ...prev,
        customerDetails: {
          ...prev.customerDetails,
          firstName: "",
          lastName: "",
          email: "",
          phoneNo: "",
          password: "",
          address: "",
          dob: "",
          gender: "",
        },
        cifNumber: "",
        carDetails: { ...prev.carDetails },
      }));
    }
  }, [profile]);


  console.log("Customer Data :", profile);
  

  console.log("HomeLoan Form Data:", formData);

  useEffect(() => {
    if (profile) {
      setFormData((prev) => ({
        ...prev,
        customerDetails: {
          firstName: profile.firstName || "",
          lastName: profile.lastName || "",
          email: profile.email || "",
          phoneNo: profile.phoneNo || "",
          password: "", 
          address: profile.address || "",
          dob: profile.dob || "",
          gender: profile.gender || "",
        },
        cifNumber: profile.cifNumber || "",
      }));
    }
  }, [profile]);

  const isLoggedIn = !!profile;

  const handleChange = (e, parentKey = null) => {
    const { name, value } = e.target;

    if (parentKey) {
      setFormData((prev) => ({
        ...prev,
        [parentKey]: {
          ...prev[parentKey],
          [name]: value,
        },
      }));
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
      return;
    }

    if (Object.prototype.hasOwnProperty.call(formData.customerDetails, name)) {
      setFormData((prev) => ({
        ...prev,
        customerDetails: {
          ...prev.customerDetails,
          [name]: value,
        },
      }));
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const errors = {};
    const cd = formData.customerDetails;
    const hd = formData.homeDetails;

    if (!isLoggedIn) {
      if (!cd.firstName.trim()) errors.firstName = "First name is required";
      if (!cd.lastName.trim()) errors.lastName = "Last name is required";
      if (!cd.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cd.email))
        errors.email = "Valid email is required";
      if (!cd.phoneNo.trim() || !/^\d{10}$/.test(cd.phoneNo))
        errors.phoneNo = "Phone number must be 10 digits";
      if (!cd.password || cd.password.length < 8)
        errors.password = "Password is required (min 8 chars)";
      if (!cd.address.trim()) errors.address = "Address is required";
      if (!cd.dob) errors.dob = "Date of birth is required";
      if (!cd.gender) errors.gender = "Gender is required";
    }

    if (!formData.requestedAmount || Number(formData.requestedAmount) <= 0)
      errors.requestedAmount = "Requested amount must be greater than 0";
    if (!formData.requestedTenureMonths || Number(formData.requestedTenureMonths) <= 0)
      errors.requestedTenureMonths = "Tenure (months) must be greater than 0";
    if (!formData.employmentType || !formData.employmentType.trim())
      errors.employmentType = "Employment type is required";
    if (!formData.monthlyIncome || Number(formData.monthlyIncome) <= 0)
      errors.monthlyIncome = "Monthly income must be greater than 0";
    if (!formData.requestedAmount || Number(formData.requestedAmount) > 0.2 * Number(formData.propertyValue))
      errors.requestedAmount = "Requested amount must be less than or equal to 20% of property value";

    if (!formData.bankName || !formData.bankName.trim()) errors.bankName = "Bank name is required";
    if (!formData.bankAccount || !/^\d{9,18}$/.test(formData.bankAccount))
      errors.bankAccount = "Bank account must be 9–18 digits";
    if (!formData.ifscCode || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode))
      errors.ifscCode = "IFSC must be in correct format";

    if (!hd.propertyAddress || !hd.propertyAddress.trim())
      errors.propertyAddress = "Property address is required";
    if (!hd.propertyValue || Number(hd.propertyValue) <= 0)
      errors.propertyValue = "Property value must be greater than 0";
    if (!hd.downPayment && hd.downPayment !== 0) errors.downPayment = "Down payment is required";
    if (hd.downPayment < 0) errors.downPayment = "Down payment cannot be negative";
    if (Number(hd.downPayment) > Number(hd.propertyValue))
      errors.downPayment = "Down payment cannot exceed property value";
    if (!hd.propertyType || !hd.propertyType.trim()) errors.propertyType = "Property type is required";
    if (!hd.ownershipType || !hd.ownershipType.trim()) errors.ownershipType = "Ownership type is required";
    if (!hd.registrationNumber || !hd.registrationNumber.trim())
      errors.registrationNumber = "Registration number is required";

    setFormErrors(errors);
    const ok = Object.keys(errors).length === 0;
    if (!ok) {
      toast.error("Please fix the highlighted errors before submitting");
    }
    return ok;
  };

  const buildPayload = () => {
    const requestedAmount = formData.requestedAmount ? Number(formData.requestedAmount) : null;
    const requestedTenureMonths = formData.requestedTenureMonths
      ? parseInt(formData.requestedTenureMonths, 10)
      : null;
    const monthlyIncome = formData.monthlyIncome ? Number(formData.monthlyIncome) : null;

    const propertyValue = formData.homeDetails.propertyValue
      ? Number(formData.homeDetails.propertyValue)
      : null;
    const downPayment = formData.homeDetails.downPayment
      ? Number(formData.homeDetails.downPayment)
      : 0;

    const base = {
      loanType: formData.loanType || "HOME",
      requestedAmount,
      requestedTenureMonths,
      employmentType: formData.employmentType,
      monthlyIncome,
      bankName: formData.bankName,
      bankAccount: formData.bankAccount,
      ifscCode: formData.ifscCode,
      homeDetails: {
        propertyAddress: formData.homeDetails.propertyAddress,
        propertyValue,
        builderName: formData.homeDetails.builderName,
        downPayment,
        propertyType: formData.homeDetails.propertyType,
        ownershipType: formData.homeDetails.ownershipType,
        registrationNumber: formData.homeDetails.registrationNumber,
      },
    };

    if (isLoggedIn) {
      return {
        ...base,
        cifNumber: profile?.cifNumber || profile?.cif || profile?.cifNo || "",
      };
    } else {
      return {
        ...base,
        customerDetails: {
          firstName: formData.customerDetails.firstName,
          lastName: formData.customerDetails.lastName,
          email: formData.customerDetails.email,
          phoneNo: formData.customerDetails.phoneNo,
          password: formData.customerDetails.password,
          address: formData.customerDetails.address,
          dob: formData.customerDetails.dob,
          gender: formData.customerDetails.gender,
        },
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = buildPayload();
    dispatch(applyLoanRequest(payload));

    if (!isLoggedIn && loanResponse.cifNumber) {
      toast.success(
        `Loan applied successfully! Your CIF: ${loanResponse.cifNumber}`
      );
      navigate("/login");
    } else if (isLoggedIn) {
      toast.success("Car loan applied successfully.");
      navigate("/loan/status");
    }
  };

  useEffect(() => {
    if (loanResponse) {
      if (!isLoggedIn && loanResponse.cifNumber) {
        toast.success(`Loan applied. Your CIF: ${loanResponse.cifNumber}. Check email for details.`);
      } else if (isLoggedIn) {
        toast.success("Loan applied successfully.");
      }
    }
  }, [loanResponse, isLoggedIn]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-8">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-4xl p-10">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-10">Home Loan Application</h1>

        <form onSubmit={handleSubmit} className="space-y-10">
          {!isLoggedIn && (
            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Customer Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { name: "firstName", label: "First Name", type: "text" },
                  { name: "lastName", label: "Last Name", type: "text" },
                  { name: "email", label: "Email", type: "email" },
                  { name: "phoneNo", label: "Phone Number", type: "tel" },
                  { name: "password", label: "Password", type: "password" },
                  { name: "address", label: "Address", type: "text" },
                ].map(({ name, label, type }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
                    <input
                      name={name}
                      type={type}
                      value={formData.customerDetails[name]}
                      onChange={handleChange}
                      placeholder={label}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                    {formErrors[name] && <p className="text-red-500 text-sm mt-1">{formErrors[name]}</p>}
                    {/* Hints */}
                    {name === "phoneNo" && !formErrors[name] && (
                      <p className="text-gray-400 text-xs mt-1">10-digit mobile number</p>
                    )}
                    {name === "password" && !formErrors[name] && (
                      <p className="text-gray-400 text-xs mt-1">At least 8 characters</p>
                    )}
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Date of Birth</label>
                  <input
                    name="dob"
                    type="date"
                    value={formData.customerDetails.dob}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                  {formErrors.dob && <p className="text-red-500 text-sm mt-1">{formErrors.dob}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
                  <select
                    name="gender"
                    value={formData.customerDetails.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  >
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                  {formErrors.gender && <p className="text-red-500 text-sm mt-1">{formErrors.gender}</p>}
                </div>
              </div>
            </section>
          )}

          {isLoggedIn && (
            <section>
              <h2 className="text-lg font-medium text-gray-700 mb-2">Logged in as</h2>
              <div className="p-3 border rounded-md bg-gray-50">
                <p className="text-sm">
                  <strong>{profile.firstName} {profile.lastName}</strong> — CIF: <strong>{profile.cifNumber || profile.cif}</strong>
                </p>
                <p className="text-sm text-gray-600">{profile.email}</p>
              </div>
            </section>
          )}

          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Loan Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { name: "requestedAmount", label: "Requested Amount", type: "number", min: 0 },
                { name: "requestedTenureMonths", label: "Tenure (Months)", type: "number", min: 0 },
                { name: "employmentType", label: "Employment Type", type: "select" },
                { name: "monthlyIncome", label: "Monthly Income", type: "number", min: 0 },
              ].map(({ name, label, type, min }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>

                  {type === "select" ? (
                    <select
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    >
                      <option value="">Select Employment Type</option>
                      <option value="SALARIED">Salaried</option>
                      <option value="SELF_EMPLOYED">Self Employed</option>
                      {/* <option value="BUSINESS">Business</option> */}
                    </select>
                  ) : (
                    <input
                      name={name}
                      type="number"
                      min={min}
                      value={formData[name]}
                      onChange={handleChange}
                      placeholder={label}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                  )}

                  {formErrors[name] && <p className="text-red-500 text-sm mt-1">{formErrors[name]}</p>}
                  {/* Hints */}
                  {name === "requestedAmount" && !formErrors[name] && (
                    <p className="text-gray-400 text-xs mt-1">e.g., 500000</p>
                  )}
                  {name === "requestedTenureMonths" && !formErrors[name] && (
                    <p className="text-gray-400 text-xs mt-1">e.g., 240 months (20 years)</p>
                  )}
                  {name === "monthlyIncome" && !formErrors[name] && (
                    <p className="text-gray-400 text-xs mt-1">e.g., 75000</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Bank Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { name: "bankName", label: "Bank Name" },
                { name: "bankAccount", label: "Account Number" },
                { name: "ifscCode", label: "IFSC Code" },
              ].map(({ name, label }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
                  <input
                    name={name}
                    placeholder={label}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                  {formErrors[name] && <p className="text-red-500 text-sm mt-1">{formErrors[name]}</p>}
                  {/* Hints */}
                  {name === "bankAccount" && !formErrors[name] && (
                    <p className="text-gray-400 text-xs mt-1">9 to 18 digits</p>
                  )}
                  {name === "ifscCode" && !formErrors[name] && (
                    <p className="text-gray-400 text-xs mt-1">e.g., SBIN0002499</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Property Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { name: "propertyAddress", label: "Property Address" },
                { name: "propertyValue", label: "Property Value", type: "number" },
                { name: "builderName", label: "Builder Name" },
                { name: "downPayment", label: "Down Payment", type: "number" },
                { name: "propertyType", label: "Property Type" },
                { name: "ownershipType", label: "Ownership Type" },
                { name: "registrationNumber", label: "Registration Number" },
              ].map(({ name, label, type }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
                  <input
                    name={name}
                    type={type === "number" ? "number" : "text"}
                    placeholder={label}
                    value={formData.homeDetails[name]}
                    onChange={(e) => handleChange(e, "homeDetails")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                  {formErrors[name] && <p className="text-red-500 text-sm mt-1">{formErrors[name]}</p>}
                  {name === "propertyValue" && !formErrors[name] && (
                    <p className="text-gray-400 text-xs mt-1">e.g., 6000000</p>
                  )}
                  {name === "downPayment" && !formErrors[name] && (
                    <p className="text-gray-400 text-xs mt-1">e.g., 1000000</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-full md:w-1/2 py-3 font-semibold rounded-lg text-white transition ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>

            {loanResponse && (
              <p className="text-green-600 font-semibold mt-4">{loanResponse.message || "Application submitted successfully!"}</p>
            )}
            {error && <p className="text-red-500 font-semibold mt-4">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomeLoan;