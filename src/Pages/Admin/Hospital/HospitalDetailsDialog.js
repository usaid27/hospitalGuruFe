import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap'; 
import hospitalImage from '../../../Assets/hospital-icon.jpg';

function HospitalDetailsDialog({ show, onClose, hospital }) {
    const convertByteArrayToImage = (byteArray) => {
        return byteArray
            ? `data:image/jpeg;base64,${byteArray}`
            : hospitalImage;
    };

    console.log("Hospital Data: ", hospital);

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Hospital Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={4} className="text-center">
                        <img
                            src={convertByteArrayToImage(hospital.imageFile)} // Corrected property name
                            alt="Hospital"
                            className="img-fluid rounded-circle"
                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        />
                    </Col>
                    <Col md={8}>
                        <p><strong>ID:</strong> {hospital.id}</p>
                        <p><strong>Name:</strong> {hospital.name}</p> {/* Corrected property name */}
                        <p><strong>About:</strong> {hospital.about}</p> {/* Corrected property name */}
                        <p><strong>Location:</strong> {hospital.location}</p> {/* Corrected property name */}
                        <p><strong>Phone:</strong> {hospital.phone}</p> {/* Corrected property name */}
                        <p><strong>Email:</strong> {hospital.email}</p> {/* Corrected property name */}
                        <p><strong>Accreditation and Awards:</strong> {hospital.accreditationAndAwards}</p> {/* Added for additional information */}
                        <p><strong>Contact Info:</strong> {hospital.contactInfo}</p> {/* Added for additional information */}
                        <p><strong>Infrastructure:</strong> {hospital.infrastructure}</p> {/* Added for additional information */}
                        <p><strong>Specialties:</strong> {hospital.teamAndSpecialities}</p> {/* Added for additional information */}
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

export default HospitalDetailsDialog;
