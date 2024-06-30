import React, { useState, useEffect } from "react";
import {
  Row, Col, Card, CardBody, Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";

import Breadcrumbs from "../../../components/Common/Breadcrumb";
import "../../../../src/assets/scss/datatables.scss";
import { post, get, del, put } from "helpers/api_helper";
import useSweetAlert from "helpers/notifications";
import BankTable from "./table";
import AddBankForm from "./AddBankForm";
import usePermissions from "helpers/permissions";

const BankIndex = () => {
  const [modal_add, setmodal_add] = useState(false);
  const [error, setError] = useState('');
  const [banks, setBanks] = useState([]);
  const { showSuccessAlert, showErrorAlert } = useSweetAlert();
  const { hasPermissions, checkUserPermissions } = usePermissions() // Call the usePermissions hook
  useEffect(() => {
    checkUserPermissions()
  }, [])
  const removeBodyCss = () => {
    document.body.classList.add("no_padding");
  };

  const toggleAdd = () => {
    setmodal_add(!modal_add);
    removeBodyCss();
  };

  const handleSave = async (values) => {
    try {
      const response = await post('http://127.0.0.1:8000/api/banks', values);
      setmodal_add(false);
      fetchBanks();
      showSuccessAlert('Add New Bank', response.message);
    } catch (error) {
      showErrorAlert('Add New Bank', error.response.data.message);
    }
  }

  const handleEdit = async (id, values) => {
    try {
      const response = await put(`http://127.0.0.1:8000/api/banks/${id}`, { ...values, id: id });
      setError('');
      fetchBanks();
      showSuccessAlert('Edit Bank', response.message);
    } catch (error) {
      showErrorAlert('Edit Bank', error.response.data.message);
    }
  }

  const fetchBanks = async () => {
    try {
        const response = await get(`http://127.0.0.1:8000/api/banks`);
        const data = await response;
        setBanks(data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

 

  useEffect(() => {
    fetchBanks();
  }, []);

  const handleDelete = async (bank) => {
    try {
      const response = await del(`http://127.0.0.1:8000/api/banks/${bank.id}`);
      fetchBanks();
      showSuccessAlert('Delete Bank', response.message);
    } catch (error) {
      showErrorAlert('Delete Bank', error.response.data.message);
    }
  };

  document.title = "Bank Table";

  return (
    <React.Fragment>
      <div>

        <Col sm={6} md={4} xl={3}>

          <Modal isOpen={modal_add} toggle={toggleAdd} centered>
            <ModalHeader className="mt-0" toggle={toggleAdd}>Add New Bank</ModalHeader>
            <ModalBody>
              <AddBankForm
                handleCancel={toggleAdd} handleSave={handleSave} error={error} />
            </ModalBody>
          </Modal>
        </Col>


      </div>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs maintitle="bank" title="banks" breadcrumbItem="Bank Table" tog_add={hasPermissions.createBank && toggleAdd} />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <BankTable banks={banks} handleDelete={handleDelete} handleEdit={handleEdit} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BankIndex;
