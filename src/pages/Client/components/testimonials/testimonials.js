import React from "react";
import Slider from "react-slick";
import { Card, CardBody, CardText, CardHeader } from "reactstrap";
import "./testimonials.css";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      job: "Software Engineer",
      comment: "Great service and amazing products!",
      rating: 5,
      profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      job: "Graphic Designer",
      comment: "I love the variety of items available.",
      rating: 4,
      profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    // Add other testimonials here
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    draggable: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? "star filled" : "star"}>
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return (
    <section className="customer-testimonials">
      <div className="container-fluid">
        <h2 className="section-title">Our happy clients say about us</h2>
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <Card>
                <CardHeader>
                  <div className="profile-info">
                    <img
                      src={testimonial.profilePicture}
                      alt={testimonial.name}
                      className="profile-picture rounded-circle"
                    />
                    <div className="name-and-job">
                      <h5 className="testimonial-name">{testimonial.name}</h5>
                      <p className="job">{testimonial.job}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="rating">{renderStars(testimonial.rating)}</div>
                  <CardText>{testimonial.comment}</CardText>
                </CardBody>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
