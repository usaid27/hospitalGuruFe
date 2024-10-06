import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap'; 
import doctorImage from '../../../Assets/doctor.png';

function DoctorDetailsDialog({ show, onClose, doctor }) {
    const convertByteArrayToImage = (byteArray) => {
        return byteArray
            ? `data:image/jpeg;base64,${byteArray}`
            : doctorImage;
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Doctor Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={4} className="text-center">
                        <img
                            src={convertByteArrayToImage(doctor.image)}
                            alt="Doctor"
                            className="img-fluid rounded-circle"
                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        />
                    </Col>
                    <Col md={8}>
                        <p><strong>ID:</strong> {doctor.id}</p>
                        <p><strong>Name:</strong> {doctor.name}</p>
                        <p><strong>Specialization:</strong> {doctor.specialization}</p>
                        <p><strong>About:</strong> {doctor.about}</p>
                        <p><strong>Education & Training:</strong> {doctor.educationAndTraining}</p>
                        <p><strong>Experience:</strong> {doctor.experience}</p>
                        <p><strong>Membership:</strong> {doctor.membership}</p>
                        <p><strong>Awards:</strong> {doctor.accomplishmentOrAward}</p>
                        <div>
                            <strong>Social Links:</strong>
                            <ul>
                                <li><a href={doctor.instagramLink} target="_blank" rel="noopener noreferrer">Instagram</a></li>
                                <li><a href={doctor.fbLink} target="_blank" rel="noopener noreferrer">Facebook</a></li>
                                <li><a href={doctor.linkedInLink} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                                <li><a href={doctor.xLink} target="_blank" rel="noopener noreferrer">Twitter</a></li>
                                <li><a href={doctor.threadLink} target="_blank" rel="noopener noreferrer">Threads</a></li>
                            </ul>
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

export default DoctorDetailsDialog;
