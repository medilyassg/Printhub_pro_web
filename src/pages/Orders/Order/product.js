import React, { useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import img3 from "../../../assets/images/small/img-3.jpg";
import { Row, Col, Input, Card, CardImg, CardBody } from "reactstrap";

//Import Breadcrumb
import "../../../assets/scss/datatables.scss";



const ProductView = ({ product }) => {


    const removeBodyCss = () => {
        document.body.classList.add("no_padding");
    };


    document.title = "Products List";

    return (
        <React.Fragment>
            <Col sm={6} md={4} xl={3}>
                <Card>
                    <CardImg top className="img-fluid" src={img3} alt="Veltrix" />
                    <CardBody>
                        <h4>Product details</h4>
                        <p className="card-text">
                           <div>format: {product.format}</div> 
                           <div>impression: {product.impression}</div> 
                           <div>paper: {product.paper}</div> 
                           <div>quantity ordered: {product.quantity}</div> 
                        </p>
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default ProductView;