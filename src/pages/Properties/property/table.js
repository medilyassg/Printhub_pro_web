import React, { useState, useEffect } from "react"
import { MDBDataTable } from "mdbreact"
import { Modal, ModalBody, ModalHeader, Button } from "reactstrap"
import EditForm from "./editForm"
import DeleteModal from "./DeleteModal"

const PropertyTable = () => {
  const [modal_edit, setmodal_edit] = useState(false);
  const [modal_delete, setmodal_delete] = useState(false);
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/subcategories")
      .then(response => response.json())
      .then(data => {
        setSubCategories(data.data);
      })
      .catch(error => {
        console.error("Error fetching subcategories:", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/properties")
      .then(response => response.json())
      .then(data => {
        setProperties(data.data)
      })
      .catch(error => {
        console.error("Error fetching properties:", error)
      })
  }, [])

  const removeBodyCss = () => {
    document.body.classList.add("no_padding")
  }

  const tog_edit = property => {
    setSelectedProperty(property)
    setmodal_edit(!modal_edit)
    removeBodyCss()
  }

  const tog_delete = propertyId => {
    console.log("Deleting property with ID:", propertyId)
    setmodal_delete(!modal_delete)
    removeBodyCss()
  }

  const handleEditSubmit = updatedProperty => {
    const updatedProperties = properties.map(property =>
      property.id === updatedProperty.id ? updatedProperty : property
    );
    setProperties(updatedProperties);

    fetch(`http://127.0.0.1:8000/api/properties/${updatedProperty.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedProperty)
    })
      .then(response => {
        if (!response.ok) {
          console.error("Failed to update property");
        }
      })
      .catch(error => {
        console.error("Error updating property:", error);
      });
  };
  
  const handleDelete = () => {
    if (!selectedProperty) return

    fetch(`http://127.0.0.1:8000/api/properties/${selectedProperty.id}`, {
      method: "DELETE",
    })
      .then(response => {
        if (response.ok) {
          // Remove the deleted property from the properties list
          const updatedProperties = properties.filter(
            property => property.id !== selectedProperty.id
          )
          setProperties(updatedProperties)
          // Close the delete modal
          setmodal_delete(false)
        } else {
          console.error("Failed to delete property")
        }
      })
      .catch(error => {
        console.error("Error deleting property:", error)
      })
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
        label: "Price",
        field: "price",
        sort: "asc",
        width: 150,
      },
      {
        label: "Subcategories",
        field: "sub_categories",
        width: 150,
      },
      {
        label: "Actions",
        field: "actions",
        width: 150,
      },
    ],
    rows: properties.map(property => ({
      id: property.id,
      name: property.nom,
      description: property.description,
      price: property.price,
      sub_categories: property.sub_categories.map(subCategory => subCategory.nom).join(", "),
      actions: (
        <div className="flex">
          <button
            className="btn btn-info btn-sm mx-2"
            onClick={() => {
              setSelectedProperty(property);
              tog_edit(property);
            }}
          >
            <i className="ti-pencil-alt "></i>{" "}
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              setSelectedProperty(property);
              tog_delete();
            }}
          >
            <i className="ti-trash"></i>
          </button>
        </div>
      ),
    })),
  };
  

  return (
    <React.Fragment>
          <Modal isOpen={modal_edit} toggle={tog_edit} centered>
            <ModalHeader className="mt-0" toggle={tog_edit}>
              Edit Property
            </ModalHeader>
            <ModalBody>
              <EditForm
                isOpen={modal_edit}
                subCategories={subCategories} // Pass subCategories as prop
                property={selectedProperty}
                onSubmit={handleEditSubmit}
                toggle={tog_edit}
              />
            </ModalBody>
          </Modal>
          <Modal isOpen={modal_delete} toggle={tog_delete} centered>
            <ModalHeader className="mt-0" toggle={tog_delete}>
              Delete Property
            </ModalHeader>
            <ModalBody>
              <DeleteModal
                isOpen={modal_delete}
                toggle={tog_delete}
                onDelete={handleDelete}
              />
            </ModalBody>
          </Modal>
        <MDBDataTable responsive bordered data={data} />
    </React.Fragment>
  )
}

export default PropertyTable
