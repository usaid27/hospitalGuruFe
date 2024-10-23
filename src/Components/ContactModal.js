import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../Styles/Reviews.css";
import axios from "axios";
import { baseUrl } from "../Constants";

function ContactModal(props) {
  console.log(props.DocDetails);
  const [newReview, setNewReview] = useState({
    name: "",
    Number: "",
    Email: "",
    Message: "",
    rating: 0,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  console.log(newReview);
  console.log(searchQuery);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const validate = () => {
    const validationErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!newReview.name.trim()) validationErrors.name = "Name is required.";
    if (!phoneRegex.test(newReview.Number))
      validationErrors.Number = "Phone number must be 10 digits.";
    if (!emailRegex.test(newReview.Email))
      validationErrors.Email = "Enter a valid email address.";
    if (!newReview.Message.trim())
      validationErrors.Message = "Message is required.";

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validate());

    if (Object.keys(validate()).length === 0) {
      setIsSubmitting(true);
      try {
        let contactDetails = {
          doctorId: props.DocDetails?.id,
          doctorName: props.DocDetails?.name,
          patientName: newReview.name,
          patientMobile: newReview.Number,
          patientEmail: newReview.Email,
          message: newReview.Message,
          consent: true,
        };

        const response = await axios.post(
          `${baseUrl}/api/app/contact-doctor`,
          contactDetails
        );

        console.log(response);
        setNewReview({
          name: "",
          Number: "",
          Email: "",
          Message: "",
          rating: 0,
        });
        alert("Request submitted successfully!");
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  const handleHospitalSubmit = async (e) => {
    e.preventDefault();
    setErrors(validate());

    if (Object.keys(validate()).length === 0) {
      setIsSubmitting(true);
      try {
        let contactDetails = {
          hospitalId: props.HospitalInfo?.id,
          hospitalName: props.HospitalInfo?.name,
          name: newReview.name,
          mobile: newReview.Number,
          email: newReview.Email,
          message: newReview.Message,
          consent: true,
        };

        const response = await axios.post(
          `${baseUrl}/api/app/contact-hospital`,
          contactDetails
        );

        console.log(response);
        setNewReview({
          name: "",
          Number: "",
          Email: "",
          Message: "",
          rating: 0,
        });
        alert("Request submitted successfully!");
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // const filteredDoctors = doctorNames.filter((doctor) =>
  //   doctor.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <>
      {/* <Navbar /> */}
      {props.DocDetails ? (
        <div className="review-section" id="reviews">
          <div
            className="MainmodalContainer"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="ModalContainer" role="document">
              <div className="modal-content">
                <div
                  className="modal-header"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h3 className="modal-title" id="exampleModalLabel">
                    Contact Details
                  </h3>
                  <img
                    src={require("../Assets/icons8-close-window.gif")}
                    alt="closemodalIcon"
                    style={{
                      position: "absolute",
                      // top: "15px",
                      right: "15px",
                      cursor: "pointer",
                      // zIndex: 9999,
                    }}
                    onClick={props.ContactModal}
                  />
                </div>

                <div className="formContainer">
                  {/* Search Field */}
                  <input
                    type="text"
                    className="form-control ReviewsInput"
                    // placeholder="Search Doctor Name"
                    value={props.DocDetails.name}
                    readOnly
                    // onChange={(e) => setSearchQuery(e.target.value)}
                  />

                  {/* Fields for Name, Location, Review */}
                  <input
                    type="text"
                    name="name"
                    className="form-control ReviewsInput"
                    placeholder="Your Name"
                    value={newReview.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && <span className="error">{errors.name}</span>}
                  <input
                    type="number"
                    className="form-control ReviewsInput"
                    name="Number"
                    placeholder="Your Phone Number"
                    value={newReview.Number}
                    onChange={handleInputChange}
                  />
                  {errors.Number && (
                    <span className="error">{errors.Number}</span>
                  )}
                  <input
                    type="email"
                    className="form-control ReviewsInput"
                    name="Email"
                    placeholder="Your Email"
                    value={newReview.Email}
                    onChange={handleInputChange}
                  />
                  {errors.Email && (
                    <span className="error">{errors.Email}</span>
                  )}
                  <textarea
                    name="Message"
                    className="form-control ReviewsInput"
                    placeholder="Your Problem"
                    value={newReview.Message}
                    onChange={handleInputChange}
                  />
                  {errors.Message && (
                    <span className="error">{errors.Message}</span>
                  )}
                </div>

                <div className="modal-footer">
                  <button
                    type="submit"
                    className="submit-btn"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : props.HospitalInfo ? (
        <div className="review-section" id="reviews">
          <div
            className="MainmodalContainer"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="ModalContainer" role="document">
              <div className="modal-content">
                <div
                  className="modal-header"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h3 className="modal-title" id="exampleModalLabel">
                    Contact Details
                  </h3>
                  <img
                    src={require("../Assets/icons8-close-window.gif")}
                    alt="closemodalIcon"
                    style={{
                      position: "absolute",
                      // top: "15px",
                      right: "15px",
                      cursor: "pointer",
                      // zIndex: 9999,
                    }}
                    onClick={props.ContactModal}
                  />
                </div>

                <div className="formContainer">
                  {/* Search Field */}
                  <input
                    type="text"
                    className="form-control ReviewsInput"
                    // placeholder="Hospital Name"
                    value={props.HospitalInfo.name}
                    readOnly
                    // onChange={(e) => setSearchQuery(e.target.value)}
                  />

                  {/* Fields for Name, Location, Review */}
                  <input
                    type="text"
                    name="name"
                    className="form-control ReviewsInput"
                    placeholder="Your Name"
                    value={newReview.name}
                    onChange={handleInputChange}
                  />
                   {errors.name && <span className="error">{errors.name}</span>}
                  <input
                    type="number"
                    className="form-control ReviewsInput"
                    name="Number"
                    placeholder="Your Phone Number"
                    value={newReview.Number}
                    onChange={handleInputChange}
                  />
                  {errors.Number && (
                    <span className="error">{errors.Number}</span>
                  )}
                  <input
                    type="email"
                    className="form-control ReviewsInput"
                    name="Email"
                    placeholder="Your Email"
                    value={newReview.Email}
                    onChange={handleInputChange}
                  />
                  {errors.Email && (
                    <span className="error">{errors.Email}</span>
                  )}
                  <textarea
                    name="Message"
                    placeholder="Your Problem"
                    className="form-control ReviewsInput"
                    value={newReview.Message}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.Message && (
                    <span className="error">{errors.Message}</span>
                  )}
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="submit-btn"
                    onClick={handleHospitalSubmit}
                    disabled={isSubmitting}
                  >
                   {isSubmitting ? "Submitting..." : "Submit Request"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {/* <Footer /> */}
    </>
  );
}

export default ContactModal;
