import React, { useEffect } from "react";
import HomeSlider from "./slideer/Slider";
import "./home.css";
import Banner from "../../components/banner/Banner";
import Footer from "pages/Client/components/footer/Footer";
import FeaturedProducts from "pages/Client/components/featuredProducts/featuredProducts";
import Testimonials from "pages/Client/components/testimonials/testimonials";
import Contact from "pages/Client/components/contact/Contact";


const Home = (props) => {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <>
      
      <HomeSlider />
      <Banner />
      <FeaturedProducts />
      <Testimonials /> 
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
