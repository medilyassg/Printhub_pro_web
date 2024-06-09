import { PDFDownloadLink } from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button } from 'reactstrap';
import Invoice from './Invoice';
import { get, post } from 'helpers/api_helper';

const SuccessPage = () => {
    const navigate = useNavigate();
    const { orderId } = useParams();
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

    const handlePrintInvoice = () => {
        window.print();
    };

   
    

    const handleTrackOrders = () => {
        
    };

    return (
        <Container className="success-page text-center d-flex flex-column justify-content-center">
            <style>
                {`
                    .success-page {
                        background-color: #f8f9fa;
                        padding: 40px;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        max-width: 600px;
                        margin: auto;
                        margin-top:20vh;
                    }

                    .success-icon {
                        color: #28a745;
                        font-size: 64px;
                        margin-bottom: 20px;
                    }

                    .success-page h1 {
                        color: #28a745;
                        font-size: 36px;
                        margin-bottom: 20px;
                    }

                    .success-page p.lead {
                        color: #6c757d;
                        font-size: 18px;
                        margin-bottom: 30px;
                    }

                    .success-page .btn-primary {
                        background-color: #007bff;
                        border-color: #007bff;
                        margin-right: 10px;
                    }

                    .success-page .btn-link {
                        color: #007bff;
                        text-decoration: none;
                        font-size: 16px;
                    }
                `}
            </style>
            <h1>Order Successfully Placed!</h1>
            <p className="lead">Thank you for your purchase. Your order has been successfully placed and is being processed.</p>
            <div>
                <PDFDownloadLink
                    document={<Invoice order={orderDetails} />}
                    fileName="invoice.pdf"
                >
                    <Button color="primary">
                        Print Invoice
                    </Button>
                </PDFDownloadLink>
                <Button color="link" onClick={handleTrackOrders} className="btn-link">
                    Track Your Orders
                </Button>
            </div>
        </Container>
    );
};

export default SuccessPage;
