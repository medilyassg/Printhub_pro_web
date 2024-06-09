import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Button,
    Form,
    FormFeedback,
    Label,
    Input
} from "reactstrap";
import paypalogo from "../../assets/images/paypal.png";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// Redux
import { connect } from "react-redux";
import withRouter from 'components/Common/withRouter';

// Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";

// actions
import useSweetAlert from 'helpers/notifications';
import { get, post, put } from 'helpers/api_helper';

const PaymentCredentials = () => {
    const { showSuccessAlert, showErrorAlert } = useSweetAlert();

    const [paymentCredentials, setPaymentCredentials] = useState(null);
    const [id, setId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await get("http://127.0.0.1:8000/api/payment-credentials");
                if (response && response.length > 0) {
                    const data = response[0];
                    setPaymentCredentials(data);
                    setId(data.id);
                }
            } catch (error) {
                console.error('Error fetching payment credentials:', error);
            }
        };

        fetchData();
    }, []);

    const validationSchema = Yup.object({
       
    });

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            paypal_client_id: paymentCredentials?.paypal_client_id || '',
            paypal_client_secret: paymentCredentials?.paypal_client_secret || '',
            youcanpay_private_key: paymentCredentials?.youcanpay_private_key || '',
            youcanpay_public_key: paymentCredentials?.youcanpay_public_key || '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                let response;
                if (id) {
                    response = await put(`http://127.0.0.1:8000/api/payment-credentials/${id}`, values);
                } else {
                    response = await post('http://127.0.0.1:8000/api/payment-credentials', values);
                }
                setPaymentCredentials(response);
                showSuccessAlert('Payment Credentials', 'Payment credentials updated successfully');
            } catch (error) {
                showErrorAlert('Payment Credentials', error.response.data.message);
            }
        }
    });

    document.title = "Payment Credentials";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumb */}
                    <Breadcrumb title="admin" breadcrumbItem="Payment Credentials" />

                    <h4 className="card-title mb-4">Update Payment Credentials</h4>

                    <Card>
                        <CardBody>
                            <Form
                                className="form-horizontal"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    validation.handleSubmit();
                                    return false;
                                }}
                            >
                                <Row>
                                    <Col sm={6}>
                                    <div className='text-center mt-2'>

                                    <img src={paypalogo} alt="PayPal Logo" style={{ maxWidth: "80px", marginBottom: "20px" }} />
                                    </div>
                                        <div className="form-group ">
                                            <Label className="form-label">PayPal Client ID</Label>
                                            <Input
                                                name="paypal_client_id"
                                                className="form-control"
                                                placeholder="Enter PayPal Client ID"
                                                type="text"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.paypal_client_id}
                                                invalid={validation.touched.paypal_client_id && validation.errors.paypal_client_id ? true : false}
                                            />
                                            {validation.touched.paypal_client_id && validation.errors.paypal_client_id ? (
                                                <FormFeedback type="invalid">{validation.errors.paypal_client_id}</FormFeedback>
                                            ) : null}
                                        </div>

                                        <div className="form-group">
                                            <Label className="form-label">PayPal Client Secret</Label>
                                            <Input
                                                name="paypal_client_secret"
                                                className="form-control"
                                                placeholder="Enter PayPal Client Secret"
                                                type="text"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.paypal_client_secret}
                                                invalid={validation.touched.paypal_client_secret && validation.errors.paypal_client_secret ? true : false}
                                            />
                                            {validation.touched.paypal_client_secret && validation.errors.paypal_client_secret ? (
                                                <FormFeedback type="invalid">{validation.errors.paypal_client_secret}</FormFeedback>
                                            ) : null}
                                        </div>
                                    </Col>

                                    <Col sm={6}>
                                        <div className='text-center mt-2'>
                                        <img  style={{ maxWidth: "140px", marginBottom: "20px" }} src="https://youcanpay.com/build/assets/ycpay-logo-pOUj4Wo3.svg" alt="logo" />

                                        </div>

                                        <div className="form-group ">
                                            <Label className="form-label">YouCanPay Private Key</Label>
                                            <Input
                                                name="youcanpay_private_key"
                                                className="form-control"
                                                placeholder="Enter YouCanPay Private Key"
                                                type="text"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.youcanpay_private_key}
                                                invalid={validation.touched.youcanpay_private_key && validation.errors.youcanpay_private_key ? true : false}
                                            />
                                            {validation.touched.youcanpay_private_key && validation.errors.youcanpay_private_key ? (
                                                <FormFeedback type="invalid">{validation.errors.youcanpay_private_key}</FormFeedback>
                                            ) : null}
                                        </div>

                                        <div className="form-group">
                                            <Label className="form-label">YouCanPay Public Key</Label>
                                            <Input
                                                name="youcanpay_public_key"
                                                className="form-control"
                                                placeholder="Enter YouCanPay Public Key"
                                                type="text"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.youcanpay_public_key}
                                                invalid={validation.touched.youcanpay_public_key && validation.errors.youcanpay_public_key ? true : false}
                                            />
                                            {validation.touched.youcanpay_public_key && validation.errors.youcanpay_public_key ? (
                                                <FormFeedback type="invalid">{validation.errors.youcanpay_public_key}</FormFeedback>
                                            ) : null}
                                        </div>
                                    </Col>
                                </Row>

                                <div className="text-center mt-4">
                                    <Button type="submit" color="danger">
                                        Update Payment Credentials
                                    </Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    );
};

PaymentCredentials.propTypes = {
    error: PropTypes.any,
    success: PropTypes.any
};

const mapStatetoProps = state => {
    const { error, success } = state.Profile;
    return { error, success };
};

export default withRouter(
    connect(mapStatetoProps)(PaymentCredentials)
);
