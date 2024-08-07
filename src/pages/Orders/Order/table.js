import React, { useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Input, ModalFooter } from "reactstrap";
//Import Breadcrumb
import "../../../assets/scss/datatables.scss";
import { useState } from "react";

import {

    Modal,
    ModalBody,
    ModalHeader,
    Button,
} from "reactstrap";
import usePermissions from "helpers/permissions";
import ProductView from "./product";
import { useNavigate } from "react-router-dom";




const OrderTable = (props) => {
    const [modal_products, setmodal_products] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [trackingModal, setTrackingModal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [trackingNumber, setTrackingNumber] = useState('');
    const { hasPermissions, checkUserPermissions } = usePermissions(); // Call the usePermissions hook
    useEffect(() => {
        checkUserPermissions();

    }, [])
    const navigate = useNavigate();
    const navigateToTracking = (trackingNumber) => {
        navigate(`/tracking/${trackingNumber}`);
    };
    const removeBodyCss = () => {
        document.body.classList.add("no_padding");
    };
    const toggleTrackingModal = () => setTrackingModal(!trackingModal);
    const tog_product = (order) => {
        setmodal_products(!modal_products);
        setSelectedOrder(order)
        removeBodyCss();
    };
    const handleProgressChange = (orderId, value) => {
        if (value === 'Delivered') {
            setSelectedOrderId(orderId);
            toggleTrackingModal();
        }
        props.handleProgressChange(orderId, value);
    };
    const handleSaveTrackingNumber = () => {
        props.saveTrackingNumber(selectedOrderId, trackingNumber);
        toggleTrackingModal();
        setTrackingNumber('');
    };

    const data = {
        columns: [
            {
                label: "Id",
                field: "id",
                sort: "asc",
                width: 150,
            },
            {
                label: "Progress",
                field: "progress",
                sort: "asc",
                width: 150,
            },
            {
                label: "Status",
                field: "status",
                sort: "asc",
                width: 150,
            },
            {
                label: "Ordered at",
                field: "time",
                sort: "asc",
                width: 150,
            },
            {
                label: "Products",
                field: "products",
                width: 150,
            },
            {
                label: "Tracking",
                field: "tracking",
                width: 150,
            }
        ],
        rows: props.orders?.map(order => ({
            id: order.id,
            progress: (<Input
                type="select"
                name="progress"
                value={order.progress}
                onChange={(e) => handleProgressChange(order.id, e.target.value)}
            >
                {props.progressOptions?.map(option => <option value={option}>{option}</option>)}
            </Input>),
            status: (<Input
                type="select"
                name="status"
                onChange={(e) => props.handleStatusChange(order.id, e.target.value)}
                value={order.status}
            >
                {order.status === 'accepted' ? (
                    <>
                        <option value="accepted">Accepted</option>
                        <option value="refused">Refused</option>
                    </>
                ) : (
                    <>
                        <option value="refused">Refused</option>
                        <option value="accepted">Accepted</option>
                    </>
                )}
            </Input>),
            time: new Date(order.created_at).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            }),
            products: (
                <div className="flex">
                    <button
                        className="btn btn-primary btn-sm mx-2"
                        onClick={() => {
                            tog_product(order)
                        }
                        }
                    >
                        <i className="ti-eye"></i>
                    </button>
                </div>
            ),
            tracking: (<div className="flex">
                <button
                    onClick={() => navigateToTracking(order.tracking_num)}
                    className="btn btn-light btn-sm mx-2"
                    disabled={!order.tracking_num}  // Disable the button if tracking number is null or empty
                >
                    <i className="ti-location-pin"></i>
                </button>
            </div>)
        })),
    };


    document.title = "Orders Table";

    return (
        <React.Fragment>
            <Col sm={6} md={4} xl={3}>
                <Modal isOpen={modal_products} toggle={tog_product} centered>
                    <ModalHeader className="mt-0" toggle={tog_product}>View Products</ModalHeader>
                    <ModalBody>
                        {selectedOrder && selectedOrder.order_products && selectedOrder.order_products.length > 0 ? (
                            selectedOrder.order_products.map(orderProduct => {
                                const productDetails = props.products.find(p => p.id === orderProduct.product_id);
                                return productDetails ? (
                                    <ProductView key={orderProduct.id} product={orderProduct} productDetails={productDetails} />
                                ) : (
                                    <p key={orderProduct.id}>Product details not found</p>
                                );
                            })
                        ) : (
                            <p>No products found for this order</p>
                        )}
                    </ModalBody>
                </Modal>
            </Col>
            <MDBDataTable responsive bordered data={data} />
            <Modal isOpen={trackingModal} toggle={toggleTrackingModal} centered>
                <ModalHeader toggle={toggleTrackingModal}>Enter Tracking Number</ModalHeader>
                <ModalBody>
                    <Input
                        required
                        type="text"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        placeholder="Enter Tracking Number"
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSaveTrackingNumber} >Save</Button>{' '}
                    <Button color="secondary" onClick={toggleTrackingModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
};

export default OrderTable;
