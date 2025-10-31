import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitCarLoanRequest } from "../../redux/loan/carLoan/car.loan.slice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LoanSuccessPopup from "../../components/common/LoanSuccessPopup";

const CarLoan = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.carLoan.loading);
  const loanResponse = useSelector((state) => state.carLoan.loanResponse);
  const error = useSelector((state) => state.carLoan.error);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [profile, setProfile] = useState(null);
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
    loanType: "CAR",
    requestedAmount: "",
    requestedTenureMonths: "",
    employmentType: "",
    monthlyIncome: "",
    bankName: "",
    bankAccount: "",
    ifscCode: "",
    carDetails: {
      carModel: "",
      manufacturer: "",
      manufactureYear: "",
      onRoadPrice: "",
      downPayment: "",
      registrationNumber: "",
      // fuelType: "",
      // transmissionType: "",
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



  const isLoggedIn = !!profile;

  const handleChange = (e, parentKey = null) => {
    const { name, value } = e.target;
    if (parentKey) {
      setFormData((prev) => ({
        ...prev,
        [parentKey]: { ...prev[parentKey], [name]: value },
      }));
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
      return;
    }

    if (Object.prototype.hasOwnProperty.call(formData.customerDetails, name)) {
      setFormData((prev) => ({
        ...prev,
        customerDetails: { ...prev.customerDetails, [name]: value },
      }));
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const errors = {};
    const cd = formData.customerDetails;
    const car = formData.carDetails;

    if (!isLoggedIn) {
      if (!cd.firstName.trim()) errors.firstName = "First name is required";
      if (!cd.lastName.trim()) errors.lastName = "Last name is required";
      if (!cd.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cd.email))
        errors.email = "Valid email is required";
      if (!cd.phoneNo.trim() || !/^\d{10}$/.test(cd.phoneNo))
        errors.phoneNo = "Phone number must be 10 digits";
      if (!cd.password || cd.password.length < 8)
        errors.password = "Password must be at least 8 characters";
      if (!cd.address.trim()) errors.address = "Address is required";
      if (!cd.dob) errors.dob = "Date of birth is required";
      if (!cd.gender) errors.gender = "Gender is required";
    }

    if (!formData.requestedAmount || Number(formData.requestedAmount) <= 0)
      errors.requestedAmount = "Requested amount must be greater than 0";
    if (
      !formData.requestedTenureMonths ||
      Number(formData.requestedTenureMonths) <= 0
    )
      errors.requestedTenureMonths = "Tenure must be greater than 0";
    if (!formData.employmentType)
      errors.employmentType = "Employment type is required";
    if (!formData.monthlyIncome || Number(formData.monthlyIncome) <= 0)
      errors.monthlyIncome = "Monthly income must be greater than 0";

    if (!formData.bankName) errors.bankName = "Bank name is required";
    if (!formData.bankAccount || !/^\d{9,18}$/.test(formData.bankAccount))
      errors.bankAccount = "Account number must be 9–18 digits";
    if (!formData.ifscCode || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode))
      errors.ifscCode = "Invalid IFSC format";

    // Car validations
    if (!car.manufacturer.trim())
      errors.manufacturer = "Car manufacturer is required";
    if (!car.carModel.trim()) errors.carModel = "Car model is required";
    if (!car.manufactureYear || Number(car.manufactureYear) < 1990)
      errors.manufactureYear = "Enter valid manufacturing year";
    if (!car.exShowroomPrice || Number(car.exShowroomPrice) <= 0)
      errors.exShowroomPrice = "Ex-showroom price required";
    // if (!car.onRoadPrice || Number(car.onRoadPrice) <= 0)
    //   errors.onRoadPrice = "On-road price required";
    if (Number(car.downPayment) < 0)
      errors.downPayment = "Down payment cannot be negative";
    // if (Number(car.downPayment) > Number(car.onRoadPrice))
    //   errors.downPayment = "Down payment cannot exceed on-road price";
    if (!car.registrationNumber.trim())
      errors.registrationNumber = "Registration number required";
    // if (!car.fuelType.trim()) errors.fuelType = "Fuel type is required";
    // if (!car.transmissionType.trim())
    //   errors.transmissionType = "Transmission type is required";

    setFormErrors(errors);
    if (Object.keys(errors).length) {
      toast.error("Please fix highlighted errors before submitting");
      return false;
    }
    return true;
  };

  const buildPayload = () => {
    const base = {
      loanType: "CAR",
      requestedAmount: Number(formData.requestedAmount),
      requestedTenureMonths: parseInt(formData.requestedTenureMonths, 10),
      employmentType: formData.employmentType,
      monthlyIncome: Number(formData.monthlyIncome),
      bankName: formData.bankName,
      bankAccount: formData.bankAccount,
      ifscCode: formData.ifscCode,
      carDetails: {
        manufacturer: formData.carDetails.manufacturer,
        carModel: formData.carDetails.carModel,
        manufactureYear: Number(formData.carDetails.manufactureYear),
        exShowroomPrice: Number(formData.carDetails.exShowroomPrice || 0),
        onRoadPrice: Number(formData.carDetails.onRoadPrice || 0),
        downPayment: Number(formData.carDetails.downPayment || 0),
        registrationNumber: formData.carDetails.registrationNumber,
      },
    };

    const customerDetails = isLoggedIn
      ? {
          firstName: profile?.firstName || "",
          lastName: profile?.lastName || "",
          email: profile?.email || "",
          phoneNo: profile?.phoneNo || "",
          address: profile?.address || "",
          dob: profile?.dob || "",
          gender: profile?.gender || "",
          password: "", 
        }
      : {
          firstName: formData.customerDetails.firstName,
          lastName: formData.customerDetails.lastName,
          email: formData.customerDetails.email,
          phoneNo: formData.customerDetails.phoneNo,
          address: formData.customerDetails.address,
          dob: formData.customerDetails.dob,
          gender: formData.customerDetails.gender,
          password: formData.customerDetails.password,
        };

    return {
      ...base,
      cifNumber: profile?.cifNumber || formData.cifNumber || null,
      customerDetails,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const payload = buildPayload();
    console.log("Final Payload Sent:", payload);
    dispatch(submitCarLoanRequest(payload));
  };

useEffect(() => {
  if (loanResponse) {
    setShowPopup(true);

    if (!isLoggedIn && loanResponse.cifNumber) {
      toast.success(
        `Loan applied successfully! Your CIF: ${loanResponse.cifNumber}`
      );
      navigate("/login");
    } else if (isLoggedIn) {
      toast.success("Car loan applied successfully.");
      navigate("/loan/status");
    }
  }
}, [loanResponse, isLoggedIn, navigate]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-8">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-4xl p-10">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-10">
          Car Loan Application
        </h1>

        <form onSubmit={handleSubmit} className="space-y-10">
          {!isLoggedIn && (
            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
                Customer Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  "firstName",
                  "lastName",
                  "email",
                  "phoneNo",
                  "password",
                  "address",
                ].map((name) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      {name.replace(/([A-Z])/g, " $1").toUpperCase()}
                    </label>
                    <input
                      name={name}
                      type={name === "password" ? "password" : "text"}
                      value={formData.customerDetails[name]}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                    {formErrors[name] && (
                      <p className="text-red-500 text-sm">{formErrors[name]}</p>
                    )}
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.customerDetails.dob}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  />
                  {formErrors.dob && (
                    <p className="text-red-500 text-sm">{formErrors.dob}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.customerDetails.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                  {formErrors.gender && (
                    <p className="text-red-500 text-sm">{formErrors.gender}</p>
                  )}
                </div>
              </div>
            </section>
          )}

          {isLoggedIn && (
            <section>
              <h2 className="text-lg font-medium text-gray-700 mb-2">
                Logged in as
              </h2>
              <div className="p-3 border rounded-md bg-gray-50">
                <p className="text-sm">
                  <strong>
                    {profile.firstName} {profile.lastName}
                  </strong>{" "}
                  — CIF: <strong>{profile.cifNumber}</strong>
                </p>
                <p className="text-sm text-gray-600">{profile.email}</p>
              </div>
            </section>
          )}

          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
              Loan Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  name: "requestedAmount",
                  label: "Requested Amount",
                  type: "number",
                  min: 0,
                },
                {
                  name: "requestedTenureMonths",
                  label: "Tenure (Months)",
                  type: "number",
                  min: 0,
                },
                {
                  name: "employmentType",
                  label: "Employment Type",
                  type: "select",
                },
                {
                  name: "monthlyIncome",
                  label: "Monthly Income",
                  type: "number",
                  min: 0,
                },
              ].map(({ name, label, type, min }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    {label}
                  </label>

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
                      <option value="BUSINESS">Business</option>
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

                  {formErrors[name] && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors[name]}
                    </p>
                  )}
                  {name === "requestedAmount" && !formErrors[name] && (
                    <p className="text-gray-400 text-xs mt-1">e.g., 500000</p>
                  )}
                  {name === "requestedTenureMonths" && !formErrors[name] && (
                    <p className="text-gray-400 text-xs mt-1">
                      e.g., 240 months (20 years)
                    </p>
                  )}
                  {name === "monthlyIncome" && !formErrors[name] && (
                    <p className="text-gray-400 text-xs mt-1">e.g., 75000</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
              Bank Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { name: "bankName", label: "Bank Name" },
                { name: "bankAccount", label: "Account Number" },
                { name: "ifscCode", label: "IFSC Code" },
              ].map(({ name, label }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    {label}
                  </label>
                  <input
                    name={name}
                    placeholder={label}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                  {formErrors[name] && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors[name]}
                    </p>
                  )}
                  {name === "bankAccount" && !formErrors[name] && (
                    <p className="text-gray-400 text-xs mt-1">9 to 18 digits</p>
                  )}
                  {name === "ifscCode" && !formErrors[name] && (
                    <p className="text-gray-400 text-xs mt-1">
                      e.g., SBIN0002499
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
              Car Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { name: "manufacturer", label: "Car Manufacturer" },
                { name: "carModel", label: "Car Model" },
                {
                  name: "manufactureYear",
                  label: "Manufacturing Year",
                  type: "number",
                },
                {
                  name: "exShowroomPrice",
                  label: "Ex-Showroom Price",
                  type: "number",
                },
                // { name: "onRoadPrice", label: "On-Road Price", type: "number" },
                { name: "downPayment", label: "Down Payment", type: "number" },
                { name: "registrationNumber", label: "Registration Number" },
                // { name: "fuelType", label: "Fuel Type" },
                // { name: "transmissionType", label: "Transmission Type" },
              ].map(({ name, label, type }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    {label}
                  </label>
                  <input
                    name={name}
                    type={type || "text"}
                    value={formData.carDetails[name]}
                    onChange={(e) => handleChange(e, "carDetails")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  />
                  {formErrors[name] && (
                    <p className="text-red-500 text-sm">{formErrors[name]}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-full md:w-1/2 py-3 font-semibold rounded-lg text-white transition ${
                loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Submitting..." : "Submit Car Loan Application"}
            </button>
           {loanResponse && (
  <p className="text-green-600 font-semibold mt-4">
    {loanResponse.message || "Application submitted successfully!"}
  </p>
)}

            {error && (
              <p className="text-red-500 font-semibold mt-4">{error}</p>
            )}
          </div>
        </form>
      </div>
      {showPopup && (
        <LoanSuccessPopup
          name={`${profile?.firstName || formData.customerDetails.firstName} ${
            profile?.lastName || formData.customerDetails.lastName
          }`}
          email={profile?.email || formData.customerDetails.email}
          serviceType="Car Loan"
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default CarLoan;
