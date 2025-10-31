import React, { useState, useEffect } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";


const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const API_BASE = "http://localhost:8080/api/v1";
  const { accessToken } = useSelector((state) => state.auth);

  // Fetch customer from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("auth"));
    if (data && data.customer) {
      setProfile(data.customer);
      setUpdatedProfile(data.customer);
    }
  }, []);



  console.log("Profile Data:", profile);
  console.log("accessToken:", accessToken);
  

  const handleChange = (e) => {
    setUpdatedProfile({ ...updatedProfile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (!profile?.customerId) throw new Error("Invalid customer ID");
      const token = JSON.parse(localStorage.getItem("user"))?.tokens?.accessToken;

      await axios.put(
        `${API_BASE}/customers/${profile.customerId}`,
        updatedProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(updatedProfile);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Failed to save profile. Check console for details.");
    }
  };

  if (!profile)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg">Loading profile...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      <h1 className="text-3xl font-semibold text-blue-700 mb-6 text-center">
        My Profile
      </h1>

      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md border border-gray-100 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Profile Details</h2>
          {/* <button
            onClick={() => setEditMode(!editMode)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            {editMode ? "Cancel" : <FaEdit />} {!editMode && "Edit"}
          </button> */}
        </div>

        {[
          { label: "First Name", name: "firstName" },
          { label: "Last Name", name: "lastName" },
          { label: "Email", name: "email" },
          { label: "Phone No", name: "phoneNo" },
          { label: "Address", name: "address" },
          { label: "Date of Birth", name: "dob", type: "date" },
        ].map((field) => (
          <div className="mb-4" key={field.name}>
            <label className="text-sm font-medium text-gray-600">
              {field.label}
            </label>
            <input
              type={field.type || "text"}
              name={field.name}
              value={
                editMode ? updatedProfile[field.name] : profile[field.name] || ""
              }
              onChange={handleChange}
              disabled={!editMode}
              className={`w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
                editMode
                  ? "border-gray-400 focus:ring-blue-600"
                  : "border-gray-200 bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>
        ))}

        {/* Role & Status */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">Role</label>
          <p className="mt-1 font-semibold text-gray-800">{profile.role}</p>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">Status</label>
          <p
            className={`mt-1 font-semibold ${
              profile.status === "ACTIVE"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {profile.status}
          </p>
        </div>

        {/* CIF Number */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">CIF Number</label>
          <p className="mt-1 font-semibold text-gray-800">{profile.cifNumber}</p>
        </div>

        {editMode && (
          <button
            onClick={handleSave}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full font-semibold flex items-center justify-center gap-2 transition"
          >
            <FaSave /> Save Changes
          </button>
        )}
      </div>

      {/* KYC Documents */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          KYC Documents
        </h2>

        {profile.kycDocuments && profile.kycDocuments.length > 0 ? (
          <ul className="space-y-3">
            {profile.kycDocuments.map((doc) => (
              <li
                key={doc.kycId}
                className="p-3 border border-gray-200 rounded-md"
              >
                <p className="font-semibold text-gray-800">
                  {doc.documentType.replace("_", " ")}
                </p>
                <p className="text-sm text-gray-600">
                  Document No: {doc.documentNumber}
                </p>
                <p
                  className={`text-sm font-medium ${
                    doc.documentStatus === "APPROVED"
                      ? "text-green-600"
                      : "text-orange-600"
                  }`}
                >
                  Status: {doc.documentStatus}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No KYC documents found.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
