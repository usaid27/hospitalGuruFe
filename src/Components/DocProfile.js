import React, { useEffect, useState } from "react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import ContactModal from "./ContactModal";
import { baseUrl } from "../Constants";
import doctorImage from "../Assets/doctor.png";
import axios from "axios";

const DocProfile = (props) => {
  const [Contactmodal, setContactmodal] = useState(false);
  const [docdetails, setdocdetails] = useState({});
  //   console.log("modal is opened");

  console.log(props.docInfo);
  // const id = 1;

  useEffect(() => {
    getDoctorDetials();
  }, []);

  const getDoctorDetials = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/App/Doctor/${props.docInfo.id}`
      );
      console.log(response);
      setdocdetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handelContactModal = () => {
    setContactmodal(false);
  };
  const convertByteArrayToImage = (base64String) => {
    return base64String
      ? `data:image/jpeg;base64,${base64String}`
      : doctorImage;
  };
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.6)", // dark background overlay
        zIndex: 1050,
      }}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{
          width: "90%",
          height: "90%",
          //   backgroundColor: "#f8f9fa",
          backgroundColor: "#DDE5F8",
          overflowY: "scroll",
          borderRadius: "10px",
          padding: "10px 20px",
        }}
      >
        <div className="modal-content">
          {/* Modal Header */}
          <div
            className="modal-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h5
              className="modal-title section-title"
              style={{ fontWeight: "bold", fontSize: "24px" }}
            >
              Doctor Profile
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              style={{ outline: "none", border: "none" }}
              onClick={props.CloseDocProfile}
            ></button>
          </div>
          <hr />

          {/* Modal Body */}
          <div
            className="modal-body"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {/* Doctor Image and Social Icons */}
            <div
              className="docImg"
              style={{ flex: "1", textAlign: "center", margin: "0% 3%" }}
            >
              <div
                className="card"
                style={{
                  width: "100%",
                  height: "50vh",
                  backgroundColor: "transparent",
                  border: "none",
                  borderRadius: "10px",
                  overflow: "hidden",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.6s",
                  position: "relative",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                }}
              >
                <img
                  src={convertByteArrayToImage(props.docInfo.image)}
                  alt="Doctor"
                  style={{
                    width: "100%",
                    height: "50vh",
                    borderRadius: "10px",
                    marginBottom: "20px",
                  }}
                />
              </div>
              <div>
                <div
                  style={{
                    margin: "15px 0",
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <a
                    href={docdetails.fbLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ width: "10%", height: "10%", cursor: "pointer" }}
                  >
                    <img
                      src={require("../Assets/wired-flat-2540-logo-facebook-morph-circle.gif")}
                      style={{
                        // margin: "0 10px",
                        // color: "#3b5998",
                        cursor: "pointer",
                        width: "100%",
                        // height: "10%",
                      }}
                    />
                  </a>
                  <a
                    href={docdetails.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ width: "10%", height: "10%", cursor: "pointer" }}
                  >
                    <img
                      src={require("../Assets/wired-flat-2542-logo-instagram-morph-circle.gif")}
                      style={{
                        // margin: "0 10px",
                        // color: "#3b5998",
                        cursor: "pointer",
                        width: "100%",
                        // height: "10%",
                      }}
                    />
                  </a>
                  <a
                    href={docdetails.xLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ width: "10%", height: "10%", cursor: "pointer" }}
                  >
                    <img
                      src={require("../Assets/CLIPLY_372109260_TWITTER_LOGO_400.gif")}
                      style={{
                        // margin: "0 10px",
                        // color: "#3b5998",
                        cursor: "pointer",
                        width: "100%",
                        // height: "10%",
                      }}
                    />
                  </a>
                  <a
                    href={docdetails.linkedInLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ width: "10%", height: "10%", cursor: "pointer" }}
                  >
                    <img
                      src={require("../Assets/wired-flat-2549-logo-linkedin-hover-pinch.gif")}
                      style={{
                        // margin: "0 10px",
                        // color: "#3b5998",
                        width: "100%",
                        cursor: "pointer",
                      }}
                    />
                  </a>
                  {/* <FaFacebook
                    size={24}
                    style={{
                      margin: "0 10px",
                      color: "#3b5998",
                      cursor: "pointer",
                    }}
                  />
                  <FaTwitter
                    size={24}
                    style={{
                      margin: "0 10px",
                      color: "#00acee",
                      cursor: "pointer",
                    }}
                  />
                  <FaLinkedin
                    size={24}
                    style={{
                      margin: "0 10px",
                      color: "#0e76a8",
                      cursor: "pointer",
                    }}
                  /> */}
                </div>
                <button
                  className="btn btn-primary"
                  style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    width: "100%",
                  }}
                  onClick={() => setContactmodal(true)}
                >
                  CONTACT DOCTOR
                </button>
              </div>
            </div>
            {/* <div className="docImg" style={{ flex: "1", textAlign: "center", margin: "0% 3%", perspective: "1000px" }}>
            <div className="card" style={{ 
              width: "100%", 
              height: "auto", 
              borderRadius: "10px", 
              overflow: "hidden", 
              transformStyle: "preserve-3d", 
              transition: "transform 0.6s", 
              position: "relative" 
            }}>
                <img 
                  src={props.docInfo} 
                  alt="Doctor" 
                  style={{ 
                    width: "100%", 
                    height: "40vh", 
                    borderRadius: "10px", 
                    marginBottom: "20px", 
                    backfaceVisibility: "hidden" 
                  }} 
                />
                <div 
                  className="card-content" 
                  style={{ 
                    position: "absolute", 
                    top: "0", 
                    left: "0", 
                    width: "100%", 
                    height: "100%", 
                    background: "#fff", 
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)", 
                    transform: "rotateY(180deg)", 
                    backfaceVisibility: "hidden", 
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "center", 
                    alignItems: "center", 
                    padding: "20px" 
                  }}
                >
                  <div style={{ marginBottom: "15px" }}>
                    <FaFacebook size={24} style={{ margin: "0 10px", color: "#3b5998", cursor: "pointer" }} />
                    <FaTwitter size={24} style={{ margin: "0 10px", color: "#00acee", cursor: "pointer" }} />
                    <FaLinkedin size={24} style={{ margin: "0 10px", color: "#0e76a8", cursor: "pointer" }} />
                  </div>
                  <button className="btn btn-primary" style={{ padding: "10px 20px", fontSize: "16px", width: "100%" }}>CONTACT DOCTOR</button>
                </div>
              </div>
            </div> */}

            {/* Doctor Information Section */}
            <div
              className="docInfoSection"
              style={{ flex: "2", paddingLeft: "20px" }}
            >
              <div className="docinfo" style={{ marginBottom: "20px" }}>
                <h3
                  style={{
                    fontSize: "22px",
                    fontWeight: "bold",
                    color: "#007bff",
                    textDecoration: "Underline",
                  }}
                >
                  {docdetails.name}
                </h3>
                <p>Specialty: {docdetails.specialization}</p>
              </div>

              <div className="docinfo" style={{ marginBottom: "20px" }}>
                <h4
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#007bff",
                  }}
                >
                  ABOUT DOCTOR
                </h4>
                <p>{docdetails.about}</p>
              </div>

              <div className="docinfo" style={{ marginBottom: "20px" }}>
                <h4
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#007bff",
                  }}
                >
                  EDUCATION & TRAINING
                </h4>
                <p>{docdetails.educationAndTraining}</p>
                <p>{docdetails.profileContents}</p>
              </div>

              <div className="docinfo" style={{ marginBottom: "20px" }}>
                <h4
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#007bff",
                  }}
                >
                  EXPERIENCE
                </h4>
                <p>{docdetails.experience}</p>
                <p>{}</p>
              </div>

              <div className="docinfo">
                <h4
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#007bff",
                  }}
                >
                  ACCOMPLISHMENTS / AWARDS
                </h4>
                <ul>
                  <li>{docdetails.accomplishmentOrAward}</li>
                  <li>{docdetails.membership}</li>
                </ul>
              </div>
            </div>
          </div>
          <hr />

          {/* Modal Footer */}
          <div
            className="modal-footer"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={props.CloseDocProfile}
            >
              Close
            </button>
          </div>
        </div>
      </div>
      {Contactmodal && (
        <ContactModal
          DocDetails="Dr. Salena Doe"
          ContactModal={handelContactModal}
        />
      )}
    </div>
  );
};

export default DocProfile;
