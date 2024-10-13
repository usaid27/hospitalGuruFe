import React, { useEffect, useState } from "react";
import DoctorCard from "../../Components/DoctorCard";
import profile1 from "../../Assets/profile-1.png";
// import profile2 from "../../Assets/profile-2.png";
// import profile3 from "../../Assets/profile-3.png";
// import profile4 from "../../Assets/profile-4.png";
import "../../Styles/Doctors.css";
import Navbar from "../../Components/Navbar"; // Import Navbar
import Footer from "../../Components/Footer";
import DocProfile from "../../Components/DocProfile";
import filterGif from "../../Assets/icons8-filter.gif";
import { baseUrl } from "../../Constants";
import axios from "axios";
import Loading from "../Loading";

function Doctors() {
  console.log(baseUrl);
  const [docdata, setdocdata] = useState([]);
  const [DocprofileModal, setDocprofileModal] = useState(false);
  const [docInfo, setdocInfo] = useState();
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State to control filter panel
  const [loading, setloading] = useState(false);
  const [filters, setFilters] = useState({
    city: "",
    experience: "",
  });

  useEffect(() => {
    getallDoctors();
  }, []);

  const getallDoctors = async () => {
    setloading(true);
    try {
      setTimeout(async () => {
        const url = `${baseUrl}/api/App/all-doctors`;
        console.log(url);
        const response = await axios.get(`${baseUrl}/api/App/all-doctors`);
        console.log(response.data);
        setdocdata(response.data);
        setloading(false);
      }, 5000);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  const openDocProfile = (item) => {
    // console.log("open doc profile modal")
    setDocprofileModal(true);
    setdocInfo(item);
  };
  const CloseDocProfile = () => {
    setDocprofileModal(false);
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

  console.log(DocprofileModal);
  return (
    <>
      {/* Navbar at the top */}
      <Navbar />
      <div className="doctor-section" id="doctors">
        <div className="dt-title-content">
          <div className="dt-titlecontainer">
            <h3 className="dt-title">
              <span>Meet Our Doctors</span>
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
                  <label>City</label>
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
                  <label>Years of Experience</label>
                  <select
                    name="experience"
                    value={filters.experience}
                    onChange={handleFilterChange}
                  >
                    <option value="">Select Experience</option>
                    <option value="1-5">1-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>

                <button className="apply-filters-btn">Apply Filters</button>
              </div>
            </div>
          )}

          <p className="dt-description">
            Meet our exceptional team of specialist doctors, dedicated to
            providing top-notch healthcare services at Health Plus. Trust in
            their knowledge and experience to lead you towards a healthier and
            happier life.
          </p>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="dt-cards-content">
            {docdata &&
              docdata.map((item) => {
                return (
                  <div onClick={() => openDocProfile(item)}>
                    <DoctorCard
                      img={profile1}
                      item={item}
                      stars="4.9"
                      reviews="1800"
                    />
                  </div>
                );
              })}
            {/* <DoctorCard
            img={profile2}
            name="Dr. Jacob Jones"
            title="Hematologists"
            stars="4.8"
            reviews="700"
          />
          <DoctorCard
            img={profile3}
            name="Dr. Jenny Wilson"
            title="Endocrinologists"
            stars="4.7"
            reviews="450"
          />
          <DoctorCard
            img={profile4}
            name="Dr. Albert Flores"
            title="Hematologists"
            stars="4.8"
            reviews="500"
          /> */}
          </div>
        )}
      </div>
      {/* Adding Footer at the end */}
      <Footer />

      {DocprofileModal ? (
        <DocProfile docInfo={docInfo} CloseDocProfile={CloseDocProfile} />
      ) : null}
    </>
  );
}

export default Doctors;
