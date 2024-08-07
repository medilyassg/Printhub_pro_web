import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Badge } from "reactstrap";

import "../../../../src/assets/scss/datatables.scss";

import {

  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { get, put } from "helpers/api_helper";
import EditUserForm from "./EditUserForm";
import usePermissions from "helpers/permissions";

//Import Breadcrumb



const UserTable = (props) => {
  const [modal_edit, setmodal_edit] = useState(false);
  const [modal_delete, setmodal_delete] = useState(false);
  const [SelectedUser, setSlectedUser] = useState(null);
  const { hasPermissions, checkUserPermissions } = usePermissions(); // Call the usePermissions hook

  const removeBodyCss = () => {
    document.body.classList.add("no_padding");
  };
  useEffect(()=>{
    checkUserPermissions();

  },[])
  const tog_edit = (user) => {
    setmodal_edit(!modal_edit);
    setSlectedUser(user)
    removeBodyCss();
  };
  const tog_delete = (user) => {
    setmodal_delete(!modal_delete);
    setSlectedUser(user)
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
        label: "Phone Number",
        field: "phone_number",
        sort: "asc",
        width: 150,
      },
      {
        label: "Roles",
        field: "roles",
        sort: "asc",
        width: 150,
      },
      {
        label: "Actions",
        field: "actions",
        width: 150,
      },
    ],
    rows: props.users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone_number: user.phone_number,
      roles:(
        <div className="d-flex align-items-center">
      {user.roles.map((role) => (
        <Badge color="primary" key={role.id} className="rounded-pill bg-primary mx-1">
        {role.name}
      </Badge>
      ))}
    </div>
      ),
      actions: (
        <div className="d-flex align-items-center">
          {hasPermissions.updateUser && 
           <button className="btn btn-info btn-sm mx-2" onClick={() => tog_edit(user)}>
           <i className="ti-pencil-alt"></i>
         </button>
          }
          {hasPermissions.deleteUser && 

          <button className="btn btn-danger btn-sm mx-2" onClick={() => tog_delete(user)}>
            <i className="ti-trash"></i>
          </button>
          }
        </div>
      ),
    })),
  };





  document.title = "User Table ";

  return (
    <React.Fragment>

      <Col sm={6} md={4} xl={3}>

        <Modal isOpen={modal_edit} toggle={tog_edit} centered>
          <ModalHeader className="mt-0" toggle={tog_edit}>Edit User</ModalHeader>
          <ModalBody>
            <EditUserForm userData={SelectedUser} handleEdit={(id, values) => {
              props.handleEdit(id, values)
              setmodal_edit(false)
            }} handleCancel={tog_edit} />
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
                    onClick={() => {
                      props.handleDelete(SelectedUser)
                      tog_delete()
                    }}
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

