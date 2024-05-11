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
import DeleteModal from "./deleteModal";
import EditForm from "./editForm";




const CategoryTable = () => {
    const [modal_edit, setmodal_edit] = useState(false);
    const [modal_delete, setmodal_delete] = useState(false);
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/categories")
            .then(response => response.json())
            .then(data => {
                setCategories(data.data)
            })
            .catch(error => {
                console.error("Error fetching products:", error)
            })
    }, [])

    const handleEdit = updatedCategory => {
        const updatedCategories = categories.map(category =>
          category.id === updatedCategory.id ? updatedCategory : category
        );
        setCategories(updatedCategories);
    
        fetch(`http://127.0.0.1:8000/api/categories/${updatedCategory.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedCategory)
        })
          .then(response => {
            if (!response.ok) {
              console.error("Failed to update product");
            }
          })
          .catch(error => {
            console.error("Error updating product:", error);
          });
      };
    const handleDelete = () => {
        if (!selectedCategory) return

        fetch(`http://127.0.0.1:8000/api/categories/${selectedCategory.id}`, {
            method: "DELETE",
        })
            .then(response => {
                if (response.ok) {
                    const updatedCategories = categories.filter(
                        category => category.id !== selectedCategory.id
                    )
                    setCategories(updatedCategories)
                    setmodal_delete(false)
                } else {
                    console.error("Failed to delete category")
                }
            })
            .catch(error => {
                console.error("Error deleting category:", error)
            })
    };
    const removeBodyCss = () => {
        document.body.classList.add("no_padding");
    };

    const tog_edit = () => {
        setmodal_edit(!modal_edit);
        removeBodyCss();
    };
    const tog_delete = () => {
        setmodal_delete(!modal_delete);
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
        rows: categories.map(category => ({
            id: category.id,
            nom: category.nom,
            actions: (
                <div className="flex">
                    <button
                        className="btn btn-info btn-sm mx-2"
                        onClick={() => {
                            setSelectedCategory(category)
                            tog_edit(category)
                        }
                        }

                    >
                        <i className="ti-pencil-alt "></i>{" "}
                    </button>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                            setSelectedCategory(category)
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
                            isOpen={modal_edit}
                            toggle={tog_edit}
                            onSubmit={handleEdit}
                            category={selectedCategory}
                        />
                    </ModalBody>
                </Modal>
            </Col>
            <Col sm={6} md={4} xl={3}>

                <Modal isOpen={modal_delete} toggle={tog_delete} centered>
                    <ModalHeader className="mt-0" toggle={tog_delete}>Delete Category</ModalHeader>
                    <ModalBody>
                        <DeleteModal
                            isOpen={modal_delete}
                            toggle={tog_delete}
                            onDelete={handleDelete}
                        />
                    </ModalBody>
                </Modal>
            </Col>
            <MDBDataTable responsive bordered data={data} />
        </React.Fragment>
    );
};

export default CategoryTable;
