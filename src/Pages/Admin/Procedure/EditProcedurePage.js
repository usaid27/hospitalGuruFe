// EditProcedurePage.js
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProcedureById,
  upsertProcedure,
  getAllDoctors,
  getAllHospitals,
} from "../../../Services/apiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import procedureImage from "../../../Assets/Procedure.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Select from "react-select"; // Import react-select

function EditProcedurePage() {
  const { id } = useParams();
  const [procedureName, setProcedureName] = useState("");
  const [introductionMedia, setIntroductionMedia] = useState(null);
  const [procedureOverview, setProcedureOverview] = useState("");
  const [typicalDuration, setTypicalDuration] = useState("");
  const [recoveryTime, setRecoveryTime] = useState("");
  const [successRate, setSuccessRate] = useState("");
  const [causes, setCauses] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatmentDetails, setTreatmentDetails] = useState("");
  const [referenceLinks, setReferenceLinks] = useState([""]);
  const [selectedDoctors, setSelectedDoctors] = useState([]);
  const [selectedHospitals, setSelectedHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [preview, setPreview] = useState(procedureImage); // Default preview image
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all doctors and hospitals for dropdowns
    const fetchData = async () => {
      try {
        const doctorsData = await getAllDoctors();
        setDoctors(doctorsData);
        const hospitalsData = await getAllHospitals();
        setHospitals(hospitalsData);
      } catch (error) {
        toast.error("Error fetching doctors or hospitals.");
      }
    };
    fetchData();
  }, []);

  // Fetch procedure details
  useEffect(() => {
    const fetchProcedure = async () => {
      try {
        const data = await getProcedureById(id);
        setProcedureName(data.procedureName);
        setProcedureOverview(data.procedureOverview);
        setTypicalDuration(data.typicalDuration || "");
        setRecoveryTime(data.recoveryTime || "");
        setSuccessRate(data.successRate || "");
        setCauses(data.causes || "");
        setSymptoms(data.symptoms || "");
        setDiagnosis(data.diagnosis || "");
        setTreatmentDetails(data.treatmentDetails || "");
        setReferenceLinks(
          data.referenceLinks.length > 0
            ? data.referenceLinks.map((link) => link.link)
            : [""]
        );
        setSelectedDoctors(
          data.procedureDoctorMapping.map((mapping) => ({
            value: mapping.doctorId,
            label: mapping.doctorName, // Ensure doctorName is available
          }))
        );
        setSelectedHospitals(
          data.procedureHospitalMapping.map((mapping) => ({
            value: mapping.hospitalId,
            label: mapping.hospitalName, // Ensure hospitalName is available
          }))
        );
        if (data.introductionMedia) {
          setPreview(
            data.introductionMedia.startsWith("data:image")
              ? data.introductionMedia
              : `data:image/png;base64,${data.introductionMedia}`
          );
        } else {
          setPreview(procedureImage);
        }
      } catch (error) {
        console.error("Error fetching procedure", error);
        toast.error("Error fetching procedure details.");
      }
    };

    fetchProcedure();
  }, [id]);

  // Transform doctors and hospitals data for react-select
  const doctorOptions = doctors.map((doctor) => ({
    value: doctor.id,
    label: doctor.name,
  }));

  const hospitalOptions = hospitals.map((hospital) => ({
    value: hospital.id,
    label: hospital.name,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!procedureName || !procedureOverview) {
      toast.error("Please fill in all mandatory fields.");
      return;
    }

    const formData = new FormData();
    formData.append("id", id); // Include the procedure ID
    formData.append("ProcedureName", procedureName);
    formData.append("ProcedureOverview", procedureOverview);
    formData.append("TypicalDuration", typicalDuration);
    formData.append("RecoveryTime", recoveryTime);
    formData.append("SuccessRate", successRate);
    formData.append("Causes", causes);
    formData.append("Symptoms", symptoms);
    formData.append("Diagnosis", diagnosis);
    formData.append("TreatmentDetails", treatmentDetails);
    formData.append("CreatedBy", "default@example.com"); // Replace with actual user info
    formData.append("ModifiedBy", "default@example.com"); // Replace with actual user info
    formData.append("CreatedOn", new Date().toISOString());
    formData.append("ModifiedOn", new Date().toISOString());

    // Append introduction media file if updated
    if (introductionMedia) {
      formData.append("ImageFormFile", introductionMedia);
    }

    // Append Reference Links
    referenceLinks.forEach((link, index) => {
      if (link) {
        formData.append(`ReferenceLinks[${index}].Link`, link);
      }
    });

    // Append ProcedureDoctorMapping
    selectedDoctors.forEach((doctor, index) => {
      formData.append(
        `ProcedureDoctorMapping[${index}].DoctorId`,
        doctor.value
      );
    });

    // Append ProcedureHospitalMapping
    selectedHospitals.forEach((hospital, index) => {
      formData.append(
        `ProcedureHospitalMapping[${index}].HospitalId`,
        hospital.value
      );
    });

    try {
      await upsertProcedure(formData);
      toast.success("Procedure updated successfully!");
      navigate("/admin/procedures");
    } catch (error) {
      toast.error("Failed to update procedure.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIntroductionMedia(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleReferenceLinkChange = (index, value) => {
    const newLinks = [...referenceLinks];
    newLinks[index] = value;
    setReferenceLinks(newLinks);
  };

  const addReferenceLink = () => {
    setReferenceLinks([...referenceLinks, ""]);
  };

  const removeReferenceLink = (index) => {
    const newLinks = referenceLinks.filter((_, i) => i !== index);
    setReferenceLinks(newLinks);
  };

  return (
    <div className="doctoradmin-form-container">
      <div className="doctoradmin-card">
        <h2 className="animatedadmin-title">Edit Procedure</h2>

        <div className="doctoradmin-card-content">
          <div className="image-preview">
            <img
              src={preview}
              alt="Introduction Media Preview"
              // className="img-fluid shadow"
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
              {/* Procedure Name */}
              <div className="formadmin-group">
                <label style={{ width: "80%" }}>
                  Procedure Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={procedureName}
                  onChange={(e) => setProcedureName(e.target.value)}
                  required
                />
              </div>

              {/* Introduction Media */}
              <div className="formadmin-group mb-3">
                <label>Introduction Media</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleImageChange}
                  accept="image/*,video/*" // Adjust as needed
                />
              </div>

              {/* Procedure Overview */}
              <div className="formadmin-group mb-3">
                <label>
                  Procedure Overview <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  value={procedureOverview}
                  onChange={(e) => setProcedureOverview(e.target.value)}
                  required
                />
              </div>

              {/* Typical Duration */}
              <div className="formadmin-group mb-3">
                <label>Typical Duration</label>
                <input
                  type="text"
                  className="form-control"
                  value={typicalDuration}
                  onChange={(e) => setTypicalDuration(e.target.value)}
                />
              </div>

              {/* Recovery Time */}
              <div className="formadmin-group mb-3">
                <label>Recovery Time</label>
                <input
                  type="text"
                  className="form-control"
                  value={recoveryTime}
                  onChange={(e) => setRecoveryTime(e.target.value)}
                />
              </div>

              {/* Success Rate */}
              <div className="formadmin-group mb-3">
                <label>Success Rate (%)</label>
                <input
                  type="number"
                  className="form-control"
                  value={successRate}
                  onChange={(e) => setSuccessRate(e.target.value)}
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>

              {/* Causes */}
              <div className="formadmin-group mb-3">
                <label>Causes</label>
                <textarea
                  className="form-control"
                  value={causes}
                  onChange={(e) => setCauses(e.target.value)}
                />
              </div>

              {/* Symptoms */}
              <div className="formadmin-group mb-3">
                <label>Symptoms</label>
                <textarea
                  className="form-control"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                />
              </div>

              {/* Diagnosis */}
              <div className="formadmin-group mb-3">
                <label>Diagnosis</label>
                <textarea
                  className="form-control"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                />
              </div>

              {/* Treatment Details */}
              <div className="formadmin-group mb-3">
                <label>Treatment Details</label>
                <textarea
                  className="form-control"
                  value={treatmentDetails}
                  onChange={(e) => setTreatmentDetails(e.target.value)}
                />
              </div>

              {/* Reference Links */}
              <div className="formadmin-group mb-3">
                <label>Reference Links</label>
                {referenceLinks.map((link, index) => (
                  <div key={index} className="d-flex mb-2">
                    <input
                      type="url"
                      className="form-control me-2"
                      value={link}
                      onChange={(e) =>
                        handleReferenceLinkChange(index, e.target.value)
                      }
                      placeholder="https://example.com"
                    />
                    {referenceLinks.length > 1 && (
                      <Button
                        variant="danger"
                        onClick={() => removeReferenceLink(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="secondary" onClick={addReferenceLink}>
                  Add Reference Link
                </Button>
              </div>

              {/* Select Doctors - Searchable Multi-Select */}
              <div className="formadmin-group mb-3">
                <label>Select Doctors</label>
                <Select
                  isMulti
                  name="doctors"
                  options={doctorOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  value={selectedDoctors}
                  onChange={setSelectedDoctors}
                  placeholder="Select Doctors..."
                />
              </div>

              {/* Select Hospitals - Searchable Multi-Select */}
              <div className="formadmin-group mb-3">
                <label>Select Hospitals</label>
                <Select
                  isMulti
                  name="hospitals"
                  options={hospitalOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  value={selectedHospitals}
                  onChange={setSelectedHospitals}
                  placeholder="Select Hospitals..."
                />
              </div>

              {/* Submit and Close Buttons */}
              <div className="form-group mb-3 d-flex">
                <Button type="submit" variant="primary" className="me-2">
                  <FontAwesomeIcon icon={faSave} className="me-2" /> Update
                  Procedure
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate("/admin/procedures")}
                >
                  <FontAwesomeIcon icon={faTimes} className="me-2" /> Close
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProcedurePage;
