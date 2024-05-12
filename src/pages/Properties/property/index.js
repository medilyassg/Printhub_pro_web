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
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import "../../../../src/assets/scss/datatables.scss"
import PropertyTable from "./table"
import AddForm from "./addForm"
import { post, get, del, put } from "helpers/api_helper"
import usePermissions from "helpers/permissions"
import useSweetAlert from "helpers/notifications"

const Propertyindex = () => {
  const [modal_add, setmodal_add] = useState(false)
  const [properties, setProperties] = useState([])
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
        "http://127.0.0.1:8000/api/properties",
        values
      )
      
        setError("")
        setmodal_add(false)
        fetchProperties()
        showSuccessAlert('Add New Property ', response.message);

    } catch (error) {
      showErrorAlert('Add New Property ', error.response.data.message);
    }
  }

  const handleEdit = async (id, values) => {
    try {
      const response = await put(`http://127.0.0.1:8000/api/properties/${id}`, {
        ...values,
        id: id,
      })
      
        setError("")
        fetchProperties()
        showSuccessAlert('Update Property ', response.message);

    } catch (error) {
      showErrorAlert('Update Property ', error.response.data.message);

    }
  }

  useEffect(() => {
    fetchProperties()
    checkUserPermissions()
  }, [])

  const fetchProperties = async () => {
    try {
      const response = await get("http://127.0.0.1:8000/api/properties")

      const data = await response.data
      setProperties(data)
    } catch (error) {
      setError(error.response.data.message)
    }
  }
  const handleDelete = async property => {
    try {
      const response = await del(
        `http://127.0.0.1:8000/api/properties/${property.id}`
      )
      fetchProperties()
      showSuccessAlert('Delete Property ', response.message);

    } catch (error) {
      showErrorAlert('Delete Property ', error.response.data.message);
    }
  }

  document.title = "Properties Table"
  return (
    <React.Fragment>
      <Col sm={6} md={4} xl={3}>
        <Modal isOpen={modal_add} toggle={tog_add} centered>
          <ModalHeader className="mt-0" toggle={tog_add}>
            Add New Property
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
            maintitle="properties"
            title="property"
            breadcrumbItem="Property Table"
            tog_add={hasPermissions.createProperty && tog_add}          />
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <PropertyTable
                    properties={properties}
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

export default Propertyindex
