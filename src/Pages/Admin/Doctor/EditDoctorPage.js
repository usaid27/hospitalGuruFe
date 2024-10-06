import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDoctorById, upsertDoctor } from '../../../Services/apiService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import doctorImage from '../../../Assets/doctor.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../contexts/AuthContext';

function EditDoctorPage() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [about, setAbout] = useState('');
    const [educationAndTraining, setEducationAndTraining] = useState('');
    const [experience, setExperience] = useState('');
    const [membership, setMembership] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(doctorImage);
    const [existingImage, setExistingImage] = useState(null);
    const navigate = useNavigate();
    const { user } = useAuth(); // Get current user's information

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const data = await getDoctorById(id);
                if (data.image) {
                    setExistingImage(data.image); // Store the existing image URL or data
                    setPreview(data.image.startsWith('data:image') ? data.image : `data:image/png;base64,${data.image}`);
                } else {
                    setPreview(doctorImage);
                }
                setName(data.name);
                setSpecialization(data.specialization);
                setAbout(data.about);
                setEducationAndTraining(data.educationAndTraining);
                setExperience(data.experience);
                setMembership(data.membership);
            } catch (error) {
                console.error('Error fetching doctor', error);
            }
        };

        fetchDoctor();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !specialization) {
            toast.error('Please fill in all mandatory fields.');
            return;
        }

        const formData = new FormData();
        formData.append('id', id); // Include the doctor ID
        formData.append('name', name);
        formData.append('specialization', specialization);
        formData.append('about', about);
        formData.append('educationAndTraining', educationAndTraining);
        formData.append('experience', experience);
        formData.append('membership', membership);
        formData.append('createdBy', user?.email || 'default@example.com'); // Use the current user's email
        formData.append('modifiedBy', user?.email || 'default@example.com'); // Use the current user's email
        formData.append('createdOn', new Date().toISOString()); // Current date and time
        formData.append('modifiedOn', new Date().toISOString()); // Current date and time

        // Include new image if provided
        if (image) {
            formData.append('image', image);
        }

        try {
            await upsertDoctor(formData);
            toast.success('Doctor updated successfully!');
            setName('');
            setSpecialization('');
            setAbout('');
            setEducationAndTraining('');
            setExperience('');
            setMembership('');
            setImage(null);
            setPreview(doctorImage);
            navigate('/admin/doctors'); // Navigate after update
        } catch (error) {
            toast.error('Failed to update doctor.');
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4">
                <div className="row">
                    <div className="col-md-6">
                        <h2 className="mb-4">Edit Doctor</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label>Name <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Specialization <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={specialization}
                                    onChange={(e) => setSpecialization(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>About</label>
                                <textarea
                                    className="form-control"
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Education & Training</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={educationAndTraining}
                                    onChange={(e) => setEducationAndTraining(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Experience</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={experience}
                                    onChange={(e) => setExperience(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Membership</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={membership}
                                    onChange={(e) => setMembership(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Upload Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={handleImageChange}
                                />
                            </div>
                            <div className="form-group mb-3 d-flex">
                                <button type="submit" className="btn btn-primary btn-sm me-2">
                                    <FontAwesomeIcon icon={faSave} className="me-2" /> Update Doctor
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-sm"
                                    onClick={() => navigate('/admin/doctors')}
                                >
                                    <FontAwesomeIcon icon={faTimes} className="me-2" /> Close
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                        <div className="image-preview-frame">
                            <img
                                src={preview}
                                alt="Doctor Preview"
                                className="img-fluid shadow"
                                style={{
                                    width: '300px',
                                    height: '300px',
                                    objectFit: 'cover',
                                    borderRadius: '10px',
                                    border: '2px solid #ddd'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditDoctorPage;
