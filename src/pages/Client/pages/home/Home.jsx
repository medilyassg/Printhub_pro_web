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
  const [prodData, setProdData] = useState(props.data);
  const [catArray, setcatArray] = useState([]);
  const [activeTabs, setActiveTabs] = useState();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeData, setActiveData] = useState([]);

  const [getBestSeller, setgetbestseller] = useState([]);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    fade: false,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
  };

  const catArr = [];

  // useEffect(() => {
  //   prodData.length !== 0 &&
  //     prodData.map((item) => {
  //       item.items.length !== 0 &&
  //         item.items.map((item_) => {
  //           catArr.push(item_.cat_name);
  //         });
  //     });
  //   const list2 = catArr.filter(
  //     (item, index) => catArr.indexOf(item) === index
  //   );
  //   setcatArray(list2);
  //   setActiveTabs(list2[0]);
  // }, []);

  // useEffect(() => {
  //   if (activeTabs && prodData.length !== 0) {
  //     const newData = prodData.flatMap((item) => {
  //       return item.items
  //         .filter((item_) => item_.cat_name === activeTabs)
  //         .flatMap((item_) => item_.products);
  //     });
  //     setActiveData(newData);
  //   } else {
  //     setActiveData([]);
  //   }
  // }, [activeTabs, prodData]);

  const bestSellerArray = [];
  // useEffect(() => {
  //   {
  //     prodData.length !== 0 &&
  //       prodData.map((item) => {
  //         if (item.cat_name === "Fashion") {
  //           item.items.length !== 0 &&
  //             item.items.map((item_) => {
  //               item_.produts !== 0 &&
  //                 item_.products.map((productItem, Index) => {
  //                   bestSellerArray.push(productItem);
  //                 });
  //             });
  //         }
  //       });
  //   }
  //   setgetbestseller(bestSellerArray);
  // }, []);
  document.title = "Home";
  return (
    <>
      <Header categories={props.categories} subcategories={props.subcategories}/>
      <HomeSlider />
      <Banner />

     {/* 
      <section className="TopProductSection">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <TopProducts title="Top Selling" img={img1} />
            </div>

            <div className="col">
              <TopProducts title="Trending Products" img={img2} />
            </div>

            <div className="col">
              <TopProducts title="Recently Added" img={img1} />
            </div>

            <div className="col">
              <TopProducts title="Top Rated" img={img3} />
            </div>
          </div>
        </div>
      </section> */}
    <Footer />
    </>
  );
};

export default Home;
