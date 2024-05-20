import React from "react"
import "./slider.css"
import Slider from "react-slick"
import sliderimg1 from "../../../images/slider-22.png"
import sliderimg2 from "../../../images/slider-6.png"
import { EmailOutlined } from "@mui/icons-material"
import { Button } from "reactstrap"

const HomeSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
  }
  return (
    <section className="homeSlider py-5">
      <div className="container-fluid position-relative">
        <Slider {...settings} className="home_slider-main">
          <div className="item position-relative">
            <img src={sliderimg1} className="w-100" alt="Slider 1" />
            <div className="info text-end position-absolute top-50 end-0 translate-middle-y p-5">
              <h2 className="mb-4 display-4 fw-bold">
                Best Deals <br />
                Big Discounts
              </h2>
              <p className="fs-4 text-muted">Save up to 50% off on your first order.</p>
              <Button color="primary" className="mt-3 ">Shop Now</Button>
            </div>
          </div>
          <div className="item position-relative">
            <img src={sliderimg2} className="w-100" alt="Slider 2" />
            <div className="info text-start position-absolute top-50 start-0 translate-middle-y p-5">
              <h2 className="mb-4 display-4 fw-bold">
                Best Deals <br />
                Big Discounts
              </h2>
              <p className="fs-4 text-muted">Save up to 50% off on your first order.</p>
              <Button color="primary" className="mt-4">Shop Now</Button>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  )
}

export default HomeSlider
