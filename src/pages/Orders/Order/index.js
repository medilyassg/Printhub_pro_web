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
        console.log('Form Values:', value);
        try {
            const response = await put(`http://127.0.0.1:8000/api/orders/${id}`, { status: value, id: id });
            showSuccessAlert('Update Order status ', response.message);

            setError('');
            fetchOrders();

        } catch (error) {
            showErrorAlert('Update Order status ', error.response.data.message);

        }
    }
    useEffect(() => {
        fetchOrders();
        checkUserPermissions()
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await get("http://127.0.0.1:8000/api/orders");

            const data = await response.orders;
            setOrders(data);
            console.log(orders)
        } catch (error) {
            setError(error.response.data.message);

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
                                    <OrderTable orders={orders}  handleStatusChange={handleEdit} /> 
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