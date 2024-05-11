import React, { useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";

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




const CategoryTable = (props) => {
    const [modal_edit, setmodal_edit] = useState(false);
    const [modal_delete, setmodal_delete] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null)

    // useEffect(() => {
    //     fetch("http://127.0.0.1:8000/api/categories")
    //         .then(response => response.json())
    //         .then(data => {
    //             setCategories(data.data)
    //         })
    //         .catch(error => {
    //             console.error("Error fetching products:", error)
    //         })
    // }, [])

    // const handleEdit = updatedCategory => {
    //     const updatedCategories = categories.map(category =>
    //       category.id === updatedCategory.id ? updatedCategory : category
    //     );
    //     setCategories(updatedCategories);

    //     fetch(`http://127.0.0.1:8000/api/categories/${updatedCategory.id}`, {
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify(updatedCategory)
    //     })
    //       .then(response => {
    //         if (!response.ok) {
    //           console.error("Failed to update product");
    //         }
    //       })
    //       .catch(error => {
    //         console.error("Error updating product:", error);
    //       });
    //   };
    // const handleDelete = () => {
    //     if (!selectedCategory) return

    //     fetch(`http://127.0.0.1:8000/api/categories/${selectedCategory.id}`, {
    //         method: "DELETE",
    //     })
    //         .then(response => {
    //             if (response.ok) {
    //                 const updatedCategories = categories.filter(
    //                     category => category.id !== selectedCategory.id
    //                 )
    //                 setCategories(updatedCategories)
    //                 setmodal_delete(false)
    //             } else {
    //                 console.error("Failed to delete category")
    //             }
    //         })
    //         .catch(error => {
    //             console.error("Error deleting category:", error)
    //         })
    // };
    const removeBodyCss = () => {
        document.body.classList.add("no_padding");
    };

    const tog_edit = (category) => {
        setmodal_edit(!modal_edit);
        setSelectedCategory(category)
        removeBodyCss();
    };
    const tog_delete = (category) => {
        setmodal_delete(!modal_delete);
        setSelectedCategory(category)
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
                label: "Actions",
                field: "actions",
                width: 150,
            },
        ],
        rows: props.categories.map(category => ({
            id: category.id,
            nom: category.nom,
            actions: (
                <div className="flex">
                    <button
                        className="btn btn-info btn-sm mx-2"
                        onClick={() => {
                            tog_edit(category)
                        }
                        }

                    >
                        <i className="ti-pencil-alt "></i>{" "}
                    </button>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                            tog_delete(category)
                        }}
                    >
                        <i className="ti-trash"></i>
                    </button>
                </div>
            ),
        })),
    };


    document.title = "Categories Table";

    return (
        <React.Fragment>
            <Col sm={6} md={4} xl={3}>

                <Modal isOpen={modal_edit} toggle={tog_edit} centered>
                    <ModalHeader className="mt-0" toggle={tog_edit}>Edit Category</ModalHeader>
                    <ModalBody>
                        <EditForm
                            category={selectedCategory}
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
                    <ModalHeader className="mt-0" toggle={tog_delete}>Delete Category</ModalHeader>
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
                                            props.handleDelete(selectedCategory)
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

export default CategoryTable;
