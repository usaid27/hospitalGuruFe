import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { upsertDoctor } from "../../../Services/apiService"; // Import upsertDoctor from apiService
import doctorImage from "../../../Assets/doctor.png"; // Import default doctor image
import { useAuth } from "../../../contexts/AuthContext"; // Import useAuth from AuthContext
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import "../../../Styles/AddDoctor.css";

function AddDoctor() {
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(doctorImage); // Default preview image
  const [about, setAbout] = useState("");
  const [educationAndTraining, setEducationAndTraining] = useState("");
  const [experience, setExperience] = useState("");
  const [membership, setMembership] = useState("");
  const [accomplishmentOrAward, setAccomplishmentOrAward] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [fbLink, setFbLink] = useState("");
  const [linkedInLink, setLinkedInLink] = useState("");
  const [xLink, setXLink] = useState("");
  const [threadLink, setThreadLink] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth(); // Get current user's information

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !specialization) {
      toast.error("Please fill in all mandatory fields.");
      return;
    }

    const formData = new FormData();
    formData.append("id", "0"); // Append id with value 0
    formData.append("name", name);
    formData.append("specialization", specialization);
    formData.append("about", about); // Add about field
    formData.append("educationAndTraining", educationAndTraining); // Add education field
    formData.append("experience", experience); // Add experience field
    formData.append("membership", membership); // Add membership field
    formData.append("accomplishmentOrAward", accomplishmentOrAward); // Add accomplishment field
    formData.append("instagramLink", instagramLink); // Add Instagram link
    formData.append("fbLink", fbLink); // Add Facebook link
    formData.append("linkedInLink", linkedInLink); // Add LinkedIn link
    formData.append("xLink", xLink); // Add Twitter link
    formData.append("threadLink", threadLink); // Add Threads link
    formData.append("createdBy", user?.email || "default@example.com"); // Use the current user's email
    formData.append("modifiedBy", user?.email || "default@example.com"); // Use the current user's email
    formData.append("createdOn", new Date().toISOString()); // Current date and time
    formData.append("modifiedOn", new Date().toISOString()); // Current date and time
    if (image) formData.append("ImageFormFile", image); // Append image file

    try {
      // Send request to add doctor
      await upsertDoctor(formData);
      // Display success message
      toast.success("Doctor added successfully!");
      // Clear form data
      setName("");
      setSpecialization("");
      setAbout("");
      setEducationAndTraining("");
      setExperience("");
      setMembership("");
      setAccomplishmentOrAward("");
      setInstagramLink("");
      setFbLink("");
      setLinkedInLink("");
      setXLink("");
      setThreadLink("");
      setImage(null);
      setPreview(doctorImage); // Reset to default image
      navigate("/admin/doctors"); // Navigate after adding
    } catch (error) {
      // Display error message
      toast.error("Failed to add doctor.");
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
    // <div className="container mt-5 ">
    //     <div className="card shadow-lg p-4">
    //         <div className="row">
    //             <div className="col-md-6">
    //                 <h2 className="mb-4">Add Doctor</h2>
    //                 <form onSubmit={handleSubmit}>
    //                     <div className="formadmin-group mb-3">
    //                         <label>Name <span className="text-danger">*</span></label>
    //                         <input
    //                             type="text"
    //                             className="form-control"
    //                             value={name}
    //                             onChange={(e) => setName(e.target.value)}
    //                             required
    //                         />
    //                     </div>
    //                     <div className="formadmin-group mb-3">
    //                         <label>Specialization <span className="text-danger">*</span></label>
    //                         <input
    //                             type="text"
    //                             className="form-control"
    //                             value={specialization}
    //                             onChange={(e) => setSpecialization(e.target.value)}
    //                             required
    //                         />
    //                     </div>
    //                     <div className="formadmin-group mb-3">
    //                         <label>About</label>
    //                         <textarea
    //                             className="form-control"
    //                             value={about}
    //                             onChange={(e) => setAbout(e.target.value)}
    //                         />
    //                     </div>
    //                     <div className="formadmin-group mb-3">
    //                         <label>Education and Training</label>
    //                         <textarea
    //                             className="form-control"
    //                             value={educationAndTraining}
    //                             onChange={(e) => setEducationAndTraining(e.target.value)}
    //                         />
    //                     </div>
    //                     <div className="formadmin-group mb-3">
    //                         <label>Experience</label>
    //                         <textarea
    //                             className="form-control"
    //                             value={experience}
    //                             onChange={(e) => setExperience(e.target.value)}
    //                         />
    //                     </div>
    //                     <div className="formadmin-group mb-3">
    //                         <label>Membership</label>
    //                         <input
    //                             type="text"
    //                             className="form-control"
    //                             value={membership}
    //                             onChange={(e) => setMembership(e.target.value)}
    //                         />
    //                     </div>
    //                     <div className="formadmin-group mb-3">
    //                         <label>Accomplishments or Awards</label>
    //                         <input
    //                             type="text"
    //                             className="form-control"
    //                             value={accomplishmentOrAward}
    //                             onChange={(e) => setAccomplishmentOrAward(e.target.value)}
    //                         />
    //                     </div>
    //                     <div className="formadmin-group mb-3">
    //                         <label>Instagram Link</label>
    //                         <input
    //                             type="url"
    //                             className="form-control"
    //                             value={instagramLink}
    //                             onChange={(e) => setInstagramLink(e.target.value)}
    //                         />
    //                     </div>
    //                     <div className="formadmin-group mb-3">
    //                         <label>Facebook Link</label>
    //                         <input
    //                             type="url"
    //                             className="form-control"
    //                             value={fbLink}
    //                             onChange={(e) => setFbLink(e.target.value)}
    //                         />
    //                     </div>
    //                     <div className="formadmin-group mb-3">
    //                         <label>LinkedIn Link</label>
    //                         <input
    //                             type="url"
    //                             className="form-control"
    //                             value={linkedInLink}
    //                             onChange={(e) => setLinkedInLink(e.target.value)}
    //                         />
    //                     </div>
    //                     <div className="formadmin-group mb-3">
    //                         <label>Twitter Link (X Link)</label>
    //                         <input
    //                             type="url"
    //                             className="form-control"
    //                             value={xLink}
    //                             onChange={(e) => setXLink(e.target.value)}
    //                         />
    //                     </div>
    //                     <div className="formadmin-group mb-3">
    //                         <label>Threads Link</label>
    //                         <input
    //                             type="url"
    //                             className="form-control"
    //                             value={threadLink}
    //                             onChange={(e) => setThreadLink(e.target.value)}
    //                         />
    //                     </div>
    //                     <div className="formadmin-group mb-3">
    //                         <label>Upload Image</label>
    //                         <input
    //                             type="file"
    //                             className="form-control"
    //                             onChange={handleImageChange}
    //                         />
    //                     </div>
    //                     <div className="form-group mb-3 d-flex">
    //                         <button type="submit" className="btn btn-primary btn-sm me-2">
    //                             <FontAwesomeIcon icon={faSave} className="me-2" /> Add Doctor
    //                         </button>
    //                         <button
    //                             type="button"
    //                             className="btn btn-secondary btn-sm"
    //                             onClick={() => navigate('/admin/doctors')}
    //                         >
    //                             <FontAwesomeIcon icon={faTimes} className="me-2" /> Close
    //                         </button>
    //                     </div>
    //                 </form>
    //             </div>
    //             <div className="col-md-6 d-flex justify-content-center align-items-center">
    //                 <div className="image-preview-frame">
    //                     <img
    //                         src={preview}
    //                         alt="Doctor Preview"
    //                         className="img-fluid shadow"
    //                         style={{
    //                             width: '300px',
    //                             height: '300px',
    //                             objectFit: 'cover',
    //                             borderRadius: '10px',
    //                             border: '2px solid #ddd'
    //                         }}
    //                     />
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </div>
    <div className="doctoradmin-form-container">
      <div className="doctoradmin-card">
      <h2 className="animatedadmin-title">Add Doctor</h2>
        <div className="doctoradmin-card-content">
            {/* Image Preview */}
          <div className="image-preview">
            <img src={preview} alt="Doctor Preview" className="preview-img" />
          </div>

          <div className="formadmin-section">
            <form onSubmit={handleSubmit} className="formadmin-fields">
              {/* Name Field */}
              <div className="formadmin-group">
                <label style={{width:"80%"}}>
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

              {/* Specialization */}
              <div className="formadmin-group mb-3">
                <label style={{width:"80%"}}>
                  Specialization <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  required
                />
              </div>
              <div className="formadmin-group mb-3">
                <label style={{width:"80%"}}>About</label>
                <textarea
                  className="form-control"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>
              <div className="formadmin-group mb-3">
                <label style={{width:"80%"}}>Education and Training</label>
                <textarea
                  className="form-control"
                  value={educationAndTraining}
                  onChange={(e) => setEducationAndTraining(e.target.value)}
                />
              </div>
              <div className="formadmin-group mb-3">
                <label style={{width:"80%"}}>Experience</label>
                <textarea
                  className="form-control"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
              </div>
              <div className="formadmin-group mb-3">
                <label style={{width:"80%"}}>Membership</label>
                <input
                  type="text"
                  className="form-control"
                  value={membership}
                  onChange={(e) => setMembership(e.target.value)}
                />
              </div>
              <div className="formadmin-group mb-3">
                <label style={{width:"80%"}}>Accomplishments or Awards</label>
                <input
                  type="text"
                  className="form-control"
                  value={accomplishmentOrAward}
                  onChange={(e) => setAccomplishmentOrAward(e.target.value)}
                />
              </div>
              <div className="formadmin-group mb-3">
                <label style={{width:"80%"}}>Instagram Link</label>
                <input
                  type="url"
                  className="form-control"
                  value={instagramLink}
                  onChange={(e) => setInstagramLink(e.target.value)}
                />
              </div>
              <div className="formadmin-group mb-3">
                <label style={{width:"80%"}}>Facebook Link</label>
                <input
                  type="url"
                  className="form-control"
                  value={fbLink}
                  onChange={(e) => setFbLink(e.target.value)}
                />
              </div>
              <div className="formadmin-group mb-3">
                <label style={{width:"80%"}}>LinkedIn Link</label>
                <input
                  type="url"
                  className="form-control"
                  value={linkedInLink}
                  onChange={(e) => setLinkedInLink(e.target.value)}
                />
              </div>
              <div className="formadmin-group mb-3">
                <label style={{width:"80%"}}>Twitter Link (X Link)</label>
                <input
                  type="url"
                  className="form-control"
                  value={xLink}
                  onChange={(e) => setXLink(e.target.value)}
                />
              </div>
              <div className="formadmin-group mb-3">
                <label style={{width:"80%"}}>Threads Link</label>
                <input
                  type="url"
                  className="form-control"
                  value={threadLink}
                  onChange={(e) => setThreadLink(e.target.value)}
                />
              </div>

              {/* Image Upload */}
              <div className="formadmin-group">
                <label style={{width:"80%"}}>Upload Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleImageChange}
                />
              </div>

              {/* Action Buttons */}
              <div className="formadmin-buttons">
                <button type="submit" className="btn btn-primary" style={{padding:"8px 16px"}}>
                  <FontAwesomeIcon icon={faSave} className="me-2" /> Add Doctor
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/admin/doctors")}
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

export default AddDoctor;
