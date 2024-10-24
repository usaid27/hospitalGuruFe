// src/Pages/Admin/Hospital/AddHospitals.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { upserthospital } from "../../../Services/apiService";
import hospitalImage from "../../../Assets/hospital-icon.jpg";
import { useAuth } from "../../../contexts/AuthContext"; // Import useAuth from AuthContext
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";

function AddHospitals() {
  // State fields for the form
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [infrastructure, setInfrastructure] = useState("");
  const [teamAndSpecialities, setTeamAndSpecialities] = useState("");
  const [location, setLocation] = useState("");
  const [accreditationAndAwards, setAccreditationAndAwards] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [mapLocationLatLong, setMapLocationLatLong] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(hospitalImage); // Default preview image

  const navigate = useNavigate();
  const { user } = useAuth(); // Get current user's information

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !location) {
      toast.error("Please fill in all mandatory fields.");
      return;
    }

    const formData = new FormData();
    // formData.append('id', '0'); // Remove if not needed
    formData.append("Name", name);
    formData.append("About", about);
    formData.append("Infrastructure", infrastructure);
    formData.append("TeamAndSpecialities", teamAndSpecialities);
    formData.append("Location", location); // Required field
    formData.append("AccreditationAndAwards", accreditationAndAwards);
    formData.append("Phone", phone);
    formData.append("Email", email);
    formData.append("ContactInfo", contactInfo);
    formData.append("MapLocationLatLong", mapLocationLatLong);
    if (image) formData.append("ImageFormFile", image); // Ensure 'ImageFile' matches backend
    formData.append("CreatedBy", user?.email || "default@example.com"); // Use the current user's email
    formData.append("ModifiedBy", user?.email || "default@example.com"); // Use the current user's email
    formData.append("CreatedOn", new Date().toISOString()); // Current date and time
    formData.append("ModifiedOn", new Date().toISOString()); // Current date and time

    try {
      await upserthospital(formData); // Use the corrected function name
      toast.success("Hospital added successfully!");
      // Clear form data
      setName("");
      setAbout("");
      setInfrastructure("");
      setTeamAndSpecialities("");
      setLocation("");
      setAccreditationAndAwards("");
      setPhone("");
      setEmail("");
      setContactInfo("");
      setMapLocationLatLong("");
      setImage(null);
      setPreview(hospitalImage); // Reset to default image
      navigate("/admin/hospitals"); // Navigate after adding
    } catch (error) {
      console.error("Error upserting hospital:", error);
      toast.error("Failed to add hospital.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Update preview
    }
  };

  return (
    <div className="doctoradmin-form-container">
      <div className="doctoradmin-card">
        <h2 className="animatedadmin-title">Add Hospital</h2>
        <div className="doctoradmin-card-content">
          <div className="image-preview">
            <img
              src={preview}
              alt="Hospital Preview"
              className="preview-img"
              // style={{
              //   width: "300px",
              //   height: "300px",
              //   objectFit: "cover",
              //   borderRadius: "10px",
              //   border: "2px solid #ddd",
              // }}
            />
          </div>
          <div className="formadmin-section">
            <form onSubmit={handleSubmit} className="formadmin-fields">
              <div className="formadmin-group">
                <label>
                  Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="formadmin-group">
                <label>About</label>
                <textarea
                  className="form-control"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  rows="3"
                />
              </div>
              <div className="formadmin-group">
                <label>Infrastructure</label>
                <textarea
                  className="form-control"
                  value={infrastructure}
                  onChange={(e) => setInfrastructure(e.target.value)}
                  rows="3"
                />
              </div>
              <div className="formadmin-group">
                <label>Team and Specialities</label>
                <textarea
                  className="form-control"
                  value={teamAndSpecialities}
                  onChange={(e) => setTeamAndSpecialities(e.target.value)}
                  rows="3"
                />
              </div>
              <div className="formadmin-group">
                <label>
                  Location <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
              <div className="formadmin-group">
                <label>Accreditation and Awards</label>
                <textarea
                  className="form-control"
                  value={accreditationAndAwards}
                  onChange={(e) => setAccreditationAndAwards(e.target.value)}
                  rows="3"
                />
              </div>
              <div className="formadmin-group">
                <label>Phone</label>
                <input
                  type="text"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="formadmin-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="formadmin-group">
                <label>Contact Info</label>
                <input
                  type="text"
                  className="form-control"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                />
              </div>
              <div className="formadmin-group">
                <label>Map Location (Lat, Long)</label>
                <input
                  type="text"
                  className="form-control"
                  value={mapLocationLatLong}
                  onChange={(e) => setMapLocationLatLong(e.target.value)}
                  placeholder="e.g., 40.7128,-74.0060"
                />
              </div>
              <div className="formadmin-group">
                <label>Upload Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </div>
              <div className="formadmin-buttons">
                <button type="submit" className="btn btn-primary btn-sm me-2">
                  <FontAwesomeIcon icon={faSave} className="me-2" /> Add
                  Hospital
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => navigate("/admin/hospitals")}
                >
                  <FontAwesomeIcon icon={faTimes} className="me-2" /> Close
                </button>
              </div>
            </form>
          </div>
          {/* <div className="col-md-6 d-flex justify-content-center align-items-center">
          
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default AddHospitals;
