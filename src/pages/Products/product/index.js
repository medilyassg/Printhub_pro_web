import React, { useEffect, useState } from "react"
import { MDBDataTable } from "mdbreact"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import "../../../../src/assets/scss/datatables.scss"
import ProductTable from "./table"
import AddForm from "./addForm"
import { post, get, del, put } from "helpers/api_helper"

const Productindex = () => {
  const [modal_add, setmodal_add] = useState(false)
  const [products, setProducts] = useState([])
  const [error, setError] = useState("")

  const removeBodyCss = () => {
    document.body.classList.add("no_padding")
  }

  const tog_add = () => {
    setmodal_add(!modal_add)
    removeBodyCss()
  }

  const handleSave = async values => {
    try {
      const response = await post("http://127.0.0.1:8000/api/products", values)
      if (response.status === 200) {
        setmodal_add(false)
      } else {
        setError("")
        setmodal_add(false)
        fetchProducts()
      }
      console.log(data)
    } catch (error) {
      setError(error.response.data.message)
    }
  }
  const handleEdit = async (id, values) => {
    try {
      const response = await put(`http://127.0.0.1:8000/api/products/${id}`, {
        ...values,
        id: id,
      })
      if (response.status === 200) {
      } else {
        setError("")
        fetchProducts()
      }
    } catch (error) {
      console.error("Error editing products:", error)
      setError(error.response.data.message)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await get("http://127.0.0.1:8000/api/products")

      const data = await response.data
      setProducts(data)
    } catch (error) {
      setError(error.response.data.message)
    }
  }
  const handleDelete = async product => {
    try {
      const response = await del(
        `http://127.0.0.1:8000/api/products/${product.id}`
      )
      fetchProducts()
    } catch (error) {
      setError(error.response.data.message)
    }
  }
  document.title = "Products Table"
  return (
    <React.Fragment>
      <Col sm={6} md={4} xl={3}>
        <Modal isOpen={modal_add} toggle={tog_add} centered>
          <ModalHeader className="mt-0" toggle={tog_add}>
            Add New Product
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
            maintitle="products"
            title="product"
            breadcrumbItem="Product Table"
            tog_add={tog_add}
          />
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <ProductTable
                    products={products}
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

export default Productindex
