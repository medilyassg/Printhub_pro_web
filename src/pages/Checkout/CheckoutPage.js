import React, { useState, useEffect } from 'react';
import { Container, Card, CardBody, Spinner } from 'reactstrap';
import { useParams } from 'react-router-dom';
import YouCanPay from './YouCanPay';
import { get } from 'helpers/api_helper';
import PayPalButton from './PayPalButton';

const CheckoutPage = () => {
  const { orderId, selectedPaymentMethod } = useParams();
  const [shippingInfo, setShippingInfo] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

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
    );
  }

  return (
    <Container className="checkout-page">
      <h1 className="text-center my-4 text-primary">Checkout</h1>
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
            border-radius: 8px;
            padding: 20px;
            background-color: rgba(255, 255, 255, 0.9);
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s;
          }

          .product-card:hover {
            transform: scale(1.05);
          }

          .product-image {
            width: 100px;
            height: auto;
            border-radius: 8px;
            margin-right: 20px;
          }

          .product-name {
            margin-bottom: 10px;
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
        `}
      </style>
      <div className="row">
        {/* Left Column */}
        <div className="col-md-6">
          {/* Shipping Info Section */}
          <Card className="mb-4">
            <CardBody>
              <h4 className="mb-3 text-primary">Shipping Info</h4>
              <hr></hr>
              {shippingInfo && (
                <div className="shipping-info-container">
                  <div className="shipping-info-item">
                    <div>
                      <div className="shipping-info-label">Shipping To:</div>
                      <div className="shipping-info-value">{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.zip_code}</div>
                    </div>
                  </div>
                  <div className="shipping-info-item">
                    <div>
                      <div className="shipping-info-label">Phone Number:</div>
                      <div className="shipping-info-value">{shippingInfo.phone_number}</div>
                    </div>
                  </div>
                  <div className="shipping-info-item">
                    <div>
                      <div className="shipping-info-label">Email:</div>
                      <div className="shipping-info-value">{shippingInfo.email}</div>
                    </div>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>

          {/* Payment Section */}
          <Card>
            <CardBody>
              <h4 className="mb-3 text-primary">Payment Section</h4>
              {selectedPaymentMethod === 'youcanpay' && <YouCanPay order={orderDetails} />}
              {selectedPaymentMethod === 'paypal' && <PayPalButton order={orderDetails} />}
            </CardBody>
          </Card>
        </div>

        {/* Right Column */}
        <div className="col-md-6">
          {/* Order Details Section */}
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
                          <img src={`http://127.0.0.1:8000/storage/${JSON.parse(product.product.images)[0]}`} alt={product.product.name} className="product-image" />
                          <div className="d-flex flex-column gap-1">
                            <h5 className="product-name">{product.product.name}</h5>
                            <p><strong>Quantity:</strong> {product.quantity}</p>
                            <p><strong>Total:</strong> {product.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <hr></hr>

                  <div className="total-ttc-container">
                    <div className="total-ttc">
                      <p>Total TTC :    <strong>{orderDetails.total_amount} MAD </strong></p>
                    </div>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default CheckoutPage;
