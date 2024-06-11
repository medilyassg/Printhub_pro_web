import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { post, put } from 'helpers/api_helper';
import { useNavigate } from 'react-router-dom';
import Invoice from './Invoice';
import { pdf } from '@react-pdf/renderer';

const YouCanPay = (props) => {
    const navigate = useNavigate();

    const handleCancel = () => {
      navigate('/');
    };


    useEffect(async () => {
        
        try {
            const response = await post('http://127.0.0.1:8000/api/create-payment', {
                amount: props.order.total_amount,
                name: 'John Doe',
                address: '123 Main St',
                zip_code: '12345',
                city: 'City',
                state: 'State',
                country_code: 'US',
                phone: '1234567890',
                email: 'email@example.com',
            });

            const { token_id, redirect_url } = response;

            // Define ycPay variable outside of try block
            const ycPay = new YCPay('pub_442288b1-00e6-478d-89b1-a2e41913', {
                formContainer: '#payment-container',
                locale: 'en',
                isSandbox: true,
                errorContainer: '#error-container',
            });

            ycPay.setToken(token_id);
            ycPay.renderCreditCardForm();

            document.getElementById('pay').addEventListener('click', function () {
                ycPay.pay(token_id)
                    .then(successCallback)
                    .catch(errorCallback);
            });
            const generatePDF = async (order) => {
                const TempInvoiceComponent = <Invoice order={order} CompanyInfo={props.CompanyInfo} logoBase64={props.logoBase64} footerBase64={props.footerBase64}/>
            
                const asPdf = pdf(TempInvoiceComponent);
                const blob = await asPdf.toBlob();
                return blob;
            };

            function successCallback(response) {
                const updateTransaction = async () => {
                    try {
                        const pdfBlob = await generatePDF(props.order);
                        const pdfFile = new File([pdfBlob], 'invoice.pdf', { type: 'application/pdf' });
        
                        const formData = new FormData();
                        formData['status']= 'completed';
                        formData['payment_method']='youcanpay';
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
            }
            

            function errorCallback(response) {
                console.error('Payment failed:', response);
            }
        } catch (error) {
            console.error('Payment creation failed:', error);
        }
    },[])
    
    return (
        <div className="d-flex flex-column align-items-center justify-content-center ">
        <div id="error-container" className="mb-4"></div>
        <div id="payment-container" className="mb-4"></div>
        <div>
        <button
          id="pay"
          className="btn btn-success mx-2"
          style={{ width: '200px' }}
        >
          Validate Payment
        </button>
        <button
          id="cancel"
          className="btn btn-danger mx-2"
          style={{ width: '200px' }}
          onClick={handleCancel}
        >
          Cancel
        </button>
        </div>

      </div>
  
    );
};

export default YouCanPay;
