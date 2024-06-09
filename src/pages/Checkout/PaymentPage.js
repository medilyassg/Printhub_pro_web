import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody, Button, Spinner } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import paypalLogo from "../../assets/images/paypal.png";
import moroccanCardLogo from "../../assets/images/paypal.png";
import { get } from 'helpers/api_helper';

const PaymentPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {


        const fetchOrderDetails = async () => {
            try {
              const response = await get(`http://127.0.0.1:8000/api/orders/${orderId}`);
              setOrderDetails(response);
            } catch (error) {
              console.error('Error fetching order details:', error);
            }
          };
      
          fetchOrderDetails();

    }, [orderId]);
    const handlePaymentMethodSelect = (method) => {
        setSelectedPaymentMethod(method);
    };

    const handleCheckout = () => {
        if (selectedPaymentMethod) {
            navigate(`/checkout/payment/${orderId}/${selectedPaymentMethod}`);
        } else {
            // Show error or alert indicating that a payment method needs to be selected
        }
    };
    if (!orderDetails) {
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
        <Container className="payment-page">
            <h1 className="text-center my-4 text-primary">Payment method</h1>
            <style>
                {`
                .payment-methods {
                    margin-top:20px;
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap:20px
                }

                .payment-method-card {
                    padding: 20px;
                    border: 2px solid transparent;
                    border-radius: 10px;
                    cursor: pointer;
                    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
                    transition: all 0.3s ease;
                    display:flex;
                    justify-content:center;
                    align-items:center;

                }

                .payment-method-card:hover {
                    border-color: #007bff;
                }

                .selected {
                    border-color: #007bff !important;
                }

                .payment-method-logo {
                    max-width: 100px;
                    margin-bottom: 10px;
                    display: block;
                    margin: 0 auto;
                }

                .payment-method-name {
                    text-align: center;
                    font-weight: bold;
                }

                .total-cost {
                    font-size: 24px;
                    text-align: center;
                    margin-bottom: 20px;
                }
                `}
            </style>
            <Row>
                <Col md={8}>
                    <Card>
                        <CardBody>
                            <h4>Choose a payment method</h4>
                            <Row className="payment-methods">
                                <Col  className={`payment-method-card ${selectedPaymentMethod === 'paypal' ? 'selected' : ''}`} onClick={() => handlePaymentMethodSelect('paypal')}>
                                    <div>
                                        <img src={paypalLogo} alt="PayPal" className="payment-method-logo" />
                                        <p className="payment-method-name">PayPal</p>
                                    </div>
                                </Col>
                                <Col  className={`payment-method-card ${selectedPaymentMethod === 'youcanpay' ? 'selected' : ''}`} onClick={() => handlePaymentMethodSelect('youcanpay')}>
                                    <div >
                                        <img src="https://youcanpay.com/build/assets/ycpay-logo-pOUj4Wo3.svg" alt="Moroccan Card" className="payment-method-logo" />
                                        <p className="payment-method-name">Moroccan Credit Card</p>
                                    </div>
                                </Col>

                            </Row>
                        </CardBody>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card>
                        <CardBody>
                            <h4>Total TTC</h4>
                            <p>{orderDetails.total_amount} MAD</p>
                            <Button color="success" onClick={handleCheckout}>Continuer</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default PaymentPage;
