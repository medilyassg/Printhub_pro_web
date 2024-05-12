import React, { useState, useEffect } from "react";
import {
  Row, Col, Card, CardBody, 
} from "reactstrap";

import Breadcrumbs from "../../../components/Common/Breadcrumb";
import "../../../../src/assets/scss/datatables.scss";
import { get } from "helpers/api_helper";
import CostumerTable from "./table";

const Costumerindex = () => {
  const [error, setError] = useState('');
  const [costumers, setcostumers] = useState([]);

  

  

  

  

  useEffect(() => {
    fetchCostumers();
  }, []);

  const fetchCostumers = async () => {
    try {
      const response = await get("http://127.0.0.1:8000/api/costumers");

      const data = await response.data;
      setcostumers(data);
    } catch (error) {
      setError(error.response.data.message);

    }
  };

  
  return (
    <React.Fragment>
      <div>




      </div>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs maintitle="users" title="costumers" breadcrumbItem="Costumer Table"  />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>


                  <CostumerTable costumers={costumers} />
                </CardBody>
              </Card>
            </Col>
          </Row>


        </div>
      </div>
    </React.Fragment>
  );
};

export default Costumerindex;
