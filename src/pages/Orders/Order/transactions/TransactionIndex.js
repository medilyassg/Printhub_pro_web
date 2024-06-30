import React, { useEffect, useState } from "react";
import {
    Row, Col, Card, CardBody, 
} from "reactstrap";

import Breadcrumbs from "../../../../components/Common/Breadcrumb";
import "../../../../../src/assets/scss/datatables.scss";
import {  get } from "helpers/api_helper";
import usePermissions from "helpers/permissions";
import TransactionsTable from "./TransactionsTable";


const TransactionIndex = () => {
    const [transactions, setTransactions] = useState([])

    const { hasPermissions, checkUserPermissions } = usePermissions() // Call the usePermissions hook
  useEffect(() => {
    checkUserPermissions()
  }, [])
    
    
    useEffect(() => {
        fetchTransactions();
        
    }, []);

    const fetchTransactions = async () => {
        try {
            const response = await get("http://127.0.0.1:8000/api/transactions");
            setTransactions(response);
        } catch (error) {
            // setError(error.response.data.message);

        }
    };
    
    if(!hasPermissions.browseTransactions){
        return ""
    }
    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs maintitle="Transactions" title="transactions" breadcrumbItem="Transactions Table"/>

                    <Row>
                        <Col className="col-12">
                            <Card>
                                <CardBody>
                                    <TransactionsTable transactions={transactions}  /> 
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </React.Fragment>
    );
};

export default TransactionIndex;