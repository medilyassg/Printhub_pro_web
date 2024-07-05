import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody, Button, Spinner } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import paypalLogo from "../../assets/images/paypal.png";
import youcanpaylogo from "../../assets/images/youcanpay.svg";
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
                    gap:20px;
                    padding:5px
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
                            <h4>Choose a payment method</h4>
                            <hr></hr>
                            <Row className="payment-methods">
                                <Col  className={`payment-method-card ${selectedPaymentMethod === 'paypal' ? 'selected' : ''}`} onClick={() => handlePaymentMethodSelect('paypal')}>
                                    <div>
                                        <img src={paypalLogo} alt="PayPal" className="payment-method-logo" />
                                        <p className="payment-method-name">PayPal</p>
                                    </div>
                                </Col>
                                <Col  className={`payment-method-card ${selectedPaymentMethod === 'youcanpay' ? 'selected' : ''}`} onClick={() => handlePaymentMethodSelect('youcanpay')}>
                                    <div >
                                        <img src={youcanpaylogo} alt="Moroccan Card" className="payment-method-logo" />
                                        <p className="payment-method-name">Moroccan Credit Card</p>
                                    </div>
                                </Col>
                                <Col  className={`payment-method-card ${selectedPaymentMethod === 'bank' ? 'selected' : ''}`} onClick={() => handlePaymentMethodSelect('bank')}>
                                    <div >
                                        <img src="https://www.e-carte-bleue.net/wp-content/uploads/2016/11/Virement-bancaire.png" alt="Moroccan Card" className="payment-method-logo" />
                                        <p className="payment-method-name">vairment Bancaire </p>
                                    </div>
                                </Col>

                            </Row>
                        </CardBody>
                    </Card>
                </Col>

                
                <Col md={5}>
                    
                    <Card className="mb-4">
            <CardBody>
              <h4 className="mb-3 text-primary">Order Details</h4>
              <hr></hr>

              {orderDetails && (
                <div>
                  <div className="row">
                    {orderDetails.products.map((product, index) => (
                      <div key={index} className="col-12 mb-3">
                        <div className="product-card">
                    <img 
                        src={`${product.product.images
                          ? `http://127.0.0.1:8000/storage/${
                              JSON.parse(product.product.images)[0]
                            }`
                          : ""}`}
                        alt={product.product.name} 
                        className="product-image" 
                    />
                   <div className="product-info">
                    <div>
                    <h5 className="product-name">{product.quantity} x {product.product.name}</h5>
                    <p>{product.product.slug}</p>
                    </div>

  <div className="product-total-container">
    <p className="product-name"><strong>{product.price}  MAD </strong></p>
  </div>
</div>

                    </div>
                    <hr></hr>
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

<Button color="success mt-2" onClick={handleCheckout}>Continuer</Button>

                </div>
              )}
            </CardBody>
          </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default PaymentPage;
