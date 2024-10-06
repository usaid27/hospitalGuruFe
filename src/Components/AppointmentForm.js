import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/AppointmentForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast

function AppointmentForm({ closeModal }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const [patientName, setPatientName] = useState("");
  const [patientNumber, setPatientNumber] = useState("");
  const [patientGender, setPatientGender] = useState("default");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [preferredMode, setPreferredMode] = useState("default");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    if (!patientName.trim()) {
      errors.patientName = "Patient name is required";
    } else if (patientName.trim().length < 8) {
      errors.patientName = "Patient name must be at least 8 characters";
    }

    if (!patientNumber.trim()) {
      errors.patientNumber = "Patient phone number is required";
    } else if (patientNumber.trim().length !== 10) {
      errors.patientNumber = "Patient phone number must be of 10 digits";
    }

    if (patientGender === "default") {
      errors.patientGender = "Please select patient gender";
    }
    if (!appointmentTime) {
      errors.appointmentTime = "Appointment time is required";
    } else {
      const selectedTime = new Date(appointmentTime).getTime();
      const currentTime = new Date().getTime();
      if (selectedTime <= currentTime) {
        errors.appointmentTime = "Please select a future appointment time";
      }
    }
    if (preferredMode === "default") {
      errors.preferredMode = "Please select preferred mode";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setPatientName("");
    setPatientNumber("");
    setPatientGender("default");
    setAppointmentTime("");
    setPreferredMode("default");
    setFormErrors({});

    toast.success("Appointment Scheduled!", {
      position: toast.POSITION.TOP_CENTER,
      onOpen: () => setIsSubmitted(true),
      onClose: () => setIsSubmitted(false),
    });
  };

  return (
    <div className="modal-Appointmentoverlay">
      <div className="modal-Appointmentcontainer">
        <img
          src={require("../Assets/icons8-close-window.gif")}
          alt="close"
          className="close-Appointmenticon"
          onClick={closeModal}
        />
        <div className="appointment-form-section">
          {/* <h1 className="legal-siteTitle">
            <Link to="/">Hospital Guru</Link>
          </h1> */}

          <div className="form-Appointmentcontainer">
            <h2 className="form-Appointmenttitle">
              <span className="rw-text-title">Book Appointment Online</span>
            </h2>

            <form className="form-Appointmentcontent">
              <div className="AppoinmentInputForm">
                <label>Patient Full Name:</label>
                <div className="AppointmentInputcontainer">
                  <input
                    type="text"
                    className="AppointmentInput"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                  />
                  {formErrors.patientName && (
                    <p className="error-message">{formErrors.patientName}</p>
                  )}
                </div>
              </div>
              <div className="AppoinmentInputForm">
                <label>Patient Phone Number:</label>
                <div className="AppointmentInputcontainer">

                <input
                  type="text"
                  className="AppointmentInput"
                  value={patientNumber}
                  onChange={(e) => setPatientNumber(e.target.value)}
                  required
                  />
              {formErrors.patientNumber && (
                <p className="error-message">{formErrors.patientNumber}</p>
              )}
              </div>
              </div>
              <div className="AppoinmentInputForm">
                <label>Patient Gender:</label>
                <div className="AppointmentInputcontainer">

                <select
                  value={patientGender}
                  className="AppointmentInput"
                  onChange={(e) => setPatientGender(e.target.value)}
                  required
                  >
                  <option value="default">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="private">I will inform Doctor only</option>
                </select>
              {formErrors.patientGender && (
                <p className="error-message">{formErrors.patientGender}</p>
              )}
              </div>
              </div>
              <div className="AppoinmentInputForm">
                <label>Preferred Appointment Time:</label>
                <div className="AppointmentInputcontainer">

                <input
                  type="datetime-local"
                  className="AppointmentInput"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  required
                  />
              {formErrors.appointmentTime && (
                <p className="error-message">{formErrors.appointmentTime}</p>
              )}
              </div>
              </div>
              <div className="AppoinmentInputForm">
                <label>Preferred Mode:</label>
                <div className="AppointmentInputcontainer">

                <select
                  value={preferredMode}
                  className="AppointmentInput"
                  onChange={(e) => setPreferredMode(e.target.value)}
                  required
                  >
                  <option value="default">Select</option>
                  <option value="voice">Voice Call</option>
                  <option value="video">Video Call</option>
                </select>
              {formErrors.preferredMode && (
                <p className="error-message">{formErrors.preferredMode}</p>
              )}
              </div>
              </div>
              <button type="button" className="Appointment-btn"onClick={handleSubmit}>
                Confirm Appointment
              </button>

              <p
                className="success-message"
                style={{ display: isSubmitted ? "block" : "none" }}
              >
                Appointment details have been sent to the patient's phone number
                via SMS.
              </p>
            </form>
          </div>

          <div className="legal-footer" style={{padding:"24px 40px 0px 40px"}}>
            <p>© 2013-2023 Health+. All rights reserved.</p>
          </div>
        </div>
        <ToastContainer autoClose={5000} limit={1} closeButton={false} />
      </div>
    </div>
  );
}

export default AppointmentForm;
