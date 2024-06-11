import { PDFDownloadLink, Document, pdf } from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button, Spinner } from 'reactstrap';
import Invoice from './Invoice';
import { get, post } from 'helpers/api_helper';

const SuccessPage = () => {
    const navigate = useNavigate();
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);
    const [CompanyInfo, setCompanyInfo] = useState(null);
    const [logoBase64, setLogoBase64] = useState("");
    const [footerBase64, setFooterBase64] = useState("");
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

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await get("http://127.0.0.1:8000/api/company-info");
            const data = response[0];
            setCompanyInfo(data);
    
            const logoResponse = await get(`http://127.0.0.1:8000/api/base64?logoFileName=${data.logo}`);
            setLogoBase64(logoResponse.base64);
            const footerResponse = await get(`http://127.0.0.1:8000/api/base64?logoFileName=${data.printed_footer}`);
            setFooterBase64(footerResponse.base64);
          } catch (error) {
            console.error('Error fetching company info:', error);
          }
        };
    
        fetchData();
      }, []);

    const handlePrintInvoice = () => {
        window.print();
    };

   
    

    const handleTrackOrders = () => {
        navigate('/account/orders')
    };

    if (!orderDetails || !CompanyInfo || !logoBase64 || !footerBase64) {
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
                        font-size: 36px;
                        margin-bottom: 20px;
                    }

                    .success-page p.lead {
                        color: #6c757d;
                        font-size: 18px;
                        margin-bottom: 30px;
                    }

                    .success-page .btn-primary {
                        background-color:rgb(98, 110, 212);
                        border-color:rgb(98, 110, 212);
                        margin-right: 10px;
                    }

                    .success-page .btn-link {
                        color:rgb(98, 110, 212);
                        text-decoration: none;
                        font-size: 16px;
                    }
                `}
            </style>
            <h1 className='text-success'>Order Successfully Placed!</h1>
            <p className="lead">Thank you for your purchase. Your order has been successfully placed and is being processed.</p>
            <div>
                <PDFDownloadLink
                    document={<Invoice order={orderDetails} CompanyInfo={CompanyInfo} logoBase64={logoBase64} footerBase64={footerBase64}/>}
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
