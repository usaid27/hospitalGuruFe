import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../Styles/HospitalProfile.css"; // Ensure to create and link your CSS file
import ContactModal from "./ContactModal";
import hospitalImage from "../Assets/hospital-icon.jpg";
import axios from "axios";
import { baseUrl } from "../Constants";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const HospitalProfileModal = ({ HospitalInfo, CloseHospitalProfile }) => {
  const [Contactmodal, setContactmodal] = useState(false);
  const [HospitalDetails, setHospitalDetails] = useState({});
  //   console.log("modal is opened");
  // const id = 1
  const points = [
    {
      lat: 51.505,
      lng: -0.09,
      name: "London Hospital",
      address: "123 Health St, London, UK",
    },
    // {
    //   lat: 48.8566,
    //   lng: 2.3522,
    //   name: "Paris Medical Center",
    //   address: "456 Wellness Ave, Paris, FR",
    // },
    // {
    //   lat: 40.7128,
    //   lng: -74.006,
    //   name: "New York Clinic",
    //   address: "789 Care Rd, New York, USA",
    // },
  ];
  useEffect(() => {
    gethospitaldetails();
  }, []);

  const gethospitaldetails = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/App/Hospital/${HospitalInfo.id}`
      );
      console.log(response);
      setHospitalDetails(response.data);
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
      : hospitalImage;
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        {/* Hospital Image */}
        <div className="hospital-img-container">
          <img
            src={convertByteArrayToImage(HospitalDetails.imageFile)}
            alt={`${HospitalDetails.name}`}
            className="hospital-img"
          />
          <img
            src={require("../Assets/icons8-close-window.gif")}
            alt="closemodalIcon"
            // className="btn-close"
            style={{
              position: "absolute",
              top: "2%",
              right: "1%",
              width: "3%",
              height: "5%",
            }}
            onClick={CloseHospitalProfile}
          />
          {/* <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              style={{ outline: "none", border: "none",,color:"#9D2553" }}
              
            ></button> */}
        </div>

        {/* Hospital Info */}
        <div className="hospital-info">
          <div className="info-header">
            <div className="ht-NameSection">
              <h2 className="hospital-name">{HospitalDetails.name}</h2>
              <p className="hospital-location">{HospitalDetails.location}</p>
            </div>
            <div className="ht-ContactbtnSection">
              <button
                className="contact-btn"
                onClick={() => setContactmodal(true)}
              >
                CONTACT HOSPITAL
              </button>
            </div>
          </div>
          <hr className="separator" />

          {/* About Section */}
          <div className="hospital-card">
            <h3 className="section-title">About the Hospital</h3>
            <p className="about-hospital">{HospitalDetails.about}</p>
          </div>

          {/* Infrastructure Section */}
          <div className="hospital-card">
            <h3 className="section-title">Infrastructure</h3>
            <p>{HospitalDetails.infrastructure}</p>
          </div>

          {/* Team and Specialities Section */}
          <div className="hospital-card">
            <h3 className="section-title">Team and Specialities</h3>
            <p>{HospitalDetails.teamAndSpecialities}</p>
            {/* <p>
              (
              {HospitalDetails && HospitalDetails.medicalCoreAndSpecialities.map((item) => { return <p>{item}</p>})}
              )
            </p> */}
          </div>

          {/* Accreditations and Awards Section */}
          <div className="hospital-card">
            <h3 className="section-title">Accreditations & Awards</h3>
            <ul>
              <li>{HospitalDetails.accreditationAndAwards}</li>
            </ul>
          </div>

          {/* location and Map Section */}
          <div
            className="col-12 row"
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "auto",
              backgroundColor: "#8da9ed",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0,4px 10px rgba(0,0,0,0.1",
            }}
          >
            <div className="hospital-card col-6" style={{ width: "48%" }}>
              <h3
                className="section-title"
                style={{
                  fontSize: "24px",
                  // color: "#9D2553",
                  textAlign: "center",
                  // borderBottom: "2px solid #9D2553",
                  paddingBottom: "10px",
                }}
              >
                Location
              </h3>
              <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                  <li style={{ marginBottom: "15px" }}>
                    {HospitalDetails.location}
                  </li>
              </ul>
            </div>
            <div className="hospital-card col-6" style={{ width: "48%" }}>
              <MapContainer
                center={[51.505, -0.09]}
                zoom={7}
                style={{ height: "400px", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {points.map((point, index) => (
                  <Marker key={index} position={[point.lat, point.lng]}>
                    <Popup>{point.name}</Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
        <hr />
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
            style={{ marginBottom: "2%" }}
            onClick={CloseHospitalProfile}
          >
            Close
          </button>
        </div>
      </div>
      {Contactmodal && (
        <ContactModal
          HospitalInfo={HospitalInfo}
          ContactModal={handelContactModal}
        />
      )}
    </div>
  );
};

export default HospitalProfileModal;
