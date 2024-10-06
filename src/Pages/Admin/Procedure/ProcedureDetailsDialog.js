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
        <Modal show={show} onHide={onClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Procedure Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={4} className="text-center">
                        <img
                            src={convertByteArrayToImage(procedure.introductionMedia)}
                            alt="Procedure Introduction"
                            className="img-fluid rounded"
                            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                        />
                    </Col>
                    <Col md={8}>
                        <h4>{procedure.procedureName}</h4>
                        <p><strong>Overview:</strong> {procedure.procedureOverview}</p>
                        <p><strong>Typical Duration:</strong> {procedure.typicalDuration || 'N/A'}</p>
                        <p><strong>Recovery Time:</strong> {procedure.recoveryTime || 'N/A'}</p>
                        <p><strong>Success Rate:</strong> {procedure.successRate ? `${procedure.successRate}%` : 'N/A'}</p>
                        <p><strong>Causes:</strong> {procedure.causes || 'N/A'}</p>
                        <p><strong>Symptoms:</strong> {procedure.symptoms || 'N/A'}</p>
                        <p><strong>Diagnosis:</strong> {procedure.diagnosis || 'N/A'}</p>
                        <p><strong>Treatment Details:</strong> {procedure.treatmentDetails || 'N/A'}</p>

                        {/* Reference Links */}
                        <div className="mt-3">
                            <strong>Reference Links:</strong>
                            {procedure.referenceLinks.length > 0 ? (
                                <ListGroup>
                                    {procedure.referenceLinks.map((ref, index) => (
                                        <ListGroup.Item key={index}>
                                            {ref.link ? (
                                                <a href={ref.link} target="_blank" rel="noopener noreferrer">{ref.link}</a>
                                            ) : (
                                                'N/A'
                                            )}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            ) : (
                                <p>N/A</p>
                            )}
                        </div>

                        {/* Associated Doctors */}
                        <div className="mt-3">
                            <strong>Associated Doctors:</strong>
                            {procedure.procedureDoctorMapping.length > 0 ? (
                                <ListGroup>
                                    {procedure.procedureDoctorMapping.map((mapping, index) => (
                                        <ListGroup.Item key={index}>
                                            {mapping.doctorName} {/* Assuming doctorName is available */}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            ) : (
                                <p>N/A</p>
                            )}
                        </div>

                        {/* Associated Hospitals */}
                        <div className="mt-3">
                            <strong>Associated Hospitals:</strong>
                            {procedure.procedureHospitalMapping.length > 0 ? (
                                <ListGroup>
                                    {procedure.procedureHospitalMapping.map((mapping, index) => (
                                        <ListGroup.Item key={index}>
                                            {mapping.hospitalName} {/* Assuming hospitalName is available */}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            ) : (
                                <p>N/A</p>
                            )}
                        </div>

                        {/* Social Links */}
                        <div className="mt-3">
                            <strong>Social Links:</strong>
                            {procedure.socialLinks && procedure.socialLinks.length > 0 ? (
                                <ListGroup>
                                    {procedure.socialLinks.map((link, index) => (
                                        <ListGroup.Item key={index}>
                                            {link.platform && link.url ? (
                                                <a href={link.url} target="_blank" rel="noopener noreferrer">
                                                    {link.platform}
                                                </a>
                                            ) : (
                                                'N/A'
                                            )}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            ) : (
                                <p>N/A</p>
                            )}
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ProcedureDetailsDialog;
