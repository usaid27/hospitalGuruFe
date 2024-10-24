import React, { useEffect, useState } from "react";
import Doctor from "../Assets/doctor-picture.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate  } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import "../Styles/Hero.css";
import AppointmentForm from "./AppointmentForm";

function Hero() {
  const navigate = useNavigate();
  const [goUp, setGoUp] = useState(false);
  const [BookAppointmentModal, setBookAppointmentModal] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookAppointmentClick = () => {
    setBookAppointmentModal(true)
    // navigate("/appointment");
  };

  const handlecloseBookAppointmentClick = () => {
    setBookAppointmentModal(false)
    // navigate("/appointment");
  };

  useEffect(() => {
    const onPageScroll = () => {
      if (window.scrollY > 600) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);

  return (
    <div className="section-container">
      <div className="hero-section">
        <div className="text-section">
          <p className="text-headline">❤️ Health comes first</p>
          <h2 className="text-title">
            Find your Doctor and make an Appointments
          </h2>
          <p className="text-descritpion">
            Talk to online doctors and get medical advice, online prescriptions,
            refills and medical notes within minutes. On-demand healthcare
            services at your fingertips.
          </p>
          <button
            className="text-appointment-btn"
            type="button"
            onClick={handleBookAppointmentClick}
          >
            <FontAwesomeIcon icon={faCalendarCheck} /> Book Appointment
          </button>
          <div className="text-stats">
            <div className="text-stats-container">
              <p>145k+</p>
              <p>Receive Patients</p>
            </div>

            <div className="text-stats-container">
              <p>50+</p>
              <p>Expert Doctors</p>
            </div>

            <div className="text-stats-container">
              <p>10+</p>
              <p>Years of Experience</p>
            </div>
          </div>
        </div>

        <div className="hero-image-section">
          <img className="hero-image1" src={Doctor} alt="Doctor" />
        </div>
      </div>


      <div className="carousel-section">
        <h3 className="carousel-title">Our Hospitals</h3>
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          showThumbs={false}
          autoPlay={true}
          interval={3000}
        >
          <div>
            <img src={require("../Assets/blur-hospital.jpg")} alt="Hospital 1" />
            <p className="legend">Hospital Picture 1</p>
          </div>
          <div>
            <img src={require("../Assets/doctor-standing-hospital-room-with-patient-bed.jpg")} alt="Hospital 2" />
            <p className="legend">Hospital Picture 2</p>
          </div>
          <div>
            <img src={require("../Assets/hospital-hallway-with-motion-effect.jpg")} alt="Hospital 3" />
            <p className="legend">Hospital Picture 3</p>
          </div>
          <div>
            <img src={require("../Assets/modern-healthcare-experts-working-with-advanced-technology-generated-by-ai.jpg")} alt="Hospital 3" />
            <p className="legend">Hospital Picture 4</p>
          </div>
          <div>
            <img src={require("../Assets/view-city-square.jpg")} alt="Hospital 3" />
            <p className="legend">Hospital Picture 5</p>
          </div>
          <div>
            <img src={require("../Assets/building-with-white-walls.jpg")} alt="Hospital 3" />
            <p className="legend">Hospital Picture 6</p>
          </div>
        </Carousel>
      </div>




      <div
        onClick={scrollToTop}
        className={`scroll-up ${goUp ? "show-scroll" : ""}`}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
      {BookAppointmentModal && (
        <AppointmentForm
        closeModal={handlecloseBookAppointmentClick}
        />
      )}
    </div>
  );
}

export default Hero;
