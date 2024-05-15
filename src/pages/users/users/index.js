import React, { useState, useEffect } from "react";
import {
  Row, Col, Card, CardBody, Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";

import Breadcrumbs from "../../../components/Common/Breadcrumb";
import "../../../../src/assets/scss/datatables.scss";
import { post, get, del, put } from "helpers/api_helper";
import UserTable from "./table";
import AddUserForm from "./AddUserForm";
import usePermissions from "helpers/permissions";
import useSweetAlert from "helpers/notifications";

const Userindex = () => {
  const [modal_add, setmodal_add] = useState(false);
  const [error, setError] = useState('');
  const [users, setusers] = useState([]);
  const { hasPermissions, checkUserPermissions } = usePermissions(); // Call the usePermissions hook
  const {  showSuccessAlert, showErrorAlert } = useSweetAlert();

  const removeBodyCss = () => {
    document.body.classList.add("no_padding");
  };

  const tog_add = () => {
    setmodal_add(!modal_add);
    removeBodyCss();
  };

  const handleSave = async (values) => {
    try {
      const response = await post('http://127.0.0.1:8000/api/users', values);
      showSuccessAlert('Add New User ', response.message);

        setError('');
        setmodal_add(false)
        fetchUsers();


    } catch (error) {
      showErrorAlert('Add New User ', error.response.data.message);
    }
  }

  const handleEdit = async (id, values) => {
    try {
      const response = await put(`http://127.0.0.1:8000/api/users/${id}`, { ...values, id: id });
        setError('');
        fetchUsers();
        showSuccessAlert('Edit User ', response.message);

    } catch (error) {
      showErrorAlert('Edit User ', error.response.data.message);
    }
  }

  useEffect(() => {
    fetchUsers();
    checkUserPermissions();

  }, []);

  const fetchUsers = async () => {
    try {
      const response = await get("http://127.0.0.1:8000/api/users");

      const data = await response.data;
      setusers(data);
    } catch (error) {
      setError(error.response.data.message);

    }
  };

  const handleDelete = async (user) => {
    try {
      const response = await del(`http://127.0.0.1:8000/api/users/${user.id}`);
      showSuccessAlert('Delete User ', response.message);

      fetchUsers()
    } catch (error) {
      showErrorAlert('Delete ', error.response.data.message);
    }
  };
  document.title = "Users Table ";
  return (
    <React.Fragment>
      <div>

        <Col sm={6} md={4} xl={3}>

          <Modal isOpen={modal_add} toggle={tog_add} centered size="lg">
            <ModalHeader className="mt-0" toggle={tog_add}>Add New User</ModalHeader>
            <ModalBody>
              <AddUserForm handleCancel={tog_add} handleSave={handleSave} error={error} />
            </ModalBody>
          </Modal>
        </Col>


      </div>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs maintitle="users" title="users" breadcrumbItem="User Table" tog_add={hasPermissions.createUser && tog_add} />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>


                  <UserTable users={users} handleDelete={handleDelete} handleEdit={handleEdit} />
                </CardBody>
              </Card>
            </Col>
          </Row>


        </div>
      </div>
    </React.Fragment>
  );
};

export default Userindex;
