import React from "react";
import Navbar from "../../Components/Navbar";
import Hero from "../../Components/Hero";
import Info from "../../Components/Info";
import Footer from "../../Components/Footer";

function Home() {
  return (
    <div className="home-section">
      <Navbar />
      <Hero />
      <Info />
      <Footer />
    </div>
  );
}

export default Home;
