import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import "../../Styles/Reviews.css";

const Star = ({ filled, onClick }) => {
  return (
    <span
      className={filled ? "star filled" : "star"}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      ★
    </span>
  );
};

function Reviews() {
  const customerReviews = [
    {
      name: "John Doe",
      location: "New York",
      message: "Excellent service and friendly staff!",
      rating: 4,
    },
    {
      name: "Jane Smith",
      location: "California",
      message: "Very professional and caring doctors.",
      rating: 5,
    },
    {
      name: "Smith Doe",
      location: "California",
      message: "Very professional and caring doctors.",
      rating: 3,
    },
    // Add more reviews as needed
  ];

  const doctorNames = [
    "John Doe",
    "Jane Smith",
    "Smith Doe",
    "Emily Davis",
    "Michael Brown",
    // Add more doctors as needed
  ];

  const [newReview, setNewReview] = useState({
    name: "",
    location: "",
    message: "",
    rating: 0,
  });
  const [reviews, setReviews] = useState(customerReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  console.log(newReview)
  console.log(searchQuery)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const closeFormModal = () => {
    // console.log("close button clicked");
    // alert("close button clicked");
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setReviews([...reviews, newReview]);
    console.log(newReview)
    console.log(searchQuery)
    setNewReview({ name: "", location: "", message: "", rating: 0 });
    setIsModalOpen(false);
  };

  // const filteredDoctors = doctorNames.filter((doctor) =>
  //   doctor.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <>
      <Navbar />
      <div className="review-section" id="reviews">
        <div className="rw-header">
          <h3 className="rw-text-title" style={{ color: "black" }}>
            Our Reviews
          </h3>
          <button
            className="give-review-btn"
            onClick={() => setIsModalOpen(true)}
          >
            Give Review
          </button>
        </div>
        <div className="rw-text-content">
          {reviews.map((item, index) => (
            <div key={index} className="rw-review-card">
              <div className="rw-names">
                <h3 className="rw-reviewer-name">{item.name}</h3>
                <div className="rw-rating">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} filled={idx < item.rating} />
                  ))}
                </div>
              </div>
              <p className="rw-text-desc">
                Don't believe us? Check clients' words:
              </p>
              <div className="rw-text-format">
                <span className="rw-text-quote1">''</span>
                <span className="rw-review">{item.message}</span>
                <span className="rw-text-quote2">''</span>
              </div>
              <div className="rw-authors">
                <p className="rw-reviewer-place">{item.location}</p>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
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
                  style={{ display: "flex", alignItems: "center",justifyContent:"center" }}
                >
                  <h3 className="modal-title" id="exampleModalLabel">
                    Leave a Review
                  </h3>
                  <img
                    src={require("../../Assets/icons8-close-window.gif")}
                    alt="closemodalIcon"
                    style={{
                      position: "absolute",
                      // top: "15px",
                      right: "15px",
                      cursor: "pointer",
                      // zIndex: 9999,
                    }}
                    onClick={closeFormModal}
                  />
                </div>

                <div className="formContainer">
                  {/* Search Field */}
                  <input
                    type="text"
                    className="form-control ReviewsInput"
                    placeholder="Search Doctor Name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                    type="text"
                    className="form-control ReviewsInput"
                    name="location"
                    placeholder="Your Location"
                    value={newReview.location}
                    onChange={handleInputChange}
                  />
                  <textarea
                    name="message"
                    placeholder="Your Review"
                    className="form-control ReviewsInput"
                    value={newReview.message}
                    onChange={handleInputChange}
                  />
                  {/* Rating section */}
                  <div
                    className="rw-rating"
                    style={{ textAlign: "center", margin: "10px 0" }}
                  >
                    {[...Array(5)].map((_, index) => (
                      <span
                        className={`star ${
                          index < newReview.rating ? "filled" : ""
                        }`}
                        key={index}
                        onClick={() => handleRatingChange(index + 1)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="submit"
                    className="submit-btn"
                    onClick={handleSubmit}
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Reviews;
