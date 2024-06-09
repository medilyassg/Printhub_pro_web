import React, { useEffect } from "react";
import HomeSlider from "./slideer/Slider";
import "./home.css";
import Banner from "../../components/banner/Banner";
import Footer from "pages/Client/components/footer/Footer";


const Home = (props) => {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <>
      
      <HomeSlider />
      <Banner />
      <Footer />
    </>
  );
};

export default Home;
