import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, Button, Form, Label, Input, FormFeedback, Spinner } from 'reactstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import { get, post, put } from 'helpers/api_helper';
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
        )
      }
    return (
        <Container className="livraison-page">
            <h1 className="text-center my-4 text-primary">Shipping</h1>
            <Row>
                <Col md={8}>
                    <Card>
                        <CardBody>
                            <h4>Information de Livraison</h4>
                            <Form onSubmit={formik.handleSubmit}>
                                <Row>
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
                <Col md={4}>
                    <Card>
                        <CardBody>
                            <h4>Total TTC</h4>
                            <p>{orderDetails.total_amount} MAD</p>
                            <Button color="success" onClick={() => navigate(`/checkout/${orderId}`)}>Continuer</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default LivraisonPage;
