import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHospitalById, upserthospital } from "../../../Services/apiService"; // Corrected import
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import hospitalImage from "../../../Assets/hospital-icon.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../contexts/AuthContext";

function EditHospitalPage() {
  const { id } = useParams();
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
  const [preview, setPreview] = useState(hospitalImage);
  const [existingImage, setExistingImage] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth(); // Get current user's information

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const data = await getHospitalById(id);

        // Set image preview
        if (data.imageFile) {
          setExistingImage(data.imageFile); // Store the existing image URL or data
          // Assuming data.imageFile is a base64 string or a URL
          setPreview(
            data.imageFile.startsWith("data:image")
              ? data.imageFile
              : `data:image/png;base64,${data.imageFile}`
          );
        } else {
          setPreview(hospitalImage);
        }

        // Set other fields
        setName(data.name || "");
        setAbout(data.about || "");
        setInfrastructure(data.infrastructure || "");
        setTeamAndSpecialities(data.teamAndSpecialities || "");
        setLocation(data.location || "");
        setAccreditationAndAwards(data.accreditationAndAwards || "");
        setPhone(data.phone || "");
        setEmail(data.email || "");
        setContactInfo(data.contactInfo || "");
        setMapLocationLatLong(data.mapLocationLatLong || "");
      } catch (error) {
        console.error("Error fetching hospital", error);
        toast.error("Failed to fetch hospital details.");
      }
    };

    fetchHospital();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate mandatory fields
    if (!name || !location) {
      toast.error("Please fill in all mandatory fields.");
      return;
    }

    const formData = new FormData();
    formData.append("id", id);
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
    formData.append("createdBy", user?.email || "default@example.com"); // Use the current user's email
    formData.append("modifiedBy", user?.email || "default@example.com"); // Use the current user's email
    formData.append("createdOn", new Date().toISOString()); // Current date and time
    formData.append("modifiedOn", new Date().toISOString()); // Current date and time

    // Include new image if provided
    if (image) {
      formData.append("ImageFile", image);
    } else if (existingImage) {
      // If no new image is uploaded, retain the existing image
      formData.append("ImageFile", existingImage);
    }

    try {
      await upserthospital(formData); // Use the corrected function name
      toast.success("Hospital updated successfully!");
      // Optionally, you can reset the form or keep the data as is
      navigate("/admin/hospitals"); // Navigate after update
    } catch (error) {
      console.error("Error updating hospital:", error);
      toast.error("Failed to update hospital.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="doctoradmin-form-container">
      <div className="doctoradmin-card">
        <h2 className="animatedadmin-title">Edit Hospital</h2>
        <div className="doctoradmin-card-content">
          <div className="image-preview">
            <img
              src={preview}
              alt="Hospital Preview"
              className="preview-img"
              // style={{
              //     width: '300px',
              //     height: '300px',
              //     objectFit: 'cover',
              //     borderRadius: '10px',
              //     border: '2px solid #ddd'
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
                  type="tel"
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
                  <FontAwesomeIcon icon={faSave} className="me-2" /> Update
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
        </div>
      </div>
    </div>
  );
}

export default EditHospitalPage;
