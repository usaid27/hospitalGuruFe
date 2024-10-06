import React, { useEffect } from "react";
import "../../Styles/ProcedureModal.css"; // Assuming a new CSS file for the modal
import { baseUrl } from "../../Constants";
import axios from "axios";

const MedicalProcedureModal = ({ proceduredata, closeProcedureModal }) => {
  const id = 1;

  const dummyDoctors = ["Dr. John Doe", "Dr. Sarah Connor", "Dr. James Smith"];
  const dummyHospitals = [
    "City Hospital",
    "National Medical Center",
    "Greenfield Hospital",
  ];

  useEffect(() => {
    getProcedureDetails();
  }, []);

  const getProcedureDetails = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/App/Procedure/${id}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal-Procedureoverlay">
      <div className="modal-Procedurecontainer">
        <img
          src={require("../../Assets/icons8-close-window.gif")}
          alt="close"
          className="close-icon"
          onClick={closeProcedureModal}
        />
        <h2
          className="rw-text-title"
          style={{
            textAlign: "center",
            fontSize: "28px",
            marginBottom: "20px",
            fontFamily: "Roboto ,sans-serif",
            color: "#333",
          }}
        >
          {proceduredata.name || "Procedure Name"}
        </h2>

        <div
          className="modal-Procedurebody"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div className="modal-Procedureimage">
            <img
              src={proceduredata.img}
              alt={proceduredata.name}
              style={{
                maxWidth: "150px",
                borderRadius: "10px",
                marginBottom: "20px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease",
              }}
            />
          </div>
          <div className="modal-Procedureinfo">
            <p>
              <strong>Description:</strong>{" "}
              {proceduredata.description || "Description not available."}
            </p>
            <p>
              <strong>Duration:</strong>{" "}
              {proceduredata.duration || "Duration not available."}
            </p>
          </div>
        </div>

        {/* Specialist Doctors */}
        <div className="modal-Proceduresection">
          <h3>Specialist Doctors</h3>
          <ul>
            {proceduredata.doctors?.length > 0
              ? proceduredata.doctors.map((doctor, index) => (
                  <li key={index}>{doctor}</li>
                ))
              : dummyDoctors.map((doctor, index) => (
                  <li key={index}>{doctor}</li>
                ))}
          </ul>
        </div>

        {/* Hospitals */}
        <div className="modal-Proceduresection">
          <h3>Hospitals</h3>
          <ul>
            {proceduredata.hospitals?.length > 0
              ? proceduredata.hospitals.map((hospital, index) => (
                  <li key={index}>{hospital}</li>
                ))
              : dummyHospitals.map((hospital, index) => (
                  <li key={index}>{hospital}</li>
                ))}
          </ul>
        </div>

        <button className="close-btn" onClick={closeProcedureModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default MedicalProcedureModal;
