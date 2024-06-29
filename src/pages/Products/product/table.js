import React, { useState, useEffect } from "react"
import { MDBDataTable } from "mdbreact"
import { Modal, ModalBody, ModalHeader, Button } from "reactstrap"
import EditForm from "./editForm"
import { Row, Col, Badge } from "reactstrap"
import usePermissions from "helpers/permissions"

const ProductTable = props => {
  const [modal_edit, setmodal_edit] = useState(false)
  const [modal_delete, setmodal_delete] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const { hasPermissions, checkUserPermissions } = usePermissions(); // Call the usePermissions hoo
  useEffect(()=>{
    checkUserPermissions();

  },[])
  const removeBodyCss = () => {
    document.body.classList.add("no_padding")
  }

  const tog_edit = product => {
    setmodal_edit(!modal_edit)
    setSelectedProduct(product)
    removeBodyCss()
  }
  const tog_delete = product => {
    setmodal_delete(!modal_delete)
    setSelectedProduct(product)
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
        label: "images",
        field: "images",
        sort: "asc",
        width: 150,
      },
      {
        label: "name",
        field: "name",
        sort: "asc",
        width: 150,
      },
      
      {
        label: "description",
        field: "description",
        sort: "asc",
        width: 150,
      },
      {
        label: "design_price",
        field: "design_price",
        sort: "asc",
        width: 150,
      },
      {
        label: "price_unit",
        field: "price_unit",
        sort: "asc",
        width: 150,
      },
    
      {
        label: "Category name",
        field: "subCategory",
        sort: "asc",
        width: 150,
      },
      {
        label: "Actions",
        field: "actions",
        width: 150,
      },
    ],
    rows: props.products.map(product => ({
      id: product.id,
      images: (
        <div>
        {product.images &&
        <img style={{ maxWidth: '100px', maxHeight: '100px' }} src={`http://127.0.0.1:8000/storage/${JSON.parse(product.images)[0]}`} alt={`Product Image `} />
        }
        </div>
        ),
      name: product.name,
      description: product.description,
      design_price: product.design_price,
      price_unit: product.price_unit,
      subCategory : product.subCategory ?  product.subCategory.nom : "",
      actions: (
        <div className="d-flex align-items-center">
                    {hasPermissions.updateProduct && 

          <button
            className="btn btn-info btn-sm mx-2"
            onClick={() => tog_edit(product)}
          >
            <i className="ti-pencil-alt "></i>{" "}
          </button>
    }
              {hasPermissions.deleteProduct && 

          <button
            className="btn btn-danger btn-sm"
            onClick={() => tog_delete(product)}
          >
            <i className="ti-trash"></i>
          </button>
    }
        </div>
      ),
    })),
  }

  return (
    <React.Fragment>
      <Modal isOpen={modal_edit} toggle={tog_edit} centered size="lg">
        <ModalHeader className="mt-0" toggle={tog_edit}>
          Edit Product
        </ModalHeader>
        <ModalBody>
          <EditForm
            isOpen={modal_edit}
            product={selectedProduct}
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
          Delete Product
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
                    props.handleDelete(selectedProduct)
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

export default ProductTable
