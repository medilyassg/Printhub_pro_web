import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import {
    Row, Col, Card, CardBody, CardTitle, CardSubtitle, Modal,
    ModalBody,
    ModalHeader,
} from "reactstrap";

import Breadcrumbs from "../../../components/Common/Breadcrumb";
import "../../../../src/assets/scss/datatables.scss";
import { post, get, del, put } from "helpers/api_helper";
import CategoryTable from "./table";
import AddForm from "./addForm";
import useSweetAlert from "helpers/notifications";
import usePermissions from "helpers/permissions";

const CategoryIndex = () => {
    const [modal_add, setmodal_add] = useState(false);
    const [categories,setCategories]=useState([])
    const [error, setError] = useState('');
    const {  showSuccessAlert, showErrorAlert } = useSweetAlert();
    const { hasPermissions, checkUserPermissions } = usePermissions(); // Call the usePermissions hook

    const removeBodyCss = () => {
        document.body.classList.add("no_padding");
    };

    const tog_add = () => {
        setmodal_add(!modal_add);
        removeBodyCss();
    };
    const handleSave = async (values) => {
        try {
          const response = await post('http://127.0.0.1:8000/api/categories', values);
            setError('');
            setmodal_add(false)
            fetchCategories();
            showSuccessAlert('Add New Category ', response.message);

        } catch (error) {
          showErrorAlert('Add New Category ', error.response.data.message);
        }
      }
      const handleEdit = async (id, values) => {
        try {
          const response = await put(`http://127.0.0.1:8000/api/categories/${id}`, { ...values, id: id });
          showSuccessAlert('Update Category ', response.message);

            setError('');
            fetchCategories();
    
        } catch (error) {
          showErrorAlert('Update Category ', error.response.data.message);

        }
      }
    useEffect(() => {
        fetchCategories();
        checkUserPermissions()
      }, []);
    
      const fetchCategories = async () => {
        try {
          const response = await get("http://127.0.0.1:8000/api/categories");
    
          const data = await response.data;
          setCategories(data);
          console.log(categories)
        } catch (error) {
          setError(error.response.data.message);
    
        }
      };
      const handleDelete = async (category) => {
        try {
          const response = await del(`http://127.0.0.1:8000/api/categories/${category.id}`);    
          fetchCategories()
          showSuccessAlert('Delete Category ', response.message);

        } catch (error) {
          showErrorAlert('Delete Category ', error.response.data.message);
        }
      };
    document.title = "Categories Table";
    return (
        <React.Fragment>
            <Col sm={6} md={4} xl={3}>

                <Modal isOpen={modal_add} toggle={tog_add} centered>
                    <ModalHeader className="mt-0" toggle={tog_add}>Add New Category</ModalHeader>
                    <ModalBody><AddForm handleCancel={tog_add} handleSave={handleSave} error={error} />
                    </ModalBody>
                </Modal>
            </Col>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs maintitle="Categories" title="Category" breadcrumbItem="Category Table" tog_add={hasPermissions.createCategory && tog_add} />

                    <Row>
                        <Col className="col-12">
                            <Card>
                                <CardBody>
                                    <CategoryTable categories={categories} handleDelete={handleDelete} handleEdit={handleEdit}/>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>


                </div>
            </div>
        </React.Fragment>
    );
};

export default CategoryIndex;
