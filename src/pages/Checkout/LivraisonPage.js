import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, Button, Form, Label, Input, FormFeedback, Spinner } from 'reactstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import { get, put } from 'helpers/api_helper';
import useSweetAlert from 'helpers/notifications';

const LivraisonPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { showSuccessAlert, showErrorAlert } = useSweetAlert();
    const authUser = JSON.parse(localStorage.getItem('authUser'));
    const [orderDetails, setOrderDetails] = useState(null);
    const [shippingInfo, setShippingInfo] = useState(null);

    useEffect(() => {
        const fetchShippingInfo = async () => {
            try {
                const response = await get(`http://127.0.0.1:8000/api/shipping-info/${orderId}`);
                setShippingInfo(response);
            } catch (error) {
                console.error('Error fetching shipping info:', error);
            }
        };

        const fetchOrderDetails = async () => {
            try {
                const response = await get(`http://127.0.0.1:8000/api/orders/${orderId}`);
                setOrderDetails(response);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        fetchShippingInfo();
        fetchOrderDetails();
    }, [orderId]);

    const validationSchema = Yup.object({
        phone_number: Yup.string().required('Please enter your phone number'),
        email: Yup.string().email('Invalid email').required('Please enter your email'),
        address: Yup.string().required('Please enter your address'),
        city: Yup.string().required('Please enter your city'),
        zip_code: Yup.string().required('Please enter your zip code'),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            phone_number: shippingInfo?.phone_number || '',
            email: shippingInfo?.email || '',
            address: shippingInfo?.address || '',
            city: shippingInfo?.city || '',
            zip_code: shippingInfo?.zip_code || '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await put(`http://127.0.0.1:8000/api/shipping-info/${shippingInfo.id}`, {
                    ...values,
                    order_id: orderId
                });
                showSuccessAlert("Success", "Shipping info updated successfully");
            } catch (error) {
                console.error('Error updating delivery info:', error);
                showErrorAlert("Error", "Failed to update shipping info");
            }
        },
    });

    const handleAddressSelect = (addressIndex) => {
        const selectedAddress = authUser.user.address[addressIndex];
        formik.setValues({
            phone_number: shippingInfo?.phone_number || '',
            email: shippingInfo?.email || '',
            address: selectedAddress.line,
            city: selectedAddress.city,
            zip_code: selectedAddress.zip,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        formik.handleSubmit();
    };

    if (!shippingInfo || !orderDetails) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="text-center">
                    <Spinner animation="border" role="status" className="text-primary">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <p className="mt-2 text-primary">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <Container className="livraison-page">
            <h1 className="text-center my-4 text-primary">Shipping</h1>
            <style>
        {`
          .checkout-page {
            background-size: cover;
            padding: 30px;
            border-radius: 15px;
          }

          .shipping-info-container {
            padding: 10px;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 8px;
          }

          .product-card {
            display: flex;
            align-items: center;
            padding: 5px;
          }

          
          .product-image {
            width: 150px;
            height: auto;
            border-radius: 8px;
            margin-right: 20px;
          }

          .product-name {
            color: #333;
            flex: 1;
          }

          .total-ttc-container {
            background-color: rgba(255, 255, 255, 0.9);
            border-radius: 8px;
            margin: 10px;
            text-align: center;
          }

          .total-ttc {
            font-size: 18px;
            color: #333;
          }

          .shipping-info-item {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
          }

          .shipping-info-label {
            font-weight: bold;
            color: #495057;
          }

          .shipping-info-value {
            color: #6c757d;
          }

          @media (max-width: 576px) {
            .shipping-info-container {
              padding: 10px;
            }

            .product-card {
              flex-direction: column;
              align-items: flex-start;
            }

            .product-image {
              margin-bottom: 10px;
            }
          }
          .product-info {
            display: flex;
            flex-direction: row;
            justify-content: flex-end
            gap: 5px;
            flex: 1;
            justify-content: space-between; /* Ensures the total is at the end */
          }
        
        ]
        
         
        `}
      </style>
            <Row>
                <Col md={7}>
                    <Card>
                        <CardBody>
                            <h4 className='text-primary'>Information de Livraison</h4>
                            <hr />
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={12}>
                                        <Label>Sélectionner une adresse:</Label>
                                        <Input type="select" onChange={(e) => handleAddressSelect(e.target.value)}>
                                            {authUser.user.address.map((address, index) => (
                                                <option key={index} value={index} selected={index==0}>{address.city} , {address.line} , {address.zip} </option>
                                            ))}
                                        </Input>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col md={6}>
                                        <Label>Numéro de téléphone</Label>
                                        <Input
                                            name="phone_number"
                                            type="text"
                                            value={formik.values.phone_number}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            invalid={formik.touched.phone_number && formik.errors.phone_number}
                                        />
                                        <FormFeedback>{formik.errors.phone_number}</FormFeedback>
                                    </Col>
                                    <Col md={6}>
                                        <Label>Email</Label>
                                        <Input
                                            name="email"
                                            type="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            invalid={formik.touched.email && formik.errors.email}
                                        />
                                        <FormFeedback>{formik.errors.email}</FormFeedback>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col md={12}>
                                        <Label>Adresse</Label>
                                        <Input
                                            name="address"
                                            type="text"
                                            value={formik.values.address}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            invalid={formik.touched.address && formik.errors.address}
                                        />
                                        <FormFeedback>{formik.errors.address}</FormFeedback>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col md={6}>
                                        <Label>Ville</Label>
                                        <Input
                                            name="city"
                                            type="text"
                                            value={formik.values.city}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            invalid={formik.touched.city && formik.errors.city}
                                        />
                                        <FormFeedback>{formik.errors.city}</FormFeedback>
                                    </Col>
                                    <Col md={6}>
                                        <Label>Code Postal</Label>
                                        <Input
                                            name="zip_code"
                                            type="text"
                                            value={formik.values.zip_code}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            invalid={formik.touched.zip_code && formik.errors.zip_code}
                                        />
                                        <FormFeedback>{formik.errors.zip_code}</FormFeedback>
                                    </Col>
                                </Row>
                                <Button type="submit" color="primary" className="mt-3">Mettre à jour</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={5}>
                    <Card className="mb-4">
                        <CardBody>
                            <h4 className="mb-3 text-primary">Order Details</h4>
                            <hr />
                            {orderDetails && (
                                <div>
                                    <div className="row">
                                        {orderDetails.products.map((product, index) => (
                                            <div key={index} className="col-12 mb-3">
                                                <div className="product-card">
                                                    <img
                                                        src={`http://127.0.0.1:8000/storage/${JSON.parse(product.product.images)[0]}`}
                                                        alt={product.product.name}
                                                        className="product-image"
                                                    />
                                                    <div className="product-info">
                                                        <div>
                                                            <h5 className="product-name">{product.quantity} x {product.product.name}</h5>
                                                            <p>{product.product.slug}</p>
                                                        </div>
                                                        <div className="product-total-container">
                                                            <p className="product-name"><strong>{product.price} MAD </strong></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="total-ttc-container">
                                        <div className="total-ttc">
                                            <p>Sous Total : <strong>{orderDetails.total_amount} MAD</strong></p>
                                            <p>Tax (20%) : <strong>{(orderDetails.total_amount * 0.2).toFixed(2)} MAD</strong></p>
                                            <hr />
                                            <p>Total TTC : <strong className='text-danger'>
                                                {(Number(orderDetails.total_amount) + (orderDetails.total_amount * 0.2)).toFixed(2)} MAD
                                            </strong></p>
                                        </div>
                                    </div>

                                    <Button color="success mt-2" onClick={() => navigate(`/checkout/${orderId}`)}>Continuer</Button>
                                </div>
                            )}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default LivraisonPage;
