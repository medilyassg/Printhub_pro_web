import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";
import { withTranslation } from "react-i18next";
import "chartist/dist/scss/chartist.scss";
import 'bootstrap-icons/font/bootstrap-icons.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const Dashboard = props => {
  document.title = "Dashboard";

  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    products: 0,
    orders: 0,
    transactions: [100, 200, 300, 400],
    activeUsersOverTime: [100, 70, 88, 40, 78, 100]
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/users");
        const jsonData = await response.json();

        const totalUserCount = jsonData.data.length;
        
        console.log("Number of users:", totalUserCount);

        setStats(prevStats => ({
          ...prevStats,
          totalUsers: totalUserCount,
        }));
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchActiveUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/customers");
        const jsonData = await response.json();

        const activeUserCount = jsonData.data.length;
        
        console.log("Number of active users:", activeUserCount);

        setStats(prevStats => ({
          ...prevStats,
          activeUsers: activeUserCount,
        }));
      } catch (error) {
        console.error("Error fetching active users data:", error);
      }
    };

    fetchActiveUsers();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/products");
        const jsonData = await response.json();

        const productCount = jsonData.data.length;
        
        console.log("Number of products:", productCount);

        setStats(prevStats => ({
          ...prevStats,
          products: productCount,
        }));
      } catch (error) {
        console.error("Error fetching products data:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/orders");
        const jsonData = await response.json();

        const orderCount = jsonData.data.length;
        
        console.log("Number of orders:", orderCount);

        setStats(prevStats => ({
          ...prevStats,
          orders: orderCount,
        }));
      } catch (error) {
        console.error("Error fetching orders data:", error);
      }
    };

    fetchOrders();
  }, []);

  const barData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Transactions",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: stats.transactions,
      },
    ],
  };

  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Active Users",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: stats.activeUsersOverTime,
      },
    ],
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="page-title-box">
            <Row className="align-items-center">
              <Col md={8}>
                <h6 className="page-title"></h6>
              </Col>
            </Row>
          </div>

          {/* Welcome Back Section */}
          <Row>
            <Col>
              <Card className="text-center mb-4">
                <CardBody>
                  <i className="bi bi-person-circle display-4 text-primary"></i>
                  <h4 className="card-title mt-3">Welcome Back, Admin!</h4>
                  <p className="card-text">Here's a quick overview of your dashboard statistics.</p>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Profile Statistics Section */}
          <Row>
            <Col md={3}>
              <Card className="text-center">
                <CardBody>
                  <i className="bi bi-people-fill display-4 text-primary"></i>
                  <h5 className="card-title mt-3">Total Users</h5>
                  <p className="card-text">{stats.totalUsers}</p>
                </CardBody>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center">
                <CardBody>
                  <i className="bi bi-person-check-fill display-4 text-success"></i>
                  <h5 className="card-title mt-3">Active Users</h5>
                  <p className="card-text">{stats.activeUsers}</p>
                </CardBody>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center">
                <CardBody>
                  <i className="bi bi-box-seam display-4 text-info"></i>
                  <h5 className="card-title mt-3">Products</h5>
                  <p className="card-text">{stats.products}</p>
                </CardBody>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center">
                <CardBody>
                  <i className="bi bi-receipt display-4 text-warning"></i>
                  <h5 className="card-title mt-3">Orders</h5>
                  <p className="card-text">{stats.orders}</p>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Charts Section */}
          <Row>
            <Col md={6}>
              <Card>
                <CardBody>
                  <h5 className="card-title">Transactions Over Time</h5>
                  <Bar data={barData} />
                </CardBody>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <CardBody>
                  <h5 className="card-title">Active Users Over Time</h5>
                  <Line data={lineData} />
                </CardBody>
              </Card>
            </Col>
          </Row>

        </Container>
      </div>
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  t: PropTypes.any,
};

export default withTranslation()(Dashboard);
