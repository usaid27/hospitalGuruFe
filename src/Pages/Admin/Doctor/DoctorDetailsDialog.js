import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import doctorImage from "../../../Assets/doctor.png";

function DoctorDetailsDialog({ show, onClose, doctor }) {
  const convertByteArrayToImage = (byteArray) => {
    return byteArray ? `data:image/jpeg;base64,${byteArray}` : doctorImage;
  };

  if (!show) return null; 

  return (
    // <Modal show={show} onHide={onClose} centered>
    <div className="modal-Procedureoverlay" style={{ top: "3%", left: "7%" }}>
      {/* <Modal.Header closeButton> */}
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
        {/* <Modal.Title>Doctor Details</Modal.Title> */}
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
          Doctor Details
        </h2>
        {/* </Modal.Header> */}
        {/* <Modal.Body> */}
        <div
          className="modal-Procedurebody"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* <Row> */}
          {/* <Col md={2} className="text-center">
            <img
              src={convertByteArrayToImage(doctor.image)}
              alt="Doctor"
              className="img-fluid rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          </Col> */}
          <div className="modal-Procedureimage">
            <img
              src={convertByteArrayToImage(doctor.image)}
              alt="Doctor"
              style={{
                maxWidth: "150px",
                borderRadius: "10px",
                marginBottom: "20px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease",
              }}
            />
          </div>
          {/* <Col md={8}> */}
          <div className="modal-Procedureinfo">
            {/* <p>
              <strong>ID:</strong> {doctor.id}
            </p> */}
            <p>
              <strong>Name:</strong> {doctor.name}
            </p>

            <p>
              <strong>About:</strong> {doctor.about}
            </p>
          </div>
          <div className="modal-Proceduresection" style={{marginTop:"0%"}}>
            {/* <p> */}
            <h3>Specialization:</h3>
            <ul>
              <li>{doctor.specialization}</li>
            </ul>
            {/* </p> */}
          </div>
          {/* <p>
            <strong>Education & Training:</strong> {doctor.educationAndTraining}
          </p> */}
          <div className="modal-Proceduresection" style={{marginTop:"0%"}}>
            {/* <p> */}
            <h3>Education & Training:</h3>
            <ul>
              <li>{doctor.educationAndTraining}</li>
            </ul>
            {/* </p> */}
          </div>
          {/* <p>
            <strong>Experience:</strong> {doctor.experience}
          </p> */}
          <div className="modal-Proceduresection" style={{marginTop:"0%"}}>
            {/* <p> */}
            <h3>Experience:</h3>
            <ul>
              <li>{doctor.experience}</li>
            </ul>
            {/* </p> */}
          </div>
          {/* <p>
            <strong>Membership:</strong> {doctor.membership}
          </p> */}
          <div className="modal-Proceduresection" style={{marginTop:"0%"}}>
            {/* <p> */}
            <h3>Membership:</h3>
            <ul>
              <li>{doctor.membership}</li>
            </ul>
            {/* </p> */}
          </div>
          {/* <p>
            <strong>Awards:</strong> {doctor.accomplishmentOrAward}
          </p> */}
          <div className="modal-Proceduresection" style={{marginTop:"0%"}}>
            {/* <p> */}
            <h3>Awards:</h3>
            <ul>
              <li>{doctor.accomplishmentOrAward}</li>
            </ul>
            {/* </p> */}
          </div>
          <div className="modal-Proceduresection" style={{marginTop:"0%"}}>
            <h3>Social Links:</h3>
            <ul>
              <li>
                <a
                  href={doctor.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={doctor.fbLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={doctor.linkedInLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={doctor.xLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href={doctor.threadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Threads
                </a>
              </li>
            </ul>
          </div>
          {/* </Col> */}
          {/* </Row> */}
          {/* </Modal.Body> */}
        </div>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer> */}
         <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
      {/* </Modal> */}
    </div>
  );
}

export default DoctorDetailsDialog;
