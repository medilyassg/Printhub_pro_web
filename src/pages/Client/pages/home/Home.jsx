import React, { useEffect } from "react";
import HomeSlider from "./slideer/Slider";
import "./home.css";
import Banner from "../../components/banner/Banner";
import Header from "pages/Client/components/header/Header";
import Footer from "pages/Client/components/footer/Footer";

const Home = (props) => {

  useEffect(() => {
    document.title = "Home";
  }, []);
  return (
    <>
      <Header categories={props.categories} subcategories={props.subcategories} cartitems={props.cartitems} fetchCartItems={props.fetchCartItems}/>
      <HomeSlider />
      <Banner />
      <Footer />
    </>
  );
};

export default Home;
