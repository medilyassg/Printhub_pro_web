import React, { useEffect, useState } from "react";
import HomeSlider from "./slideer/Slider";
import "./home.css";
import Banner from "../../components/banner/Banner";
import Header from "pages/Client/components/header/Header";
import Footer from "pages/Client/components/footer/Footer";
import FeaturedProducts from "pages/Client/components/featuredProducts/featuredProducts";
import Testimonials from "pages/Client/components/testimonials/testimonials";

const Home = props => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    document.title = "Home";
    // Fetch featured products here
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    // Replace with your API call
    try {
      const response = await fetch("http://127.0.0.1:8000/api/featured-products");
      const data = await response.json();
      setFeaturedProducts(data);
    } catch (error) {
      console.error("Error fetching featured products:", error);
    }
  };

  return (
    <>
      <Header
        categories={props.categories}
        subcategories={props.subcategories}
        cartitems={props.cartitems}
        fetchCartItems={props.fetchCartItems}
      />
      <HomeSlider />
      <Banner />
      <FeaturedProducts products={featuredProducts} />
      <Testimonials />
      <Footer />
    </>
  );
};

export default Home;
