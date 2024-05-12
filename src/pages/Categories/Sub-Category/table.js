import React, { useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col} from "reactstrap";

//Import Breadcrumb
import "../../../../src/assets/scss/datatables.scss";
import { useState } from "react";

import {

    Modal,
    ModalBody,
    ModalHeader,
    Button,
} from "reactstrap";
import EditForm from "./editForm";
import usePermissions from "helpers/permissions";


//Import Breadcrumb



const SubCategoryTable = (props) => {
    const [modal_edit, setmodal_edit] = useState(false);
    const [modal_delete, setmodal_delete] = useState(false);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null)
    const { hasPermissions, checkUserPermissions } = usePermissions(); // Call the usePermissions hook
    useEffect(()=>{
        checkUserPermissions();
    
      },[])
    const removeBodyCss = () => {
        document.body.classList.add("no_padding");
    };

    const tog_edit = (subcategory) => {
        setmodal_edit(!modal_edit);
        setSelectedSubCategory(subcategory)
        removeBodyCss();
    };
    const tog_delete = (subcategory) => {
        setmodal_delete(!modal_delete);
        setSelectedSubCategory(subcategory)
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
                field: "nom",
                sort: "asc",
                width: 150,
            },
            {
                label: "Category",
                field: "category",
                sort: "asc",
                width: 150, 
            },
            {
                label: "Actions",
                field: "actions",
                width: 150,
            },
        ],
        rows: props.subcategories.map(subcategory => ({
            id: subcategory.id,
            nom: subcategory.nom,
            category:props.categories.find(category => category.id === subcategory.categorie_id)?.nom,
            actions: (
                <div className="flex">
                    {hasPermissions.updateSubCategory && 

                    <button
                        className="btn btn-info btn-sm mx-2"
                        onClick={() => {
                            setSelectedSubCategory(subcategory)
                            tog_edit(subcategory)
                        }
                        }

                    >
                        <i className="ti-pencil-alt "></i>{" "}
                    </button>
        }
                  {hasPermissions.deleteSubCategory && 

                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                            setSelectedSubCategory(subcategory)
                            tog_delete(subcategory)
                        }}
                    >
                        <i className="ti-trash"></i>
                    </button>
        }
                </div>
            ),
        })),
    };


    document.title = "Sub-Categories Table";

    return (
        <React.Fragment>
            <Col sm={6} md={4} xl={3}>

                <Modal isOpen={modal_edit} toggle={tog_edit} centered>
                    <ModalHeader className="mt-0" toggle={tog_edit}>Edit Sub-Category</ModalHeader>
                    <ModalBody>
                    <EditForm
                            categories={props.categories}
                            subcategory={selectedSubCategory}
                            handleEdit={(id, values) => {
                                props.handleEdit(id, values)
                                setmodal_edit(false)
                              }} handleCancel={tog_edit}
                        />
                    </ModalBody>
                </Modal>
            </Col>
            <Col sm={6} md={4} xl={3}>

                <Modal isOpen={modal_delete} toggle={tog_delete} centered>
                    <ModalHeader className="mt-0" toggle={tog_delete}>Delete Sub-Category</ModalHeader>
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
                                            props.handleDelete(selectedSubCategory)
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

export default SubCategoryTable;
