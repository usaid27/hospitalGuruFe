import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../Styles/Reviews.css";

function ContactModal(props) {
  const [newReview, setNewReview] = useState({
    name: "",
    Number: "",
    Email: "",
    Message: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newReview);
    console.log(searchQuery);
    setNewReview({ name: "", location: "", message: "", rating: 0 });
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
                    value={props.DocDetails}
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
                  <input
                    type="number"
                    className="form-control ReviewsInput"
                    name="Number"
                    placeholder="Your Phone Number"
                    value={newReview.Number}
                    onChange={handleInputChange}
                  />
                  <input
                    type="email"
                    className="form-control ReviewsInput"
                    name="Email"
                    placeholder="Your Email"
                    value={newReview.Email}
                    onChange={handleInputChange}
                  />
                  <textarea
                    name="message"
                    placeholder="Your Problem"
                    className="form-control ReviewsInput"
                    value={newReview.Message}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="modal-footer">
                  <button
                    type="submit"
                    className="submit-btn"
                    onClick={handleSubmit}
                  >
                    Submit Request
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
                  style={{ display: "flex", alignItems: "center", justifyContent:"center" }}
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
                    placeholder="Hospital Name"
                    value={props.HospitalInfo.name}
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
                  <input
                    type="number"
                    className="form-control ReviewsInput"
                    name="Number"
                    placeholder="Your Phone Number"
                    value={newReview.Number}
                    onChange={handleInputChange}
                  />
                  <input
                    type="email"
                    className="form-control ReviewsInput"
                    name="Email"
                    placeholder="Your Email"
                    value={newReview.Email}
                    onChange={handleInputChange}
                  />
                  <textarea
                    name="message"
                    placeholder="Your Problem"
                    className="form-control ReviewsInput"
                    value={newReview.Message}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="modal-footer">
                  <button
                    type="submit"
                    className="submit-btn"
                    onClick={handleSubmit}
                  >
                    Submit Request
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
