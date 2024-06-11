import React, { useState } from "react";
import { MDBDataTable } from "mdbreact";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import EditBankForm from "./EditBankForm";

const BankTable = (props) => {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);

  const toggleEdit = (bank) => {
    setModalEdit(!modalEdit);
    setSelectedBank(bank);
  };

  const toggleDelete = (bank) => {
    setModalDelete(!modalDelete);
    setSelectedBank(bank);
  };

  const data = {
    columns: [
      {
        label: "ID",
        field: "id",
        sort: "asc",
        width: 150,
      },
      {
        label: "Bank Name",
        field: "bank_name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Holder Name",
        field: "holder_name",
        sort: "asc",
        width: 150,
      },
      {
        label: "RIB Number",
        field: "num_rip",
        sort: "asc",
        width: 150,
      },
      {
        label: "CLE RIB",
        field: "cle_rip",
        sort: "asc",
        width: 150,
      },
      {
        label: "SWIFT Code",
        field: "code_swift",
        sort: "asc",
        width: 150,
      },
      {
        label: "Actions",
        field: "actions",
        width: 150,
      },
    ],
    rows: props.banks?.map((bank) => ({
      id: bank.id,
      bank_name: bank.bank_name,
      holder_name: bank.holder_name,
      num_rip: bank.num_rip,
      cle_rip: bank.cle_rip,
      code_swift: bank.code_swift,
      actions: (
        <div className="d-flex align-items-center">
          <button
            className="btn btn-info btn-sm mx-2"
            onClick={() => toggleEdit(bank)}
          >
            <i className="ti-pencil-alt"></i>
          </button>

          <button
            className="btn btn-danger btn-sm mx-2"
            onClick={() => toggleDelete(bank)}
          >
            <i className="ti-trash"></i>
          </button>
        </div>
      ),
    })),
  };

  document.title = "Bank Table";

  return (
    <React.Fragment>
      <Col sm={6} md={4} xl={3}>
        {console.log(props.banks)}
        <Modal isOpen={modalEdit} toggle={toggleEdit} centered>
          <ModalHeader className="mt-0" toggle={toggleEdit}>
            Edit Bank
          </ModalHeader>
          <ModalBody>
            <EditBankForm
              bank={selectedBank}
              handleEdit={(id, values) => {
                props.handleEdit(id, values);
                setModalEdit(false);
              }}
              handleCancel={toggleEdit}
            />
          </ModalBody>
        </Modal>
      </Col>
      <Col sm={6} md={4} xl={3}>
        <Modal isOpen={modalDelete} toggle={toggleDelete} centered>
          <ModalHeader className="mt-0" toggle={toggleDelete}>
            Delete Bank
          </ModalHeader>
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
                      props.handleDelete(selectedBank);
                      setModalDelete(false);
                    }}
                  >
                    Yes, delete it!
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-lg ms-2"
                    onClick={toggleDelete}
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

export default BankTable;
