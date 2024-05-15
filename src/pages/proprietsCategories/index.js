import React, { useState, useEffect } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "../../../src/assets/scss/datatables.scss"
import AddForm from "./addForm"
import { post, get, del, put } from "helpers/api_helper"
import usePermissions from "helpers/permissions"
import useSweetAlert from "helpers/notifications"
import ProprieteCategorieTable from "./table"

const PropertyCategoryindex = () => {
  const [modal_add, setmodal_add] = useState(false)
  const [ProprieteCategories, setProprieteCategorie] = useState([])
  const [error, setError] = useState("")
  const { hasPermissions, checkUserPermissions } = usePermissions(); // Call the usePermissions hook
  const {  showSuccessAlert, showErrorAlert } = useSweetAlert();
  const removeBodyCss = () => {
    document.body.classList.add("no_padding")
  }

  const tog_add = () => {
    setmodal_add(!modal_add)
    removeBodyCss()
  }

  const handleSave = async values => {
    try {
      const response = await post(
        "http://127.0.0.1:8000/api/ProprieteCategorie",
        values
      )
      
        setError("")
        setmodal_add(false)
        fetchProprieteCategorie()
        showSuccessAlert('Add New ProprieteCategorie ', response.message);

    } catch (error) {
      showErrorAlert('Add New ProprieteCategorie ', error.response.data.message);
    }
  }

  const handleEdit = async (id, values) => {
    try {
      const response = await put(`http://127.0.0.1:8000/api/ProprieteCategorie/${id}`, {
        ...values,
        id: id,
      })
      
        setError("")
        fetchProprieteCategorie()
        showSuccessAlert('Update ProprieteCategorie ', response.message);

    } catch (error) {
      showErrorAlert('Update ProprieteCategorie ', error.response.data.message);

    }
  }

  useEffect(() => {
    fetchProprieteCategorie()
    checkUserPermissions()
  }, [])

  const fetchProprieteCategorie = async () => {
    try {
      const response = await get("http://127.0.0.1:8000/api/ProprieteCategorie")

      const data = await response.data
      setProprieteCategorie(data)
    } catch (error) {
      setError(error.response.data.message)
    }
  }
  const handleDelete = async property => {
    try {
      const response = await del(
        `http://127.0.0.1:8000/api/ProprieteCategorie/${property.id}`
      )
      fetchProprieteCategorie()
      showSuccessAlert('Delete ProprieteCategorie ', response.message);

    } catch (error) {
      showErrorAlert('Delete ProprieteCategorie ', error.response.data.message);
    }
  }

  document.title = "ProprieteCategorie Table"
  return (
    <React.Fragment>
      <Col sm={6} md={4} xl={3}>
        <Modal isOpen={modal_add} toggle={tog_add} centered>
          <ModalHeader className="mt-0" toggle={tog_add}>
            Add New ProprieteCategorie
          </ModalHeader>
          <ModalBody>
            <AddForm
              handleCancel={tog_add}
              handleSave={handleSave}
              error={error}
            />
          </ModalBody>
        </Modal>
      </Col>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs
            maintitle="ProprieteCategories"
            title="property"
            breadcrumbItem="ProprieteCategorie Table"
            tog_add={hasPermissions.createProprieteCategorie && tog_add}          />
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <ProprieteCategorieTable
                    ProprieteCategories={ProprieteCategories}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}

export default PropertyCategoryindex
