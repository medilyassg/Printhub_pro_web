import React   from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col } from "reactstrap";

//Import Breadcrumb
import "../../../assets/scss/datatables.scss";
import { useState } from "react";

import {

    Modal,
    ModalBody,
    ModalHeader,
} from "reactstrap";
import EditAddresseForm from "./EditAddresseForm";




const AddresseTable = (props) => {
    const [modal_edit, setmodal_edit] = useState(false);
  const [modal_delete, setmodal_delete] = useState(false);
  const [SelectedAddresse, setSlectedAddresse] = useState(null);


 
  const removeBodyCss = () => {
    document.body.classList.add("no_padding");
  };

  const tog_edit = (role) => {
    setmodal_edit(!modal_edit);
    setSlectedAddresse(role)
    removeBodyCss();

  };
  const tog_delete = (role) => {
    setmodal_delete(!modal_delete);
    setSlectedAddresse(role)
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
                label: "Adresse",
                field: "adresse",
                sort: "asc",
                width: 150,
            },
            {
                label: "Actions",
                field: "actions",
                width: 150,
            },

        ],
        rows: props.addresses?.map(adresse => ({
            id: adresse.id,
            adresse: (
                <p>{adresse.city} , {adresse.line} , {adresse.zip}</p>),
            actions: (
                <div className="d-flex align-items-center">
                    <button className="btn btn-info btn-sm mx-2" onClick={() => tog_edit(adresse)}>
                        <i className="ti-pencil-alt"></i>
                    </button>

                    <button className="btn btn-danger btn-sm mx-2" onClick={() => tog_delete(adresse)}>
                        <i className="ti-trash"></i>
                    </button>
                </div>
            ),
        })),
    };


    document.title = "Orders Table";

    return (
        <React.Fragment>
            
            <Col sm={6} md={4} xl={3}>

                <Modal isOpen={modal_edit} toggle={tog_edit} centered>
                    <ModalHeader className="mt-0" toggle={tog_edit}>Edit Address</ModalHeader>
                    <ModalBody>
                        <EditAddresseForm addresse={SelectedAddresse} handleEdit={(id, values) => {
                            props.handleEdit(id, values)
                            setmodal_edit(false)
                        }} handleCancel={tog_edit} />
                    </ModalBody>
                </Modal>
            </Col>
            <Col sm={6} md={4} xl={3}>

                <Modal isOpen={modal_delete} toggle={tog_delete} centered>
                    <ModalHeader className="mt-0" toggle={tog_delete}>Delete Address</ModalHeader>
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
                                            props.handleDelete(SelectedAddresse)
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

export default AddresseTable;
