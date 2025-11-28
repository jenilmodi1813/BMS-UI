import React, { useState, useEffect } from "react";
import { FaEdit, FaSave, FaUser, FaIdCard, FaFileAlt, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from '../../config/api.config';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const API_BASE = BASE_URL;
  const { accessToken } = useSelector((state) => state.auth);

  // Fetch customer from API using CIF
  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    const cif = authData?.customer?.cifNumber;

    if (!cif) return;

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_BASE}/customers/cif/${cif}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setProfile(res.data);
        setUpdatedProfile(res.data);

        // Update localStorage with fresh data
        localStorage.setItem(
          "auth",
          JSON.stringify({ ...authData, customer: res.data })
        );
      } catch (err) {
        console.error("API failed. Loading data from localStorage...", err);

        // fallback to local stored customer
        if (authData?.customer) {
          setProfile(authData.customer);
          setUpdatedProfile(authData.customer);
        }
      }
    };

    fetchProfile();
  }, [accessToken]);

  const handleChange = (e) => {
    setUpdatedProfile({ ...updatedProfile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (!profile?.customerId) throw new Error("Invalid customer ID");

      const res = await axios.put(
        `${API_BASE}/customers/${profile.customerId}`,
        updatedProfile,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Update state with backend response
      setProfile(res.data);
      setUpdatedProfile(res.data);
      setEditMode(false);

      // Update localStorage
      const authData = JSON.parse(localStorage.getItem("auth"));
      localStorage.setItem(
        "auth",
        JSON.stringify({ ...authData, customer: res.data })
      );

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Failed to save profile. Check console for details.");
    }
  };

  if (!profile)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-500 mt-1">Manage your personal information and KYC documents</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Profile Summary */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUser className="text-blue-600 text-4xl" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{profile.firstName} {profile.lastName}</h2>
              <p className="text-gray-500 text-sm">{profile.email}</p>

              <div className="mt-6 flex justify-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${profile.status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                  {profile.status}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                  {profile.role}
                </span>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 text-left">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-500">CIF Number</span>
                  <span className="font-mono font-medium text-gray-900">{profile.cifNumber}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Customer ID</span>
                  <span className="font-mono font-medium text-gray-900">{profile.customerId}</span>
                </div>
              </div>
            </div>

            {/* KYC Summary Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaIdCard className="text-blue-600" />
                KYC Status
              </h3>
              {profile.kycDocuments?.length > 0 ? (
                <div className="space-y-4">
                  {profile.kycDocuments.map((doc) => (
                    <div key={doc.kycId} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="mt-1">
                        {doc.documentStatus === "APPROVED" ? (
                          <FaCheckCircle className="text-green-500" />
                        ) : doc.documentStatus === "REJECTED" ? (
                          <FaTimesCircle className="text-red-500" />
                        ) : (
                          <FaClock className="text-yellow-500" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 capitalize">
                          {doc.documentType.replace(/_/g, " ").toLowerCase()}
                        </p>
                        <p className="text-xs text-gray-500 font-mono mt-0.5">
                          {doc.documentNumber}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <p className="text-gray-500 text-sm">No KYC documents found</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Details Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FaFileAlt className="text-blue-600" />
                  Personal Details
                </h3>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${editMode
                      ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                    }`}
                >
                  {editMode ? "Cancel Edit" : <><FaEdit /> Edit Profile</>}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "First Name", name: "firstName" },
                  { label: "Last Name", name: "lastName" },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Phone Number", name: "phoneNo", type: "tel" },
                  { label: "Date of Birth", name: "dob", type: "date" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {field.label}
                    </label>
                    <input
                      type={field.type || "text"}
                      name={field.name}
                      value={editMode ? updatedProfile[field.name] : profile[field.name] || ""}
                      onChange={handleChange}
                      disabled={!editMode}
                      className={`block w-full px-4 py-2.5 rounded-xl text-sm transition-all ${editMode
                          ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                          : "border-transparent bg-gray-50 text-gray-600 cursor-not-allowed"
                        } border`}
                    />
                  </div>
                ))}

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Address
                  </label>
                  <textarea
                    name="address"
                    rows={3}
                    value={editMode ? updatedProfile.address : profile.address || ""}
                    onChange={handleChange}
                    disabled={!editMode}
                    className={`block w-full px-4 py-2.5 rounded-xl text-sm transition-all ${editMode
                        ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                        : "border-transparent bg-gray-50 text-gray-600 cursor-not-allowed"
                      } border`}
                  />
                </div>
              </div>

              {editMode && (
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all shadow-lg shadow-blue-200"
                  >
                    <FaSave /> Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
