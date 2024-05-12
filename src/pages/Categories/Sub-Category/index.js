import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import {
    Row, Col, Card, CardBody, CardTitle, CardSubtitle, Modal,
    ModalBody,
    ModalHeader,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import "../../../../src/assets/scss/datatables.scss";
import SubCategoryTable from "./table";
import AddForm from "./addForm";
import { del, get, post, put } from "helpers/api_helper";


const SubCategoryIndex = () => {
    const [modal_add, setmodal_add] = useState(false);
    const [subcategories,setSubCategories]=useState([])
    const [categories,setCategories]=useState([])
    const [error, setError] = useState('');

    const removeBodyCss = () => {
        document.body.classList.add("no_padding");
    };

    const tog_add = () => {
        setmodal_add(!modal_add);
        removeBodyCss();
    };
    const handleSave = async (values) => {
        try {
          const response = await post('http://127.0.0.1:8000/api/subcategories', values);
          if (response.status === 200) {
            setmodal_add(false)
          } else {
            setError('');
            setmodal_add(false)
            fetchCategories();
            fetchSubCategories()
    
          }
        } catch (error) {
          setError(error.response.data.message);
        }
      }
      const handleEdit = async (id, values) => {
        try {
          const response = await put(`http://127.0.0.1:8000/api/subcategories/${id}`, { ...values, id: id });
          if (response.status === 200) {
          } else {
            setError('');
            fetchCategories();
            fetchSubCategories()
    
          }
        } catch (error) {
          setError(error.response.data.message);
        }
      }
    useEffect(() => {
        fetchCategories();
        fetchSubCategories();
      }, []);
    
      const fetchSubCategories = async () => {
        try {
          const response = await get("http://127.0.0.1:8000/api/subcategories");
    
          const data = await response.data;
          setSubCategories(data);
          console.log(subcategories)
        } catch (error) {
          setError(error.response.data.message);
    
        }
      };
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
      const handleDelete = async (subcategory) => {
        try {
          const response = await del(`http://127.0.0.1:8000/api/subcategories/${subcategory.id}`);
    
          fetchCategories()
          fetchSubCategories()
        } catch (error) {
          setError(error.response.data.message);
        }
      };

    document.title = "Sub-Categories Table";
    return (
        <React.Fragment>
            <Col sm={6} md={4} xl={3}>

                <Modal isOpen={modal_add} toggle={tog_add} centered>
                    <ModalHeader className="mt-0" toggle={tog_add}>Add New Sub-Category</ModalHeader>
                    <ModalBody>
                        <AddForm handleCancel={tog_add} handleSave={handleSave} error={error} categories={categories}/>
                    </ModalBody>
                </Modal>
            </Col>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs maintitle="Categories" title="Sub-Category" breadcrumbItem="Sub-Category Table" tog_add={tog_add} />
                    <Row>
                        <Col className="col-12">
                            <Card>
                                <CardBody>
                                    <SubCategoryTable subcategories={subcategories} categories={categories} handleDelete={handleDelete} handleEdit={handleEdit}/>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>


                </div>
            </div>
        </React.Fragment>
    );
};

export default SubCategoryIndex;
