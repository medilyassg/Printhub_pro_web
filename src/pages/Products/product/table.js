import React, { useState, useEffect } from "react"
import { MDBDataTable } from "mdbreact"
import { Modal, ModalBody, ModalHeader, Button } from "reactstrap"
import EditForm from "./editForm"
import { Row, Col, Badge } from "reactstrap";

const ProductTable = (props) => {
  const [modal_edit, setmodal_edit] = useState(false)
  const [modal_delete, setmodal_delete] = useState(false)
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)

  // useEffect(() => {
  //   fetch("http://127.0.0.1:8000/api/products")
  //     .then(response => response.json())
  //     .then(data => {
  //       setProducts(data.data)
  //     })
  //     .catch(error => {
  //       console.error("Error fetching products:", error)
  //     })
  //   }, [])
    
  //   const handleEditSubmit = updatedProduct => {
  //     const updatedProducts = products.map(product =>
  //       product.id === updatedProduct.id ? updatedProduct : product
  //     );
  //     setProducts(updatedProducts);
  
  //     fetch(`http://127.0.0.1:8000/api/products/${updatedProduct.id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify(updatedProduct)
  //     })
  //       .then(response => {
  //         if (!response.ok) {
  //           console.error("Failed to update product");
  //         }
  //       })
  //       .catch(error => {
  //         console.error("Error updating product:", error);
  //       });
  //   };
    
  //   const handleDelete = () => {
  //     if (!selectedProduct) return
  
  //     fetch(`http://127.0.0.1:8000/api/products/${selectedProduct.id}`, {
  //       method: "DELETE",
  //     })
  //       .then(response => {
  //         if (response.ok) {
  //           // Remove the deleted product from the products list
  //           const updatedProducts = products.filter(
  //             product => product.id !== selectedProduct.id
  //           )
  //           setProducts(updatedProducts)
  //           // Close the delete modal
  //           setmodal_delete(false)
  //         } else {
  //           console.error("Failed to delete product")
  //         }
  //       })
  //       .catch(error => {
  //         console.error("Error deleting product:", error)
  //       })
  //   }


    const removeBodyCss = () => {
    document.body.classList.add("no_padding")
  }

  const tog_edit = (product) => {
    setmodal_edit(!modal_edit);
    setSelectedProduct(product)
    removeBodyCss();
  };
  const tog_delete = (product) => {
    setmodal_delete(!modal_delete);
    setSelectedProduct(product)
    removeBodyCss();
  };
  

  const data = {
    columns: [
      {
        label: "ID",
        field: "id",
        sort: "asc",
        width: 150,
      },
      {
        label: "Price Unit",
        field: "price_unit",
        sort: "asc",
        width: 150,
      },
      {
        label: "Price Total",
        field: "price_total",
        sort: "asc",
        width: 150,
      },
      {
        label: "Impression",
        field: "impression",
        sort: "asc",
        width: 150,
      },
      {
        label: "Paper",
        field: "paper",
        sort: "asc",
        width: 150,
      },
      {
        label: "Format",
        field: "format",
        sort: "asc",
        width: 150,
      },
      {
        label: "Quantity",
        field: "quantity",
        sort: "asc",
        width: 150,
      },
      {
        label: "Actions",
        field: "actions",
        width: 150,
      },
    ],
    rows: props.products.map((product) => ({
      id: product.id,
      price_unit: product.price_unit,
      price_total: product.price_total,
      impression: product.impression,
      paper: product.paper,
      format: product.format,
      quantity: product.quantity,
      actions: (
        <div className="flex">
          <button
            className="btn btn-info btn-sm mx-2"
            onClick={() => tog_edit(product)}

            
          >
            <i className="ti-pencil-alt "></i>{" "}
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => tog_delete(product)}
          >
            <i className="ti-trash"></i>
          </button>
        </div>
      ),
    })),
  }

  return (
    <React.Fragment>
          <Modal isOpen={modal_edit} toggle={tog_edit} centered>
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
                }} handleCancel={tog_edit} />
            </ModalBody>
          </Modal>
          <Modal isOpen={modal_delete} toggle={tog_delete} centered>
            <ModalHeader className="mt-0" toggle={tog_delete}>Delete Product</ModalHeader>
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
