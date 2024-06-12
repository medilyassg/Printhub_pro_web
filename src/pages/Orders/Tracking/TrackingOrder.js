import Breadcrumbs from "../../../components/Common/Breadcrumb";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";

const TrackingOrder = () => {
    const { trackingNumber } = useParams();
    const [trackingInfo, setTrackingInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrackingInfo = async () => {
            if (!trackingNumber) {
                setError("This order isn't shipped yet.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`https://api.chronodiali.ma/ma/dash/1.2/public/orders?tracking_id=${trackingNumber}`);
                const data = await response.json();

                if (data.error) {
                    setError(data.error.message);
                } else {
                    setTrackingInfo(data);
                }
            } catch (err) {
                setError("Failed to fetch tracking information.");
            }
            setLoading(false);
        };

        fetchTrackingInfo();
    }, [trackingNumber]);
    console.log('dwfh '+error)
    console.log('dwfhh '+trackingInfo)
    document.title = "Orders Tracking";
    return (
        <React.Fragment>
            <style>{`
                    .timeline-with-icons {
                    border-left: 1px solid hsl(0, 0%, 90%);
                    position: relative;
                    list-style: none;
                    }

                    .timeline-with-icons .timeline-item {
                    position: relative;
                    }

                    .timeline-with-icons .timeline-item:after {
                    position: absolute;
                    display: block;
                    top: 0;
                    }

                    .timeline-with-icons .timeline-icon {
                    position: absolute;
                    left: -48px;
                    background-color: hsl(217, 88.2%, 90%);
                    color: hsl(217, 88.8%, 35.1%);
                    border-radius: 50%;
                    height: 31px;
                    width: 31px;
                    display: flex;
                    align-items: center;
                    justify-content: center;`
            }</style>
            {console.log(trackingInfo)}
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs maintitle="Orders" title="Tracking" breadcrumbItem="Tracking Orders" />

                    <Row>
                        <Col className="col-12">

                            {trackingInfo ? (
                                <div>
                                    <section className="py-5">
                                        <ul className="timeline-with-icons">
                                            <li className="timeline-item mb-5">
                                                <span className="timeline-icon">
                                                    <i className="ti-timer"></i>
                                                </span>
                                                <h5 className="fw-bold">Order ID: {trackingInfo.id}</h5>
                                                <p className="text-muted mb-2 fw-bold">Status: {trackingInfo.status}</p>
                                                <p className="text-muted mb-2 fw-bold">Granular Status: {trackingInfo.granular_status}</p>
                                                <p className="text-muted mb-2 fw-bold">Shipper: {trackingInfo.shipper_short_name}</p>
                                                <p className="text-muted mb-2 fw-bold">Delivery Start Date: {trackingInfo.delivery_start_date}</p>
                                                <p className="text-muted mb-2 fw-bold">Delivery End Date: {trackingInfo.delivery_end_date}</p>
                                            </li>
                                            {trackingInfo.events.map(event => (
                                                <li className="timeline-item mb-5" key={event.time}>
                                                    <span className="timeline-icon">
                                                        <i className="ti-timer"></i>
                                                    </span>
                                                    <h5 className="fw-bold">Event Type: {event.type}</h5>
                                                    <p className="text-muted mb-2 fw-bold">Time: {new Date(event.time).toLocaleString()}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                </div>
                            ) : (
                                <div>No tracking information available.</div>
                            )}

                        </Col>
                    </Row>
                </div>

            </div>
        </React.Fragment>
    );
};

export default TrackingOrder;
