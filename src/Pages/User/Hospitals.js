import React, { useEffect, useState } from "react";
// import DoctorCard from "../../Components/DoctorCard";
import profile1 from "../../Assets/hospital-sign.webp";
import profile2 from "../../Assets/modern-hospital-building (1).webp";
import profile3 from "../../Assets/modern-hospital-building.webp";
import hospitalImage from "../../Assets/hospital-icon.jpg";
// import profile4 from "../../Assets/profile-4.png";
import "../../Styles/Doctors.css";
import Navbar from "../../Components/Navbar"; // Import Navbar
import Footer from "../../Components/Footer"; // Import Footer
import HospitalProfile from "../../Components/HospitalProfile";
// import { FaDisease } from "react-icons/fa";
import filterGif from "../../Assets/icons8-filter.gif";
import axios from "axios";
import { baseUrl } from "../../Constants";
import Loading from "../Loading";

function Hospitals() {
  const [HospitalprofileModal, setHospitalprofileModal] = useState(false);
  const [Hospitaldata, setHospitaldata] = useState([]);
  const [HospitalInfo, setHospitalInfo] = useState();

  const [isFilterOpen, setIsFilterOpen] = useState(false); // State to control filter panel
  const [loading, setloading] = useState(false);
  const [filters, setFilters] = useState({
    city: "",
    Diseases: "",
  });
  // const [data, setdata] = useState([
  //   {
  //     img: profile1,
  //     name: "City General Hospital",
  //     location: "New York, NY",
  //     services: "Cardiology, Neurology, Pediatrics",
  //   },
  //   {
  //     img: profile2,
  //     name: "Green Valley Medical Center",
  //     location: "Los Angeles, CA",
  //     services: "Orthopedics, Emergency, Gynecology",
  //   },
  //   {
  //     img: profile3,
  //     name: "Sunrise Health Clinic",
  //     location: "Chicago, IL",
  //     services: "Dermatology, ENT, Radiology",
  //   },
  //   {
  //     img: profile3,
  //     name: "Sunrise Health Clinic",
  //     location: "Chicago, IL",
  //     services: "Dermatology, ENT, Radiology",
  //   },
  // ]);

  useEffect(() => {
    getAllHospitals();
  }, []);

  const getAllHospitals = async () => {
    setloading(true);
    try {
      const response = await axios.get(`${baseUrl}/api/App/all-hospitals`);
      console.log(response);
      setHospitaldata(response.data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  const openHospitalProfile = (item) => {
    // console.log("open doc profile modal")
    setHospitalprofileModal(true);
    setHospitalInfo(item);
  };
  const CloseHospitalProfile = () => {
    setHospitalprofileModal(false);
    // setdocInfo(profile1)
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen); // Toggle filter panel
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const convertByteArrayToImage = (base64String) => {
    return base64String
      ? `data:image/jpeg;base64,${base64String}`
      : hospitalImage;
  };

  return (
    <>
      {/* Navbar at the top */}
      <Navbar />
      <div
        className="doctor-section"
        id="hospitals"
        style={{ padding: "50px", backgroundColor: "#f8f9fa" }}
      >
        <div
          className="dt-title-content"
          style={{ textAlign: "center", marginBottom: "40px" }}
        >
          <div className="dt-titlecontainer">
            <h3
              className="dt-title"
              style={{ fontSize: "32px", fontWeight: "bold" }}
            >
              <span>Meet Our Hospitals</span>
            </h3>
            <div className="filter-icon-container">
              <img
                src={filterGif}
                alt="Filter Icon"
                className="filter-icon"
                onClick={toggleFilter}
              />
            </div>
          </div>

          {isFilterOpen && (
            <div className="filter-container">
              {/* Filter options */}
              <div className="filter-panel">
                <h4>Filter by</h4>
                <div className="filter-option">
                  <label style={{width:"100%"}}>City</label>
                  <select
                    name="city"
                    value={filters.city}
                    onChange={handleFilterChange}
                  >
                    <option value="">Select City</option>
                    <option value="New York">New York</option>
                    <option value="Los Angeles">Los Angeles</option>
                    <option value="Chicago">Chicago</option>
                  </select>
                </div>

                <div className="filter-option">
                  <label style={{width:"100%"}}>Speciality of Diseases</label>
                  <select
                    name="experience"
                    value={filters.experience}
                    onChange={handleFilterChange}
                  >
                    <option value="">Select Specialty</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Gynecology">Gynecology</option>
                    <option value="Oncology">Oncology</option>
                    <option value="Psychiatry">Psychiatry</option>
                    <option value="Urology">Urology</option>
                  </select>
                </div>

                <button className="apply-filters-btn">Apply Filters</button>
              </div>
            </div>
          )}

          <p
            className="dt-description"
            style={{ fontSize: "18px", color: "#777" }}
          >
            Discover our network of highly rated hospitals, committed to
            offering world-class healthcare services. With state-of-the-art
            facilities and expert healthcare professionals, your health is in
            good hands.
          </p>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div
            className="dt-cards-content"
            style={
              {
                // display: "grid",
                // gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                // gap: "20px",
              }
            }
          >
            {Hospitaldata &&
              Hospitaldata.map((item) => {
                return (
                  <div
                    className="dt-card"
                    style={{ cursor: "pointer", margin: "0 1%" }}
                    onClick={() => openHospitalProfile(item)}
                  >
                    {/* <img src={item.imageFile} alt={item.name} className="dt-card-img" /> */}
                    <img
                      src={convertByteArrayToImage(item.imageFile)}
                      alt={item.name}
                      className="dt-card-img"
                    />
                    <p className="dt-card-name">{item.name}</p>
                    <p className="dt-card-title">{item.location}</p>
                    <p className="dt-card-stars">
                      {/* <FontAwesomeIcon
                // icon={faStar}
                style={{ color: "#F7BB50", paddingRight: "6px" }}
              /> */}
                      {/* {item.stars} */}
                      <span className="dt-card-reviews">
                        {item.otherSpecialities.map((item) => {
                          <p>{item}</p>;
                        })}
                      </span>
                    </p>
                  </div>
                );
              })}
          </div>
        )}
      </div>
      {/* Footer at the bottom */}
      <Footer />
      {HospitalprofileModal ? (
        <HospitalProfile
          HospitalInfo={HospitalInfo}
          CloseHospitalProfile={CloseHospitalProfile}
        />
      ) : null}
    </>
  );
}

export default Hospitals;
