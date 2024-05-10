import React, { useState, useEffect } from "react";
import {
  Row, Col, Card, CardBody, Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import "../../../../src/assets/scss/datatables.scss";
import PermissionTable from "./table";
import AddPermissionForm from "./AddPermissionForm";
import { post, get, del, put } from "helpers/api_helper";

const Permissionindex = () => {
  const [modal_add, setmodal_add] = useState(false);
  const [error, setError] = useState('');
  const [permissions, setPermissions] = useState([]);

  const removeBodyCss = () => {
    document.body.classList.add("no_padding");
  };

  const tog_add = () => {
    setmodal_add(!modal_add);
    removeBodyCss();
  };

  const handleSave = async (values) => {
    try {
      const response = await post('http://127.0.0.1:8000/api/permissions', values);
      if (response.status === 200) {
        setmodal_add(false)
      } else {
        setError('');
        setmodal_add(false)
        fetchPermissions();

      }
    } catch (error) {
      console.error('Error adding permission:', error);
      setError(error.response.data.message);
    }
  }

  const handleEdit = async (id, values) => {
    try {
      const response = await put(`http://127.0.0.1:8000/api/permissions/${id}`, { ...values, id: id });
      if (response.status === 200) {
      } else {
        setError('');
        fetchPermissions();

      }
    } catch (error) {
      console.error('Error editing permission:', error);
      setError(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      const response = await get("http://127.0.0.1:8000/api/permissions");

      const data = await response.data;
      setPermissions(data);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  const handleDelete = async (permission) => {
    try {
      const response = await del(`http://127.0.0.1:8000/api/permissions/${permission.id}`);

      fetchPermissions()
    } catch (error) {
      console.error("Error deleting permission:", error);
    }
  };
  document.title = "Permissions Table ";
  return (
    <React.Fragment>
      <div>

        <Col sm={6} md={4} xl={3}>

          <Modal isOpen={modal_add} toggle={tog_add} centered>
            <ModalHeader className="mt-0" toggle={tog_add}>Add New Permission</ModalHeader>
            <ModalBody>
              <AddPermissionForm handleCancel={tog_add} handleSave={handleSave} error={error} />
            </ModalBody>
          </Modal>
        </Col>


      </div>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs maintitle="users" title="permissions" breadcrumbItem="Permission Table" tog_add={tog_add} />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>


                  <PermissionTable permissions={permissions} handleDelete={handleDelete} handleEdit={handleEdit} />
                </CardBody>
              </Card>
            </Col>
          </Row>


        </div>
      </div>
    </React.Fragment>
  );
};

export default Permissionindex;
