import React from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import "../../../../src/assets/scss/datatables.scss";
import  { useState } from "react";

import {
  
  Modal,
  ModalBody,
  ModalHeader,
  Button,
} from "reactstrap";

//Import Breadcrumb



const UserTable = () => {
    const [modal_edit, setmodal_edit] = useState(false);
    const [modal_delete, setmodal_delete] = useState(false);

    const removeBodyCss = () => {
      document.body.classList.add("no_padding");
    };
  
    const tog_edit = () => {
      setmodal_edit(!modal_edit);
      removeBodyCss();
    };
    const tog_delete = () => {
      setmodal_delete(!modal_delete);
      removeBodyCss();
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
                label: "Name",
                field: "name",
                sort: "asc",
                width: 150,
            },
            {
                label: "Email",
                field: "email",
                sort: "asc",
                width: 150,
            },
            {
                label: "Actions",
                field: "actions",
                width: 150,
            },
        ],
        rows: [
            {
                id: "1",
                name: "Tiger Nixon",
                email: "System Architect",
                actions: (
                    <div className="flex">
                        <button className="btn btn-info btn-sm mx-2" onClick={tog_edit}>
                        <i className="ti-pencil-alt "></i>                        </button>
                        <button className="btn btn-danger btn-sm" onClick={tog_delete}>
                        <i className="ti-trash"></i>
                                                </button>
                    </div>
                ),
            },
            // Add more rows as needed
        ],
    };

    const handleEdit = (id) => {
        // Implement edit functionality
        console.log("Edit action for id:", id);
    };

    const handleDelete = (id) => {
        // Implement delete functionality
        console.log("Delete action for id:", id);
    };

    document.title = "Users Table | Veltrix - React Admin & Dashboard Template";
    
    return (
        <React.Fragment>
            <Col sm={6} md={4} xl={3}>
                      
                      <Modal isOpen={modal_edit} toggle={tog_edit} centered>
                        <ModalHeader className="mt-0" toggle={tog_edit}>Edit User</ModalHeader>
                        <ModalBody>
                          
                        </ModalBody>
                      </Modal>
                    </Col>
            <Col sm={6} md={4} xl={3}>
                      
                      <Modal isOpen={modal_delete} toggle={tog_delete} centered>
                        <ModalHeader className="mt-0" toggle={tog_delete}>Delete User</ModalHeader>
                        <ModalBody>
                        <Row>
          <Col lg={12}>
            <div className="text-center">
              <i
                className="mdi mdi-alert-circle-outline"
                style={{ fontSize: "9em", color: "orange" }}
              />
              <h2>Are you sure?</h2>
              <h4>{"You won't be able to revert this!"}</h4>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-success btn-lg ms-2"
                // onClick={}
              >
                Yes, delete it!
              </button>
              <button
                type="button"
                className="btn btn-danger btn-lg ms-2"
                onClick={tog_delete}
              >
                Cancel
              </button>
            </div>
          </Col>
        </Row>
                        </ModalBody>
                      </Modal>
                    </Col>
            <MDBDataTable responsive bordered data={data} />
        </React.Fragment>
    );
};

export default UserTable;
