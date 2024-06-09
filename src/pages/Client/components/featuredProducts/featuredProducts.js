import React from "react";
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from "reactstrap";
import "./featuredProducts.css";

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Cartes de Visite Classiques",
      price_unit: 29.99,
      link: "http://localhost:3000/cat/carterie/1",
      images: ["path/to/image1.jpg"],
    },
    {
      id: 2,
      name: "Cartes de Visite Luxe",
      price_unit: 39.99,
      link: "http://localhost:3000/cat/carterie/2",
      images: ["path/to/image2.jpg"],
    },
    {
      id: 3,
      name: "Casquettes",
      price_unit: 49.99,
      link: "http://localhost:3000/cat/goodies/56",
      images: ["path/to/image3.jpg"],
    },
  ];

  return (
    <section className="featured-products py-5">
      <div className="container">
        <h2 className="section-title">Featured Products</h2>
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <Card className="product-card">
                <div className="card-img-wrapper">
                  <CardImg
                    top
                    className="img-fluid"
                    src={`https://placehold.co/600x400.png`}
                    alt={product.name}
                  />
                  <div className="overlay">
                    <Button color="primary" className="overlay-button" href={product.link}>Quick View</Button>
                  </div>
                </div>

                <CardBody>
                  <CardTitle tag="h5">{product.name}</CardTitle>
                  <CardText>${product.price_unit}</CardText>
                  <Button color="primary" className="add-to-cart-button" href={product.link}>Add to Cart</Button>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
