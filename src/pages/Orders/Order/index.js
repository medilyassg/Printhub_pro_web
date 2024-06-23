import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import {
    Row, Col, Card, CardBody, CardTitle, CardSubtitle, Modal,
    ModalBody,
    ModalHeader,
} from "reactstrap";

import Breadcrumbs from "../../../components/Common/Breadcrumb";
import "../../../../src/assets/scss/datatables.scss";
import { post, get, del, put } from "helpers/api_helper";
import OrderTable from "./table";
import useSweetAlert from "helpers/notifications";
import usePermissions from "helpers/permissions";


const OrderIndex = () => {
    const [modal_add, setmodal_add] = useState(false);
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    const [progressOptions, setProgressOptions] = useState([]);
    const [error, setError] = useState('');
    const { showSuccessAlert, showErrorAlert } = useSweetAlert();
    const { hasPermissions, checkUserPermissions } = usePermissions(); // Call the usePermissions hook

    const removeBodyCss = () => {
        document.body.classList.add("no_padding");
    };

    const tog_add = () => {
        setmodal_add(!modal_add);
        removeBodyCss();
    };
    const handleEdit = async (id, value) => {
        try {
            const response = await put(`http://127.0.0.1:8000/api/orders/${id}`, { status: value, id: id });
            showSuccessAlert('Update Order status ', response.message);
            setError('');
            fetchOrders();

        } catch (error) {
            showErrorAlert('Update Order status ', error.response.message);

        }
    }
    const handleEditProgress = async (id, value) => {
        try {
            const response = await put(`http://127.0.0.1:8000/api/orders/progress/${id}`, { progress: value, id: id });
            showSuccessAlert('Update Order Progress ', response.message);
            setError('');
            fetchOrders();

        } catch (error) {
            showErrorAlert('Update Order Progress ', error.response.message);

        }
    }
    useEffect(() => {
        fetchOrders();
        fetchProducts();
        checkUserPermissions()
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await get("http://127.0.0.1:8000/api/orders");
            console.log(response)
            setOrders(response.orders.original.orders);
            setProgressOptions(response.orders.original.progressOptions);
        } catch (error) {
            // setError(error.response.data.message);

        }
    };
    const fetchProducts = async () => {
        try {
            const response = await get(`http://127.0.0.1:8000/api/products`);

            const data = await response.data;
            setProducts(data);
            console.log(products)
        }
        catch (error) {
            setError(error.response.data.message);

        }
    };
    const saveTrackingNumber = async (orderId, trackingNumber) => {
        try {
            const response =await put(`http://127.0.0.1:8000/api/orders/${orderId}/tracking`, { tracking_num: trackingNumber, id: orderId });
            showSuccessAlert('Adding Order Tracking Number ', response.message);
            setError('');
            fetchOrders();

        } catch (error) {
            showErrorAlert('Adding Order Tracking Number', error.response.message);

        }
       
    };
    
    document.title = "Orders Table";
    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs maintitle="Orders" title="order" breadcrumbItem="Order Table"/>

                    <Row>
                        <Col className="col-12">
                            <Card>
                                <CardBody>
                                    <OrderTable orders={orders} products={products} progressOptions={progressOptions} handleStatusChange={handleEdit} handleProgressChange={handleEditProgress} saveTrackingNumber={saveTrackingNumber}/> 
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </React.Fragment>
    );
};

export default OrderIndex;