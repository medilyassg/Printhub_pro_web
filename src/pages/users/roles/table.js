import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col } from "reactstrap";

import "../../../../src/assets/scss/datatables.scss";

import {

  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import EditRoleForm from "./EditRoleForm";
import EditRolePermissionForm from "./EditRolePermissionForm";
import { get, put } from "helpers/api_helper";
import usePermissions from "helpers/permissions";
import useSweetAlert from "helpers/notifications";

//Import Breadcrumb



const RoleTable = (props) => {
  const [modal_edit, setmodal_edit] = useState(false);
  const [modal_delete, setmodal_delete] = useState(false);
  const [modal_permissions, setmodal_permissions] = useState(false);
  const [SelectedRole, setSlectedRole] = useState(null);
  const [rolesPermissions, setRolesPermissions] = useState({});
  const [error, setError] = useState(null); 
  const [message, setMessage] = useState(null); 
  const { hasPermissions, checkUserPermissions } = usePermissions(); // Call the usePermissions hook

  const {  showSuccessAlert, showErrorAlert } = useSweetAlert();

  useEffect(()=>{
    checkUserPermissions();

  },[])
  const removeBodyCss = () => {
    document.body.classList.add("no_padding");
  };

  const tog_edit = (role) => {
    setmodal_edit(!modal_edit);
    setSlectedRole(role)
    removeBodyCss();

  };
  const tog_delete = (role) => {
    setmodal_delete(!modal_delete);
    setSlectedRole(role)
    removeBodyCss();
  };
  const tog_permissions = (role) => {
    setmodal_permissions(!modal_permissions);
    if (!modal_permissions === true) {
      fetchRolesPermissions(role.id)
      console.log(rolesPermissions)
    }

    setSlectedRole(role)
    removeBodyCss();
  };



  const fetchRolesPermissions = async (id) => {
    try {
      const response = await get(`http://127.0.0.1:8000/api/roles/${id}/get-permissions`);
      setRolesPermissions(response);

      setError(null); 
    } catch (error) {
      console.log(error)
      // setError(error.response.data.message);
    }
  };

  const handleEdit = async (permissions) => {
    try {
      const response = await put(`http://127.0.0.1:8000/api/roles/${SelectedRole.id}/give-permissions`, { permission: permissions });
      fetchRolesPermissions(response.role.id)
      showSuccessAlert('Edit Role Permissions', response.message);
      tog_permissions()
    } catch (error) {
      showErrorAlert('Edit Role Permissions', error.response.data.message);
    }
  }

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
        label: "Actions",
        field: "actions",
        width: 150,
      },
    ],
    rows: props.roles.map((role) => ({
      id: role.id,
      name: role.name,
      actions: (
        <div className="d-flex align-items-center">
          {hasPermissions.updateRole &&
          <button className="btn btn-info btn-sm mx-2" onClick={() => tog_edit(role)}>
          <i className="ti-pencil-alt"></i>
        </button>
          }
          {hasPermissions.deleteRole &&

          <button className="btn btn-danger btn-sm mx-2" onClick={() => tog_delete(role)}>
            <i className="ti-trash"></i>
          </button>
          }
          {hasPermissions.updateRole &&

          <button className="btn btn-success btn-sm mx-2" onClick={() => tog_permissions(role)}>
            add / edit  permission
          </button>
                    }

        </div>
      ),
    })),
  };





  document.title = "Role Table ";

  return (
    <React.Fragment>
      <Col sm={6} md={4} xl={3}>

        <Modal isOpen={modal_permissions} toggle={tog_permissions} centered size="xl">
          <ModalHeader className="mt-0" toggle={tog_permissions}>Add / Edit Role Permissions</ModalHeader>
          <ModalBody>
            <EditRolePermissionForm message={message} rolesPermissions={rolesPermissions} role={SelectedRole} handleEdit={handleEdit} handleCancel={tog_permissions} />
          </ModalBody>
        </Modal>
      </Col>
      <Col sm={6} md={4} xl={3}>

        <Modal isOpen={modal_edit} toggle={tog_edit} centered>
          <ModalHeader className="mt-0" toggle={tog_edit}>Edit Role</ModalHeader>
          <ModalBody>
            <EditRoleForm role={SelectedRole} handleEdit={(id, values) => {
              props.handleEdit(id, values)
              setmodal_edit(false)
            }} handleCancel={tog_edit} />
          </ModalBody>
        </Modal>
      </Col>
      <Col sm={6} md={4} xl={3}>

        <Modal isOpen={modal_delete} toggle={tog_delete} centered>
          <ModalHeader className="mt-0" toggle={tog_delete}>Delete Role</ModalHeader>
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
                      props.handleDelete(SelectedRole)
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


export default RoleTable;

