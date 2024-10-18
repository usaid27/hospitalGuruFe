import React, { useEffect, useState } from "react";
import "../../Styles/ProcedureModal.css"; // Assuming a new CSS file for the modal
import { baseUrl } from "../../Constants";
import axios from "axios";
import procedureImage from "../../Assets/Procedure.png";

const MedicalProcedureModal = ({ proceduredata, closeProcedureModal }) => {
  // const id = 1;
  const [ProcedureProfile, setProcedureProfile] = useState({});

  console.log(proceduredata);
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
      const response = await axios.get(
        `${baseUrl}/api/App/Procedure/${proceduredata.id}`
      );
      console.log(response);
      setProcedureProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const convertByteArrayToImage = (base64String) => {
    return base64String
      ? `data:image/jpeg;base64,${base64String}`
      : procedureImage;
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
          {ProcedureProfile.procedureName || "Procedure Name"}
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
              src={convertByteArrayToImage(ProcedureProfile.introductionMedia)}
              alt={ProcedureProfile.procedureName}
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
              {ProcedureProfile.procedureOverview ||
                "Description not available."}
            </p>
            <p>
              <strong>Duration:</strong>{" "}
              {ProcedureProfile.typicalDuration || "Duration not available."}
            </p>
          </div>
        </div>

        {/* Specialist Doctors */}
        <div className="modal-Proceduresection">
          <h3>Specialist Doctors</h3>
          <ul>
            {
              ProcedureProfile.procedureDoctorMapping?.length > 0
                ? ProcedureProfile.procedureDoctorMapping.map(
                    (doctor, index) => <li key={index}>{doctor}</li>
                  )
                : null
              // dummyDoctors.map((doctor, index) => (
              //     <li key={index}>{doctor}</li>
              //   ))
            }
          </ul>
        </div>

        {/* Hospitals */}
        <div className="modal-Proceduresection">
          <h3>Hospitals</h3>
          <ul>
            {
              ProcedureProfile.procedureHospitalMapping?.length > 0
                ? ProcedureProfile.procedureHospitalMapping.map(
                    (hospital, index) => <li key={index}>{hospital}</li>
                  )
                : null
              // dummyHospitals.map((hospital, index) => (
              //     <li key={index}>{hospital}</li>
              //   ))
            }
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
