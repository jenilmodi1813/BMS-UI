import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uploadDocumentRequest, resetUploadState } from "../../redux/loan/loan.slice";

const KycUpload = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, uploadSuccess } = useSelector((state) => state.loan);

  const [formData, setFormData] = useState({
    loanApplicationId: localStorage.getItem("loanApplicationId") || "",
    documentType: "",
    documentName: "",
    documentNumber: "",
    remarks: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error("Please select a file");
      return;
    }

    const multipartForm = new FormData();
    multipartForm.append("file", selectedFile);
    multipartForm.append(
      "request",
      new Blob([JSON.stringify(formData)], { type: "application/json" })
    );

    dispatch(uploadDocumentRequest(multipartForm));
  };

  // Handle side effects (success/error)
  useEffect(() => {
    if (uploadSuccess) {
      // Clear loan ID after successful upload
      localStorage.removeItem("loanApplicationId");
      dispatch(resetUploadState());
      navigate("/loan-history");
    }
  }, [uploadSuccess, navigate, dispatch]);

  useEffect(() => {
    if (error) {
      // Error toast is already handled in saga, but we can clear state here if needed
      // or just rely on the saga toast.
      // dispatch(resetUploadState()); // Optional: clear error after showing
    }
  }, [error, dispatch]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      dispatch(resetUploadState());
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Upload KYC Document
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Fields */}
          <div>
            <label className="text-sm font-medium">Loan Application ID</label>
            <input
              type="text"
              name="loanApplicationId"
              value={formData.loanApplicationId}
              readOnly
              className="w-full border p-2 rounded mt-1 bg-gray-200 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Document Type</label>
            <select
              name="documentType"
              value={formData.documentType}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              required
            >
              <option value="">Select Document Type</option>
              <option value="AADHAR">Aadhar Card</option>
              <option value="PAN">PAN Card</option>
              <option value="PASSPORT">Passport</option>
              <option value="DRIVING_LICENSE">Driving License</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Document Name</label>
            <input
              type="text"
              name="documentName"
              value={formData.documentName}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              placeholder="Example: Aadhar Front"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Document Number</label>
            <input
              type="text"
              name="documentNumber"
              value={formData.documentNumber}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              placeholder="Enter Document Number"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Remarks</label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              rows="3"
              placeholder="Optional remarks"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="text-sm font-medium">Upload File</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full border p-2 rounded mt-1"
              accept="image/*,application/pdf"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white font-semibold rounded-lg ${loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loading ? "Uploading..." : "Upload Document"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default KycUpload;
