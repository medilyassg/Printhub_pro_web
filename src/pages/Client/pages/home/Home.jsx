import React, { useEffect, useState } from "react";
import HomeSlider from "./slideer/Slider";
import "./home.css";
import CatSlider from "../../components/catSlider/CatSlider";
import Banner from "../../components/banner/Banner";
import Product from "../../components/product/Product";
import PopularBanner from "../../images/banner4.jpg";
import Slider from "react-slick";
import sliderimg1 from "../../images/popular/product-8-1.jpg";
import TopProducts from "./topProducts/TopProducts";
import img1 from "../../images/thumbnail-1.jpg";
import img2 from "../../images/thumbnail-2.jpg";
import img3 from "../../images/thumbnail-3.jpg";
import { Link } from "react-router-dom";
import Header from "pages/Client/components/header/Header";
import Footer from "pages/Client/components/footer/Footer";

const Home = (props) => {
  
  document.title = "Home";
  return (
    <>
      <Header categories={props.categories} subcategories={props.subcategories}  cartitems={props.cartitems}/>
      <HomeSlider />
      <Banner />
    <Footer />
    </>
  );
};

export default Home;
