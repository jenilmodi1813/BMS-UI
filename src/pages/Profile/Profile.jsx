// import React, { useState, useEffect } from "react";
// import { FaEdit, FaSave } from "react-icons/fa";

// const UserProfile = () => {
//   const [profile, setProfile] = useState({
//     name: "John Doe",
//     address: "123 Main Street, City, Country",
//     dob: "1990-05-10",
//     kycStatus: "Pending", // or Verified
//   });

//   const [editMode, setEditMode] = useState(false);
//   const [updatedProfile, setUpdatedProfile] = useState(profile);

//   // Example: Fetch user profile from API on component mount
//   useEffect(() => {
//     // axios.get('/api/v1/customers/me').then(res => setProfile(res.data))
//   }, []);

//   const handleChange = (e) => {
//     setUpdatedProfile({ ...updatedProfile, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     // Call API to update profile
//     // axios.put(`/api/v1/customers/${profile.customerId}`, updatedProfile)
//     setProfile(updatedProfile);
//     setEditMode(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
//       {/* Header */}
//       <h1 className="text-3xl font-semibold text-blue-700 mb-6 text-center">
//         My Profile
//       </h1>

//       {/* Profile Card */}
//       <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md border border-gray-100">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold text-gray-700">Profile Details</h2>
//           <button
//             onClick={() => setEditMode(!editMode)}
//             className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
//           >
//             {editMode ? "Cancel" : <FaEdit />} 
//             {!editMode && "Edit"}
//           </button>
//         </div>

//         {/* Name */}
//         <div className="mb-4">
//           <label className="text-sm font-medium text-gray-600">Full Name</label>
//           <input
//             type="text"
//             name="name"
//             value={editMode ? updatedProfile.name : profile.name}
//             onChange={handleChange}
//             disabled={!editMode}
//             className={`w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
//               editMode
//                 ? "border-gray-400 focus:ring-blue-600"
//                 : "border-gray-200 bg-gray-100 cursor-not-allowed"
//             }`}
//           />
//         </div>

//         {/* Address */}
//         <div className="mb-4">
//           <label className="text-sm font-medium text-gray-600">Address</label>
//           <input
//             type="text"
//             name="address"
//             value={editMode ? updatedProfile.address : profile.address}
//             onChange={handleChange}
//             disabled={!editMode}
//             className={`w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
//               editMode
//                 ? "border-gray-400 focus:ring-blue-600"
//                 : "border-gray-200 bg-gray-100 cursor-not-allowed"
//             }`}
//           />
//         </div>

//         {/* Date of Birth */}
//         <div className="mb-4">
//           <label className="text-sm font-medium text-gray-600">Date of Birth</label>
//           <input
//             type="date"
//             name="dob"
//             value={editMode ? updatedProfile.dob : profile.dob}
//             onChange={handleChange}
//             disabled={!editMode}
//             className={`w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
//               editMode
//                 ? "border-gray-400 focus:ring-blue-600"
//                 : "border-gray-200 bg-gray-100 cursor-not-allowed"
//             }`}
//           />
//         </div>

//         {/* KYC Status */}
//         <div className="mb-4">
//           <label className="text-sm font-medium text-gray-600">KYC Status</label>
//           <p
//             className={`mt-1 font-semibold ${
//               profile.kycStatus === "Verified" ? "text-green-600" : "text-orange-600"
//             }`}
//           >
//             {profile.kycStatus}
//           </p>
//         </div>

//         {/* Save Button */}
//         {editMode && (
//           <button
//             onClick={handleSave}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full font-semibold flex items-center justify-center gap-2 transition"
//           >
//             <FaSave /> Save Changes
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

import React, { useState, useEffect } from "react";
import { FaEdit, FaSave, FaUpload } from "react-icons/fa";

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    address: "123 Main Street, City, Country",
    dob: "1990-05-10",
    kycStatus: "Pending", // Pending or Verified
    kycDocumentType: "",
    kycDocumentNumber: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState(profile);
  const [kycFile, setKycFile] = useState(null);

  // Example: Fetch user profile and KYC status from API on component mount
  useEffect(() => {
    // axios.get('/api/v1/customers/me').then(res => setProfile(res.data))
    // axios.get('/api/v1/kyc/me').then(res => setProfile({...profile, ...res.data}))
  }, []);

  const handleChange = (e) => {
    setUpdatedProfile({ ...updatedProfile, [e.target.name]: e.target.value });
  };

  const handleKycFileChange = (e) => {
    setKycFile(e.target.files[0]);
  };

  const handleSave = () => {
    // Save profile updates
    // axios.put(`/api/v1/customers/${profile.id}`, updatedProfile)
    setProfile(updatedProfile);
    setEditMode(false);
  };

  const handleSubmitKyc = () => {
    if (!kycFile || !updatedProfile.kycDocumentType || !updatedProfile.kycDocumentNumber) {
      alert("Please fill all KYC details and select a file.");
      return;
    }
    // Submit KYC via API
    // const formData = new FormData();
    // formData.append('documentType', updatedProfile.kycDocumentType);
    // formData.append('documentNumber', updatedProfile.kycDocumentNumber);
    // formData.append('file', kycFile);
    // axios.post('/api/v1/kyc', formData)
    alert("KYC submitted successfully!");
    setProfile({ ...profile, kycStatus: "Pending" });
    setKycFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      <h1 className="text-3xl font-semibold text-blue-700 mb-6 text-center">
        My Profile
      </h1>

      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md border border-gray-100 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Profile Details</h2>
          <button
            onClick={() => setEditMode(!editMode)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            {editMode ? "Cancel" : <FaEdit />} {!editMode && "Edit"}
          </button>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">Full Name</label>
          <input
            type="text"
            name="name"
            value={editMode ? updatedProfile.name : profile.name}
            onChange={handleChange}
            disabled={!editMode}
            className={`w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
              editMode
                ? "border-gray-400 focus:ring-blue-600"
                : "border-gray-200 bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">Address</label>
          <input
            type="text"
            name="address"
            value={editMode ? updatedProfile.address : profile.address}
            onChange={handleChange}
            disabled={!editMode}
            className={`w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
              editMode
                ? "border-gray-400 focus:ring-blue-600"
                : "border-gray-200 bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={editMode ? updatedProfile.dob : profile.dob}
            onChange={handleChange}
            disabled={!editMode}
            className={`w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
              editMode
                ? "border-gray-400 focus:ring-blue-600"
                : "border-gray-200 bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        {/* KYC Status */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600">KYC Status</label>
          <p
            className={`mt-1 font-semibold ${
              profile.kycStatus === "Verified" ? "text-green-600" : "text-orange-600"
            }`}
          >
            {profile.kycStatus}
          </p>
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

      {/* KYC Submission Card */}
      {profile.kycStatus !== "Verified" && (
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">KYC Verification</h2>

          <div className="mb-4">
            <label className="text-sm font-medium text-gray-600">Document Type</label>
            <input
              type="text"
              name="kycDocumentType"
              value={updatedProfile.kycDocumentType}
              onChange={handleChange}
              placeholder="PAN, Aadhar, Passport..."
              className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-gray-600">Document Number</label>
            <input
              type="text"
              name="kycDocumentNumber"
              value={updatedProfile.kycDocumentNumber}
              onChange={handleChange}
              placeholder="Enter Document Number"
              className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-gray-600">Upload Document</label>
            <input
              type="file"
              onChange={handleKycFileChange}
              className="w-full mt-1"
            />
          </div>

          <button
            onClick={handleSubmitKyc}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-full font-semibold flex items-center justify-center gap-2 transition"
          >
            <FaUpload /> Submit KYC
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
