import React, { useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import img3 from "../../../assets/images/small/img-3.jpg";
import { Row, Col, Input, Card, CardImg, CardBody } from "reactstrap";

//Import Breadcrumb
import "../../../assets/scss/datatables.scss";



const ProductView = ({ product,productDetails }) => {


    const removeBodyCss = () => {
        document.body.classList.add("no_padding");
    };


    document.title = "Products List";

    return (
        <React.Fragment>
            <Col sm={6} md={12} xl={3}>
            <Card className="d-flex flex-row">
                    <CardImg
                        top
                        className="img-fluid w-25"
                        src={productDetails.images ? `http://127.0.0.1:8000/storage/${JSON.parse(productDetails.images)[0]}` : ""}
                        alt="Product Image"
                    />
                    <CardBody className="w-75">
                        <h4>{productDetails.name}</h4>
                        <p className="card-text">
                            <div>Slug: {productDetails.slug}</div>
                            <div>Price: {product.price}</div>
                            <div>Quantity ordered: {product.quantity}</div>
                        </p>
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default ProductView;