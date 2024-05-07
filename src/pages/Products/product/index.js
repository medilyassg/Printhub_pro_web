import React, { useState } from "react"
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

const Productindex = () => {
  const [modal_add, setmodal_add] = useState(false)

  const removeBodyCss = () => {
    document.body.classList.add("no_padding")
  }

  const tog_add = () => {
    setmodal_add(!modal_add)
    removeBodyCss()
  }

  document.title = "Products Table | Veltrix - React Admin & Dashboard Template"
  return (
    <React.Fragment>
      <Col sm={6} md={4} xl={3}>
        <Modal isOpen={modal_add} toggle={tog_add} centered>
          <ModalHeader className="mt-0" toggle={tog_add}>
            Add New Product
          </ModalHeader>
          <ModalBody> <AddForm isOpen={modal_add} toggle={tog_add} /> </ModalBody>
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
                  <ProductTable />
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
