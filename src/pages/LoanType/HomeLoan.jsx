import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyLoanRequest } from "../../redux/loan/homeLoan/home.loan.slice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Home, User, Briefcase, Building, History,
  ChevronDown, ChevronUp, CheckCircle,
  DollarSign, Calendar, MapPin
} from "lucide-react";
import { InputField, SectionHeader } from "../../components/common/FormComponents";

const HomeLoan = () => {
  const dispatch = useDispatch();
  const { loading, loanResponse, error } = useSelector(
    (state) => state.homeLoan
  );

  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [showActiveLoans, setShowActiveLoans] = useState(true);
  const [showClosedLoans, setShowClosedLoans] = useState(false);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("auth"));
      if (data && data.customer) setProfile(data.customer);
    } catch (e) {
      console.error("Error parsing auth from localStorage", e);
    }
  }, []);

  const getInitialFormData = () => ({
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
    loanHistoryDetailsDto: {
      haveExistingLoans: false,
      activeLoans: [],
      closedLoans: [],
      totalOutstandingAmount: 0,
      totalMonthlyEmi: 0,
      totalClosedLoans: 0,
      totalActiveLoans: 0,
    },
  });

  const [formData, setFormData] = useState(getInitialFormData());

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
        homeDetails: { ...prev.homeDetails },
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

  const updateActiveLoan = (index, key, value) => {
    setFormData((prev) => {
      const updated = [...prev.loanHistoryDetailsDto.activeLoans];
      updated[index] = { ...updated[index], [key]: value };
      return {
        ...prev,
        loanHistoryDetailsDto: {
          ...prev.loanHistoryDetailsDto,
          activeLoans: updated,
        },
      };
    });
  };

  const updateClosedLoan = (index, key, value) => {
    setFormData((prev) => {
      const updated = [...prev.loanHistoryDetailsDto.closedLoans];
      updated[index] = { ...updated[index], [key]: value };
      return {
        ...prev,
        loanHistoryDetailsDto: {
          ...prev.loanHistoryDetailsDto,
          closedLoans: updated,
        },
      };
    });
  };

  const validateForm = () => {
    const errors = {};
    const cd = formData.customerDetails;
    const hd = formData.homeDetails;

    // Customer Details Validation
    if (!cd.firstName.trim()) errors.firstName = "First name is required";
    if (!cd.lastName.trim()) errors.lastName = "Last name is required";
    if (!cd.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cd.email))
      errors.email = "Valid email is required";
    if (!cd.phoneNo.trim() || !/^\d{10}$/.test(cd.phoneNo))
      errors.phoneNo = "Phone number must be 10 digits";

    if (!isLoggedIn && (!cd.password || cd.password.length < 8))
      errors.password = "Password must be at least 8 characters";

    if (!cd.address.trim()) errors.address = "Address is required";

    if (!cd.dob) {
      errors.dob = "Date of birth is required";
    } else {
      const dobDate = new Date(cd.dob);
      const today = new Date();
      let age = today.getFullYear() - dobDate.getFullYear();
      const m = today.getMonth() - dobDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
        age--;
      }
      if (age < 18) errors.dob = "You must be at least 18 years old";
    }

    if (!cd.gender) errors.gender = "Gender is required";

    // Loan Details Validation
    if (!formData.requestedAmount || Number(formData.requestedAmount) <= 0)
      errors.requestedAmount = "Requested amount must be greater than 0";

    if (
      !formData.requestedTenureMonths ||
      Number(formData.requestedTenureMonths) <= 0
    )
      errors.requestedTenureMonths = "Tenure must be greater than 0";

    if (Number(formData.requestedTenureMonths) > 360)
      errors.requestedTenureMonths = "Tenure cannot exceed 30 years (360 months)";

    if (!formData.employmentType)
      errors.employmentType = "Employment type is required";

    if (!formData.monthlyIncome || Number(formData.monthlyIncome) <= 0)
      errors.monthlyIncome = "Monthly income must be greater than 0";

    // Bank Details Validation
    if (!formData.bankName) errors.bankName = "Bank name is required";
    if (!formData.bankAccount || !/^\d{9,18}$/.test(formData.bankAccount))
      errors.bankAccount = "Account number must be 9–18 digits";

    if (!formData.ifscCode || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode))
      errors.ifscCode = "Invalid IFSC format (e.g., SBIN0001234)";

    // Property Details Validation
    if (!hd.propertyValue || Number(hd.propertyValue) <= 0)
      errors.propertyValue = "Property value must be greater than 0";

    if (Number(hd.downPayment) < 0)
      errors.downPayment = "Down payment cannot be negative";

    if (Number(hd.downPayment) >= Number(hd.propertyValue))
      errors.downPayment = "Down payment cannot be greater than or equal to property value";

    if (!hd.propertyAddress.trim())
      errors.propertyAddress = "Property address required";
    if (!hd.propertyType.trim()) errors.propertyType = "Property type required";
    if (!hd.ownershipType.trim())
      errors.ownershipType = "Ownership type required";
    if (!hd.registrationNumber.trim())
      errors.registrationNumber = "Registration number required";

    setFormErrors(errors);

    if (Object.keys(errors).length) {
      toast.error("Please fix highlighted errors");
      return false;
    }

    return true;
  };

  const buildPayload = () => {
    const base = {
      loanType: "HOME",
      requestedAmount: Number(formData.requestedAmount),
      requestedTenureMonths: parseInt(formData.requestedTenureMonths, 10),
      employmentType: formData.employmentType,
      monthlyIncome: Number(formData.monthlyIncome),
      bankName: formData.bankName,
      bankAccount: formData.bankAccount,
      ifscCode: formData.ifscCode,
      homeDetails: {
        propertyAddress: formData.homeDetails.propertyAddress,
        propertyValue: Number(formData.homeDetails.propertyValue),
        builderName: formData.homeDetails.builderName,
        downPayment: Number(formData.homeDetails.downPayment || 0),
        propertyType: formData.homeDetails.propertyType,
        ownershipType: formData.homeDetails.ownershipType,
        registrationNumber: formData.homeDetails.registrationNumber,
      },
    };

    const customerDetails = profile
      ? {
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phoneNo: profile.phoneNo,
        address: profile.address,
        dob: profile.dob,
        gender: profile.gender,
        password: "",
      }
      : formData.customerDetails;

    if (!formData.loanHistoryDetailsDto.haveExistingLoans) {
      return {
        ...base,
        cifNumber: profile?.cifNumber || formData.cifNumber || null,
        customerDetails,
        loanHistoryDetailsDto: null,
      };
    }

    const activeLoans = Array.isArray(
      formData.loanHistoryDetailsDto.activeLoans
    )
      ? formData.loanHistoryDetailsDto.activeLoans
      : [];

    const closedLoans = Array.isArray(
      formData.loanHistoryDetailsDto.closedLoans
    )
      ? formData.loanHistoryDetailsDto.closedLoans
      : [];

    const totalActiveLoans = activeLoans.length;
    const totalClosedLoans = closedLoans.length;

    const totalMonthlyEmi = activeLoans.reduce(
      (sum, loan) => sum + Number(loan.emiAmount || 0),
      0
    );

    const totalOutstandingAmount = activeLoans.reduce(
      (sum, loan) => sum + Number(loan.remainingAmount || 0),
      0
    );

    return {
      ...base,
      cifNumber: profile?.cifNumber || formData.cifNumber || null,
      customerDetails,
      loanHistoryDetailsDto: {
        haveExistingLoans: true,
        activeLoans,
        closedLoans,
        totalMonthlyEmi,
        totalOutstandingAmount,
        totalClosedLoans,
        totalActiveLoans,
      },
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = buildPayload();
    dispatch(applyLoanRequest(payload));
  };

  useEffect(() => {
    if (!loading && loanResponse && !error) {
      const loanId =
        loanResponse.loanApplicationId ||
        loanResponse.loanId ||
        loanResponse.id;

      if (loanId) {
        localStorage.setItem("loanApplicationId", loanId);
      }

      toast.success("Loan submitted! Please upload KYC documents.");
      navigate("/kyc-upload");
    }

    if (!loading && error) {
      toast.error(error);
    }
  }, [loanResponse, error, loading, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-2">
            Home Loan Application
          </h1>
          <p className="text-lg text-gray-600">Apply for your dream home in minutes</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Customer Details Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <SectionHeader title="Personal Information" icon={User} />

            {isLoggedIn ? (
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 flex items-start gap-4">
                <div className="p-3 bg-white rounded-full shadow-sm">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Logged in as {profile.firstName} {profile.lastName}</h3>
                  <p className="text-gray-600 text-sm mt-1">{profile.email}</p>
                  <p className="text-gray-500 text-xs mt-2 font-mono bg-white px-2 py-1 rounded inline-block border border-blue-100">CIF: {profile.cifNumber}</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="First Name" name="firstName" value={formData.customerDetails.firstName} onChange={handleChange} error={formErrors.firstName} icon={User} placeholder="Enter your first name" />
                <InputField label="Last Name" name="lastName" value={formData.customerDetails.lastName} onChange={handleChange} error={formErrors.lastName} icon={User} placeholder="Enter your last name" />
                <InputField label="Email" name="email" type="email" value={formData.customerDetails.email} onChange={handleChange} error={formErrors.email} icon={User} placeholder="Enter your email address" />
                <InputField label="Phone Number" name="phoneNo" value={formData.customerDetails.phoneNo} onChange={handleChange} error={formErrors.phoneNo} icon={User} placeholder="Enter your 10-digit phone number" />
                <InputField label="Password" name="password" type="password" value={formData.customerDetails.password} onChange={handleChange} error={formErrors.password} icon={User} placeholder="Create a secure password" />
                <InputField label="Date of Birth" name="dob" type="date" value={formData.customerDetails.dob} onChange={handleChange} error={formErrors.dob} />

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Gender</label>
                  <select
                    name="gender"
                    value={formData.customerDetails.gender}
                    onChange={handleChange}
                    className="block w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                  {formErrors.gender && <p className="text-red-500 text-xs mt-1">{formErrors.gender}</p>}
                </div>

                <div className="md:col-span-2">
                  <InputField label="Address" name="address" value={formData.customerDetails.address} onChange={handleChange} error={formErrors.address} icon={MapPin} placeholder="Enter your full address" />
                </div>
              </div>
            )}
          </div>

          {/* Loan Details Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <SectionHeader title="Loan Requirements" icon={DollarSign} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Requested Amount"
                name="requestedAmount"
                type="number"
                value={formData.requestedAmount}
                onChange={handleChange}
                error={formErrors.requestedAmount}
                icon={DollarSign}
                placeholder="e.g. 5000000"
              />
              <InputField
                label="Tenure (Months)"
                name="requestedTenureMonths"
                type="number"
                value={formData.requestedTenureMonths}
                onChange={handleChange}
                error={formErrors.requestedTenureMonths}
                icon={Calendar}
                placeholder="e.g. 240"
              />

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Employment Type</label>
                <div className="relative">
                  <Briefcase className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none h-full w-8 text-gray-400" />
                  <select
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="">Select Type</option>
                    <option value="SALARIED">Salaried</option>
                    <option value="SELF_EMPLOYED">Self Employed</option>
                    <option value="BUSINESS">Business</option>
                  </select>
                </div>
                {formErrors.employmentType && <p className="text-red-500 text-xs mt-1">{formErrors.employmentType}</p>}
              </div>

              <InputField
                label="Monthly Income"
                name="monthlyIncome"
                type="number"
                value={formData.monthlyIncome}
                onChange={handleChange}
                error={formErrors.monthlyIncome}
                icon={DollarSign}
              />
            </div>
          </div>

          {/* Property Details Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <SectionHeader title="Property Information" icon={Home} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Property Value"
                name="propertyValue"
                type="number"
                value={formData.homeDetails.propertyValue}
                onChange={(e) => handleChange(e, "homeDetails")}
                error={formErrors.propertyValue}
                icon={DollarSign}
              />
              <InputField
                label="Down Payment"
                name="downPayment"
                type="number"
                value={formData.homeDetails.downPayment}
                onChange={(e) => handleChange(e, "homeDetails")}
                error={formErrors.downPayment}
                icon={DollarSign}
              />
              <InputField
                label="Property Type"
                name="propertyType"
                value={formData.homeDetails.propertyType}
                onChange={(e) => handleChange(e, "homeDetails")}
                error={formErrors.propertyType}
                placeholder="e.g. Apartment, Villa"
              />
              <InputField
                label="Ownership Type"
                name="ownershipType"
                value={formData.homeDetails.ownershipType}
                onChange={(e) => handleChange(e, "homeDetails")}
                error={formErrors.ownershipType}
                placeholder="e.g. Freehold"
              />
              <InputField
                label="Builder Name"
                name="builderName"
                value={formData.homeDetails.builderName}
                onChange={(e) => handleChange(e, "homeDetails")}
                placeholder="Optional"
              />
              <InputField
                label="Registration Number"
                name="registrationNumber"
                value={formData.homeDetails.registrationNumber}
                onChange={(e) => handleChange(e, "homeDetails")}
                error={formErrors.registrationNumber}
              />
              <div className="md:col-span-2">
                <InputField
                  label="Property Address"
                  name="propertyAddress"
                  value={formData.homeDetails.propertyAddress}
                  onChange={(e) => handleChange(e, "homeDetails")}
                  error={formErrors.propertyAddress}
                  icon={MapPin}
                />
              </div>
            </div>
          </div>

          {/* Bank Details Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <SectionHeader title="Bank Details" icon={Building} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField
                label="Bank Name"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                error={formErrors.bankName}
                icon={Building}
              />
              <InputField
                label="Account Number"
                name="bankAccount"
                value={formData.bankAccount}
                onChange={handleChange}
                error={formErrors.bankAccount}
              />
              <InputField
                label="IFSC Code"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                error={formErrors.ifscCode}
              />
            </div>
          </div>

          {/* Loan History Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <SectionHeader title="Loan History" icon={History} />

            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="haveExistingLoans"
                checked={formData.loanHistoryDetailsDto.haveExistingLoans}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    loanHistoryDetailsDto: {
                      ...prev.loanHistoryDetailsDto,
                      haveExistingLoans: e.target.checked,
                      activeLoans: e.target.checked ? prev.loanHistoryDetailsDto.activeLoans || [] : [],
                      closedLoans: e.target.checked ? prev.loanHistoryDetailsDto.closedLoans || [] : [],
                    },
                  }))
                }
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="haveExistingLoans" className="ml-3 text-gray-700 font-medium">
                I have existing or past loans
              </label>
            </div>

            {formData.loanHistoryDetailsDto.haveExistingLoans && (
              <div className="space-y-6 animate-fadeIn">
                {/* Active Loans Section */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setShowActiveLoans(!showActiveLoans)}
                    className="w-full flex justify-between items-center px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <span className="font-semibold text-gray-800">Active Loans</span>
                    {showActiveLoans ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                  </button>

                  {showActiveLoans && (
                    <div className="p-6 bg-white">
                      {formData.loanHistoryDetailsDto.activeLoans.map((loan, index) => (
                        <div key={index} className="mb-6 p-6 border border-gray-100 rounded-xl bg-gray-50 relative group">
                          <button
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                loanHistoryDetailsDto: {
                                  ...prev.loanHistoryDetailsDto,
                                  activeLoans: prev.loanHistoryDetailsDto.activeLoans.filter((_, i) => i !== index),
                                },
                              }))
                            }
                            className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors "
                          >
                            Remove
                          </button>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <InputField placeholder="Loan Type" value={loan.loanType} onChange={(e) => updateActiveLoan(index, "loanType", e.target.value)} />
                            <InputField placeholder="Amount" type="number" value={loan.loanAmount} onChange={(e) => updateActiveLoan(index, "loanAmount", e.target.value)} />
                            <InputField placeholder="EMI Amount" type="number" value={loan.emiAmount} onChange={(e) => updateActiveLoan(index, "emiAmount", e.target.value)} />
                            <InputField placeholder="Bank Name" value={loan.bankOrLenderName} onChange={(e) => updateActiveLoan(index, "bankOrLenderName", e.target.value)} />
                            <InputField placeholder="Remaining Amount" type="number" value={loan.remainingAmount} onChange={(e) => updateActiveLoan(index, "remainingAmount", e.target.value)} />
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            loanHistoryDetailsDto: {
                              ...prev.loanHistoryDetailsDto,
                              activeLoans: [
                                ...prev.loanHistoryDetailsDto.activeLoans,
                                { loanType: "", loanAmount: "", remainingAmount: "", tenureMonths: "", emiAmount: "", bankOrLenderName: "", startDate: "", endDate: "" },
                              ],
                            },
                          }))
                        }
                        className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
                      >
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">+</div>
                        Add Active Loan
                      </button>
                    </div>
                  )}
                </div>

                {/* Closed Loans Section */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setShowClosedLoans(!showClosedLoans)}
                    className="w-full flex justify-between items-center px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <span className="font-semibold text-gray-800">Closed Loans</span>
                    {showClosedLoans ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                  </button>

                  {showClosedLoans && (
                    <div className="p-6 bg-white">
                      {formData.loanHistoryDetailsDto.closedLoans.map((loan, index) => (
                        <div key={index} className="mb-6 p-6 border border-gray-100 rounded-xl bg-gray-50 relative">
                          <button
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                loanHistoryDetailsDto: {
                                  ...prev.loanHistoryDetailsDto,
                                  closedLoans: prev.loanHistoryDetailsDto.closedLoans.filter((_, i) => i !== index),
                                },
                              }))
                            }
                            className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors"
                          >
                            Remove
                          </button>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <InputField placeholder="Loan Type" value={loan.loanType} onChange={(e) => updateClosedLoan(index, "loanType", e.target.value)} />
                            <InputField placeholder="Amount" type="number" value={loan.loanAmount} onChange={(e) => updateClosedLoan(index, "loanAmount", e.target.value)} />
                            <InputField placeholder="Bank Name" value={loan.bankOrLenderName} onChange={(e) => updateClosedLoan(index, "bankOrLenderName", e.target.value)} />
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            loanHistoryDetailsDto: {
                              ...prev.loanHistoryDetailsDto,
                              closedLoans: [
                                ...prev.loanHistoryDetailsDto.closedLoans,
                                { loanType: "", loanAmount: "", bankOrLenderName: "", startDate: "", endDate: "" },
                              ],
                            },
                          }))
                        }
                        className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
                      >
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">+</div>
                        Add Closed Loan
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  Submit Application
                  <CheckCircle className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomeLoan;
