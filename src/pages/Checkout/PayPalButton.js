import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { pdf } from '@react-pdf/renderer';

import { get, post } from 'helpers/api_helper';
import { Col } from 'reactstrap';
import Invoice from './Invoice';
import { useNavigate } from 'react-router-dom';

const PayPalButton = (props) => {
    const navigate = useNavigate();

    const onCreateOrder = (data,actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: props.order.total_amount,
                    },
                },
            ],
        });
    }
    const generatePDF = async (order) => {
       
        const doc = <Invoice order={order} CompanyInfo={props.CompanyInfo} logoBase64={props.logoBase64} footerBase64={props.footerBase64}/>;
        const asPdf = pdf(doc);
        const blob = await asPdf.toBlob();
        return blob;
    };
    const onApproveOrder = (data,actions) => {
        return actions.order.capture().then((details) => {
            const updateTransaction = async () => {
                try {
                    const pdfBlob = await generatePDF(props.order);
                    const pdfFile = new File([pdfBlob], 'invoice.pdf', { type: 'application/pdf' });
    
                    const formData = new FormData();
                    formData['status']= 'completed';
                    formData['payment_method']='paypal';
                    formData['invoice']= pdfFile;
                    formData['_method']= 'PUT';
    
                    const updateResponse = await post(
                        `http://127.0.0.1:8000/api/transactions/${props.order.transaction.id}`,
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        }
                    );
                        navigate(`/checkout/success/${props.order.id}`)
                } catch (error) {
                    console.error('Error updating transaction:', error);
                }
            };
    
            updateTransaction();
        });
    }

    return (
        <div className="d-flex justify-content-center mb-4">
      <Col md={6}>

        <PayPalScriptProvider options={{ "client-id": "AY9Aots4xHL67L9c57IwGtfKB7G_M1WiDakD-O-Uc5cxN-wPh1n2m1vDlhdbK2nkFcPUoInmkDUR57WY" }}>
            <PayPalButtons
                createOrder={onCreateOrder}
                onApprove={onApproveOrder}
            />
        </PayPalScriptProvider>
        </Col>
        </div>
    );
};

export default PayPalButton;
