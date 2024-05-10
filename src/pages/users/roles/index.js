import React, { useState, useEffect } from "react";
import {
  Row, Col, Card, CardBody, Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";

import Breadcrumbs from "../../../components/Common/Breadcrumb";
import "../../../../src/assets/scss/datatables.scss";
import AddRoleForm from "./AddRoleForm";
import { post, get, del, put } from "helpers/api_helper";
import RoleTable from "./table";

const Roleindex = () => {
  const [modal_add, setmodal_add] = useState(false);
  const [error, setError] = useState('');
  const [roles, setRoles] = useState([]);

  const removeBodyCss = () => {
    document.body.classList.add("no_padding");
  };

  const tog_add = () => {
    setmodal_add(!modal_add);
    removeBodyCss();
  };

  const handleSave = async (values) => {
    try {
      const response = await post('http://127.0.0.1:8000/api/roles', values);
      if (response.status === 200) {
        setmodal_add(false)
      } else {
        setError('');
        setmodal_add(false)
        fetchRoles();

      }
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  const handleEdit = async (id, values) => {
    try {
      const response = await put(`http://127.0.0.1:8000/api/roles/${id}`, { ...values, id: id });
      if (response.status === 200) {
      } else {
        setError('');
        fetchRoles();

      }
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await get("http://127.0.0.1:8000/api/roles");

      const data = await response.data;
      setRoles(data);
    } catch (error) {
      setError(error.response.data.message);

    }
  };

  const handleDelete = async (role) => {
    try {
      const response = await del(`http://127.0.0.1:8000/api/roles/${role.id}`);

      fetchRoles()
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  document.title = "Roles Table ";
  return (
    <React.Fragment>
      <div>

        <Col sm={6} md={4} xl={3}>

          <Modal isOpen={modal_add} toggle={tog_add} centered>
            <ModalHeader className="mt-0" toggle={tog_add}>Add New Role</ModalHeader>
            <ModalBody>
              <AddRoleForm handleCancel={tog_add} handleSave={handleSave} error={error} />
            </ModalBody>
          </Modal>
        </Col>


      </div>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs maintitle="users" title="roles" breadcrumbItem="Role Table" tog_add={tog_add} />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>


                  <RoleTable roles={roles} handleDelete={handleDelete} handleEdit={handleEdit} />
                </CardBody>
              </Card>
            </Col>
          </Row>


        </div>
      </div>
    </React.Fragment>
  );
};

export default Roleindex;
