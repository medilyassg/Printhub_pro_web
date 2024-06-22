import React from "react";
import Slider from "react-slick";
import { Card, CardImg, CardBody, CardTitle } from "reactstrap";
import "./featuredProducts.css";

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Affiches",
      status: "Livré en 48h",
      image: "https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_auto,f_auto,fl_progressive,w_450/legacy_dam/fr-fr/S001773856/MXP-29911-Poster-Tile-001",
    },
    {
      id: 2,
      name: "Cartons plumes",
      status: "Livré en 4 j",
      image: "https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_auto,f_auto,fl_progressive,w_450/legacy_dam/fr-fr/S001448047/MXP510-ProductTile-Foam-Boards-001",
    },
      
    {
      id: 3,
      name: "Panneaux en carton",
      image: "https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_auto,f_auto,fl_progressive,w_450/legacy_dam/fr-fr/S001332130/DACHMX-726-ProductTile-Cardboard-Sign-002",
    },
      
    {
      id: 4,
      name: "Drapeaux personnalisés",
      image: "https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_auto,f_auto,fl_progressive,w_450/legacy_dam/fr-fr/S001480868/MXP5318-Flag-Tile-001",
    },
    {
      id: 5,
      name: "T-shirts",
      status: "-10%",
      image: "https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_auto,f_auto,fl_progressive,w_450/legacy_dam/fr-fr/S001773847/MXP-29911-Tshirt-Tile-002",
    },
    {
      id: 6,
      name: "Casquettes et chapeaux",
      image: "https://cms.cloudinary.vpsvc.com/images/c_scale,dpr_auto,f_auto,fl_progressive,w_450/legacy_dam/fr-fr/S001621745/MXP21284-Vistaprint-printed-cap-Overview-Tile-001",
    },
    
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="featured-products py-5">
      <div className="container">
        <h2 className="section-title">Captez l'attention</h2>
        <Slider {...settings}>
          {products.map((product) => (
            <div className="product-item" key={product.id}>
              <Card className="product-card">
                <div className="card-img-wrapper">
                  <CardImg
                    top
                    className="img-fluid"
                    src={product.image}
                    alt={product.name}
                  />
                  {product.status && (
                    <div className="status-label">{product.status}</div>
                  )}
                </div>
                <CardBody>
                  <CardTitle tag="h5">{product.name}</CardTitle>
                </CardBody>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default FeaturedProducts;
