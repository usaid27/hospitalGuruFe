import React from 'react';
import { Modal, Button, Row, Col, ListGroup } from 'react-bootstrap'; 
import procedureImage from '../../../Assets/Procedure.png';

function ProcedureDetailsDialog({ show, onClose, procedure }) {
    const convertByteArrayToImage = (base64String) => {
        return base64String
            ? `data:image/jpeg;base64,${base64String}`
            : procedureImage;
    };

    if (!procedure) {
        return null; // If no procedure is selected, return null
    }

    return (
      // <Modal show={show} onHide={onClose} size="lg" centered>
      //     <Modal.Header closeButton>
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
            Procedure Details
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
                src={convertByteArrayToImage(procedure.introductionMedia)}
                alt="Procedure Introduction"
                className="img-fluid rounded"
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
                <strong>{procedure.procedureName}</strong>
              </p>
            </div>
            <div className="modal-Procedureinfo">
              <p>
                <strong>Overview:</strong> {procedure.procedureOverview}
              </p>
            </div>
            <div className="modal-Procedureinfo">
              <p>
                <strong>Typical Duration:</strong>{" "}
                {procedure.typicalDuration || "N/A"}
              </p>
            </div>
            <div className="modal-Procedureinfo">
              <p>
                <strong>Recovery Time:</strong>{" "}
                {procedure.recoveryTime || "N/A"}
              </p>
            </div>
            <div className="modal-Proceduresection" style={{ marginTop: "0%" }}>
              <p>
                <strong>Success Rate:</strong>{" "}
                {procedure.successRate ? `${procedure.successRate}%` : "N/A"}
              </p>
            </div>
            <div className="modal-Proceduresection" style={{ marginTop: "0%" }}>
              <p>
                <strong>Causes:</strong> {procedure.causes || "N/A"}
              </p>
            </div>
            <div className="modal-Proceduresection" style={{ marginTop: "0%" }}>
              <p>
                <strong>Symptoms:</strong> {procedure.symptoms || "N/A"}
              </p>
            </div>
            <div className="modal-Proceduresection" style={{ marginTop: "0%" }}>
              <p>
                <strong>Diagnosis:</strong> {procedure.diagnosis || "N/A"}
              </p>
            </div>
            <div className="modal-Proceduresection" style={{ marginTop: "0%" }}>
              <p>
                <strong>Treatment Details:</strong>{" "}
                {procedure.treatmentDetails || "N/A"}
              </p>
            </div>
            {/* Reference Links */}
            <div className="modal-Proceduresection" style={{ marginTop: "0%" }}>
              <h3>Reference Links:</h3>
              {/* {procedure.referenceLinks.length > 0 ? ( */}
              {procedure.referenceLinks.map((ref, index) => (
                <>
                  <ul>
                    <li key={index}>
                      {ref.link ? (
                        <a
                          href={ref.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {ref.link}
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </li>
                  </ul>
                </>
              ))}

              {/* ) : (
                                <p>N/A</p>
                            )} */}
            </div>

            {/* Associated Doctors */}
            <div className="modal-Proceduresection" style={{ marginTop: "0%" }}>
              <h3>Associated Doctors:</h3>
              {/* {procedure.procedureDoctorMapping.length > 0 ? ( */}

              {procedure.procedureDoctorMapping.map((mapping, index) => (
                <ul>
                  <li key={index}>
                    {mapping.doctorName}{" "}
                    {/* Assuming doctorName is available */}
                  </li>
                </ul>
              ))}

              {/* ) : (
                                <p>N/A</p>
                            )} */}
            </div>

            {/* Associated Hospitals */}
            <div className="modal-Proceduresection" style={{ marginTop: "0%" }}>
              <h3>Associated Hospitals:</h3>
              {/* {procedure.procedureHospitalMapping.length > 0 ? (
                                // <ListGroup> */}
              {procedure.procedureHospitalMapping.map((mapping, index) => (
                <ul>
                  <li key={index}>
                    {mapping.hospitalName}{" "}
                    {/* Assuming hospitalName is available */}
                  </li>
                </ul>
              ))}
              {/* // </ListGroup>
                            ) : (
                                <p>N/A</p>
                            )} */}
            </div>

            {/* Social Links */}
            <div className="modal-Proceduresection" style={{ marginTop: "0%" }}>
              <h3>Social Links:</h3>
              {/* {procedure.socialLinks && procedure.socialLinks.length > 0 ? (
                                // <ListGroup> */}
              {procedure.socialLinks.map((link, index) => (
                <ul>
                  <li key={index}>
                    {link.platform && link.url ? (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.platform}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </li>
                </ul>
              ))}
              {/* // </ListGroup>
                            ) : (
                                <p>N/A</p>
                            )} */}
            </div>
          </div>
          {/* </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer> */}
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
        {/* </Modal.Footer> */}
      </div>
    );
}

export default ProcedureDetailsDialog;
