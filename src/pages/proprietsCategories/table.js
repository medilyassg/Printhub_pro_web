import React, { useState, useEffect } from "react"
import { MDBDataTable } from "mdbreact"
import { Modal, ModalBody, ModalHeader, Button } from "reactstrap"
import EditForm from "./editForm"
import { Row, Col, Badge } from "reactstrap"
import usePermissions from "helpers/permissions"

const ProprieteCategorieTable = props => {
  const [modal_edit, setmodal_edit] = useState(false)
  const [modal_delete, setmodal_delete] = useState(false)
  const [selectedProprieteCategorie, setSelectedProprieteCategorie] = useState(null)
  const { hasPermissions, checkUserPermissions } = usePermissions() // Call the usePermissions hook
  useEffect(() => {
    checkUserPermissions()
  }, [])
  const removeBodyCss = () => {
    document.body.classList.add("no_padding")
  }

  const tog_edit = property => {
    setmodal_edit(!modal_edit)
    setSelectedProprieteCategorie(property)
    removeBodyCss()
  }

  const tog_delete = property => {
    setmodal_delete(!modal_delete)
    setSelectedProprieteCategorie(property)
    removeBodyCss()
  }
  const data = {
    columns: [
      {
        label: "ID",
        field: "id",
        sort: "asc",
        width: 150,
      },
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Description",
        field: "description",
        sort: "asc",
        width: 150,
      },
      {
        label: "Actions",
        field: "actions",
        width: 150,
      },
    ],
    rows: props.ProprieteCategories.map(property => ({
      id: property.id,
      name: property.name,
      description: property.description,
      actions: (
        <div className="flex">
          {hasPermissions.updateProprieteCategorie && (
            <button
              className="btn btn-info btn-sm mx-2"
              onClick={() => tog_edit(property)}
            >
              <i className="ti-pencil-alt "></i>{" "}
            </button>
          )}
          {hasPermissions.deleteProprieteCategorie && (
            <button
              className="btn btn-danger btn-sm"
              onClick={() => tog_delete(property)}
            >
              <i className="ti-trash"></i>
            </button>
          )}
        </div>
      ),
    })),
  }

  return (
    <React.Fragment>
      <Modal isOpen={modal_edit} toggle={tog_edit} centered>
        <ModalHeader className="mt-0" toggle={tog_edit}>
          Edit Propriete Categorie
        </ModalHeader>
        <ModalBody>
          <EditForm
            isOpen={modal_edit}
            property={selectedProprieteCategorie}
            toggle={tog_edit}
            handleEdit={(id, values) => {
              props.handleEdit(id, values)
              setmodal_edit(false)
            }}
            handleCancel={tog_edit}
          />
        </ModalBody>
      </Modal>
      <Modal isOpen={modal_delete} toggle={tog_delete} centered>
        <ModalHeader className="mt-0" toggle={tog_delete}>
          Delete Propriete Categorie
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
                    props.handleDelete(selectedProprieteCategorie)
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
      <MDBDataTable responsive bordered data={data} />
    </React.Fragment>
  )
}

export default ProprieteCategorieTable
