import React from "react";
import "../Styles/Components/HomePage.scss";
import NavBar from "../Components/DashBoard/Home/NavBar";
import HomeLinks from "../Components/DashBoard/Home/HomeLinks";
import FeaturesBox from "../Components/DashBoard/Home/FeaturesBox";
import FeaturesUserLove from "../Components/DashBoard/Home/FeaturesUserLove";
import Footer from "../Components/DashBoard/Home/Footer";
function HomePage() {
  return (
    <div className="home-page-container">
      <NavBar />
      <HomeLinks />
      <FeaturesBox />
      <FeaturesUserLove/>
      <Footer/>
    </div>
  );
}

export default HomePage;
