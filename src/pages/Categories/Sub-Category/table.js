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


//Import Breadcrumb



const SubCategoryTable = () => {
    const [modal_edit, setmodal_edit] = useState(false);
    const [modal_delete, setmodal_delete] = useState(false);
    const [subcategories, setSubCategories] = useState([])
    const [categories, setCategories] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null)

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/subcategories")
            .then(response => response.json())
            .then(data => {
                setSubCategories(data.data)
            })
            .catch(error => {
                console.error("Error fetching products:", error)
            });
            fetch("http://127.0.0.1:8000/api/categories")
            .then(response => response.json())
            .then(data => {
                setCategories(data.data)
            })
            .catch(error => {
                console.error("Error fetching categories:", error)
            });
    }, [])
    

    const handleEdit = updatedSubCategory => {
        const updatedSubCategories = subcategories.map(subcategory =>
          subcategory.id === updatedSubCategory.id ? updatedSubCategory : subcategory
        );
        setSubCategories(updatedSubCategories);
    
        fetch(`http://127.0.0.1:8000/api/subcategories/${updatedSubCategory.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedSubCategory)
        })
          .then(response => {
            if (!response.ok) {
              console.error("Failed to update subcategory");
            }
          })
          .catch(error => {
            console.error("Error updating subcategory:", error);
          });
      };
    const handleDelete = () => {
        if (!selectedSubCategory) return

        fetch(`http://127.0.0.1:8000/api/subcategories/${selectedSubCategory.id}`, {
            method: "DELETE",
        })
            .then(response => {
                if (response.ok) {
                    const updatedSubCategories = subcategories.filter(
                        subcategory => subcategory.id !== selectedSubCategory.id
                    )
                    setSubCategories(updatedSubCategories)
                    setmodal_delete(false)
                } else {
                    console.error("Failed to delete subcategory")
                }
            })
            .catch(error => {
                console.error("Error deleting subcategory:", error)
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
        rows: subcategories.map(subcategory => ({
            id: subcategory.id,
            nom: subcategory.nom,
            category:categories.find(category => category.id === subcategory.categorie_id)?.nom,
            actions: (
                <div className="flex">
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
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                            setSelectedSubCategory(subcategory)
                            tog_delete(subcategory)
                        }}
                    >
                        <i className="ti-trash"></i>
                    </button>
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
                            isOpen={modal_edit}
                            toggle={tog_edit}
                            onSubmit={handleEdit}
                            subcategory={selectedSubCategory}
                        />
                    </ModalBody>
                </Modal>
            </Col>
            <Col sm={6} md={4} xl={3}>

                <Modal isOpen={modal_delete} toggle={tog_delete} centered>
                    <ModalHeader className="mt-0" toggle={tog_delete}>Delete Sub-Category</ModalHeader>
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

export default SubCategoryTable;
