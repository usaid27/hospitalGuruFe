import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import hospitalImage from "../../../Assets/hospital-icon.jpg";

function HospitalDetailsDialog({ show, onClose, hospital }) {
  const convertByteArrayToImage = (byteArray) => {
    return byteArray ? `data:image/jpeg;base64,${byteArray}` : hospitalImage;
  };

  console.log("Hospital Data: ", hospital);
  if (!show) return null;

  return (
    <div className="modal-Procedureoverlay" style={{ top: "3%", left: "7%" }}>
      <div
        className="modal-Procedurecontainer"
        style={{ height: "80vh", maxHeight: "80vh", overflowY: "scroll" }}
      >
        <img
          src={require("../../../Assets/icons8-close-window.gif")}
          alt="close"
          className="close-icon"
          onClick={onClose}
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
          Hospital Details
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
              src={convertByteArrayToImage(hospital.imageFile)} // Corrected property name
              alt="Hospital"
              // className="img-fluid rounded-circle"
              style={{
                // width: '150px', height: '150px', objectFit: 'cover'
                maxWidth: "150px",
                borderRadius: "10px",
                marginBottom: "20px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease",
              }}
            />
          </div>
          {/* </Col>
                    <Col md={8}> */}
          {/* <div className="modal-Procedureinfo">
                        <p><strong>ID:</strong> {hospital.id}</p>
                    </div> */}
          <div className="modal-Procedureinfo">
            <p>
              <strong>Name:</strong> {hospital.name}
            </p>{" "}
            {/* Corrected property name */}
          </div>
          <div className="modal-Procedureinfo">
            <p>
              <strong>About:</strong> {hospital.about}
            </p>{" "}
            {/* Corrected property name */}
          </div>
          <div className="modal-Procedureinfo">
            <p>
              <strong>Location:</strong> {hospital.location}
            </p>{" "}
            {/* Corrected property name */}
          </div>
          <div className="modal-Procedureinfo">
            <p>
              <strong>Phone:</strong> {hospital.phone}
            </p>{" "}
            {/* Corrected property name */}
          </div>
          <div className="modal-Procedureinfo">
            <p>
              <strong>Email:</strong> {hospital.email}
            </p>{" "}
            {/* Corrected property name */}
          </div>
          <div className="modal-Proceduresection" style={{ marginTop: "0%" }}>
            <h3>Accreditation and Awards:</h3>
            <ul>
              <li>{hospital.accreditationAndAwards}</li>
            </ul>
            {/* Added for additional information */}
          </div>
          <div className="modal-Proceduresection" style={{ marginTop: "0%" }}>
            <h3>Contact Info:</h3>
            <ul>
              <li>{hospital.contactInfo}</li>
            </ul>{" "}
            {/* Added for additional information */}
          </div>
          <div className="modal-Proceduresection" style={{ marginTop: "0%" }}>
            <h3>Infrastructure:</h3>
            <ul>
              <li>{hospital.infrastructure}</li>
            </ul>
            {/* Added for additional information */}
          </div>
          <div className="modal-Proceduresection" style={{ marginTop: "0%" }}>
            <h3>Specialties:</h3>
            <ul>
              <li>{hospital.teamAndSpecialities}</li>
            </ul>
            {/* Added for additional information */}
          </div>
        </div>

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default HospitalDetailsDialog;
