import { useFormik } from "formik"
import { get } from "helpers/api_helper"
import React, { useEffect, useState } from "react"
import {
  Button,
  Col,
  Collapse,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap"
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";

import * as Yup from "yup"

const AddForm = props => {
  const [subcategories, setSubcategories] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedProperties, setSelectedProperties] = useState([])
  const [openSubcategory, setOpenSubcategory] = useState(null)
  const [selectedFiles, setselectedFiles] = useState([]);

  function handleAcceptedFiles(files) { 
    setselectedFiles(files);
  }
  console.log(selectedFiles)
  /**
   * Formats the size
   */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
  const toggleSubcategory = index => {
    if (openSubcategory === index) {
      setOpenSubcategory(null)
    } else {
      setOpenSubcategory(index)
    }
  }

  useEffect(() => {
    const fetchcategories = async () => {
      try {
        const response = await get("http://127.0.0.1:8000/api/subcategories")
        const data = await response.data
        setCategories(data)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchcategories()
  }, [])

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await get(
          "http://127.0.0.1:8000/api/ProprieteCategorie"
        )
        const data = await response.data
        setSubcategories(data)
      } catch (error) {
        console.error("Error fetching subcategories:", error)
      }
    }

    fetchSubcategories()
  }, [])

  const handleCheckboxChange = prop => {
    setSelectedProperties(propriete => {
      if (!propriete.includes(prop.id)) {
        return [...propriete, prop.id]
      } else {
        return propriete.filter(id => id !== prop.id)
      }
    })
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("Please Enter Name"),
    slug: Yup.string().required("Please Enter Slug"),
    description: Yup.string().required("Please Enter Description"),
    design_price: Yup.number().required("Please Enter Design Price"),
    price_unit: Yup.number().required("Please Enter Price Unit"),
    quantity: Yup.number().required("Please Enter Quantity"),
    sub_category_id: Yup.string().required("Please Select Sub Category"),
    quantity_type: Yup.string().required("Please Enter Quantity Type"),
  })

  const validation = useFormik({
    initialValues: {
      name: "",
      slug: "",
      description: "",
      design_price: "",
      price_unit: "",
      quantity: "",
      sub_category_id: "",
      quantity_type: "",
      propriete: [],
    },
    validationSchema,
    onSubmit: values => {
      const combinedValues = { ...values, propriete: selectedProperties
      };
      selectedFiles.forEach((file, index) => {
        combinedValues[`file${index}`]= file
      });
      props.handleSave(combinedValues)
    },
  })

  return (
    <Form onSubmit={validation.handleSubmit}>
      <Row>
        <Col md={6}>
          <div className="mb-3">
            <Label className="form-label">Name</Label>
            <Input  
              type="text"
              className="form-control"
              name="name"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.name || ""}
              invalid={validation.touched.name && validation.errors.name}
            />
            <FormFeedback>{validation.errors.name}</FormFeedback>
          </div>
        </Col>
        <Col md={6}>
          <div className="mb-3">
            <Label className="form-label">Slug</Label>
            <Input
              type="text"
              className="form-control"
              name="slug"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.slug || ""}
              invalid={validation.touched.slug && validation.errors.slug}
            />
            <FormFeedback>{validation.errors.slug}</FormFeedback>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <div className="mb-3">
            <Label className="form-label">Description</Label>
            <Input
              type="textarea"
              className="form-control"
              name="description"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.description || ""}
              invalid={
                validation.touched.description && validation.errors.description
              }
            />
            <FormFeedback>{validation.errors.description}</FormFeedback>
          </div>
        </Col>
        <Col md={6}>
          <div className="mb-3">
            <Label className="form-label">Design Price</Label>
            <Input
              type="number"
              className="form-control"
              name="design_price"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.design_price || ""}
              invalid={
                validation.touched.design_price &&
                validation.errors.design_price
              }
            />
            <FormFeedback>{validation.errors.design_price}</FormFeedback>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <div className="mb-3">
            <Label className="form-label">Price Unit</Label>
            <Input
              type="number"
              className="form-control"
              name="price_unit"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.price_unit || ""}
              invalid={
                validation.touched.price_unit && validation.errors.price_unit
              }
            />
            <FormFeedback>{validation.errors.price_unit}</FormFeedback>
          </div>
        </Col>
        <Col md={6}>
          <div className="mb-3">
            <Label className="form-label">Quantity</Label>
            <Input
              type="number"
              className="form-control"
              name="quantity"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.quantity || ""}
              invalid={
                validation.touched.quantity && validation.errors.quantity
              }
            />
            <FormFeedback>{validation.errors.quantity}</FormFeedback>
          </div>{" "}
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <div className="mb-3">
            <Label className="form-label">Quantity Type</Label>
            <Input
              type="text"
              name="quantity_type"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.quantity_type}
              invalid={
                validation.touched.quantity_type &&
                validation.errors.quantity_type
              }
            />
            <FormFeedback>{validation.errors.quantity_type}</FormFeedback>
          </div>
        </Col>
        <Col md={6}>
          <div className="mb-3">
            <Label className="form-label">Sub Category</Label>
            <Input
              type="select"
              name="sub_category_id"
              value={validation.values.sub_category_id}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              invalid={
                validation.touched.sub_category_id &&
                validation.errors.sub_category_id
              }
            >
              <option value="">Select Sub Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.nom}
                </option>
              ))}
            </Input>
            <FormFeedback>{validation.errors.sub_category_id}</FormFeedback>
          </div>
        </Col>
      </Row>
      <Row>
            <Col className="col-12 ">
              <Card>
                <CardBody>
                  <CardTitle className="h4">Images</CardTitle>
                  
                  <div >
                    <Form>
                      <Dropzone
                        onDrop={acceptedFiles => {
                          handleAcceptedFiles(acceptedFiles);
                        }}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div className="dropzone">
                            <div
                              className="dz-message needsclick"
                              {...getRootProps()}
                            >
                              <input {...getInputProps()} />
                              <div className="mb-3">
                                <i className="mdi mdi-cloud-upload display-4 text-muted"></i>
                              </div>
                              <h4>Drop files here or click to upload.</h4>
                            </div>
                          </div>
                        )}
                      </Dropzone>
                      <div className="dropzone-previews mt-3" id="file-previews">
                        {selectedFiles.map((f, i) => {
                          return (
                            <Card
                              className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                              key={i + "-file"}
                            >
                              <div className="p-2">
                                <Row className="align-items-center">
                                  <Col className="col-auto">
                                    <img
                                      data-dz-thumbnail=""
                                      height="80"
                                      className="avatar-sm rounded bg-light"
                                      alt={f.name}
                                      src={f.preview}
                                    />
                                  </Col>
                                  <Col>
                                    <Link
                                      to="#"
                                      className="text-muted font-weight-bold"
                                    >
                                      {f.name}
                                    </Link>
                                    <p className="mb-0">
                                      <strong>{f.formattedSize}</strong>
                                    </p>
                                  </Col>
                                </Row>
                              </div>
                            </Card>
                          );
                        })}
                      </div>
                    </Form>
                  </div>

                </CardBody>
              </Card>
            </Col>
          </Row>
      <Row>
        <Col md={12}>
          <h5 className="mb-3 mt-4">Properties</h5>
          <div className="propriete-container">
            {subcategories.map((subcategory, index) => (
              <div key={subcategory.id}>
                <h6
                  onClick={() => toggleSubcategory(index)}
                  style={{ cursor: "pointer" }}
                >
                  {subcategory.name}{" "}
                  <i className="ion ion-md-arrow-dropdown"></i>
                </h6>

                <Collapse isOpen={openSubcategory === index}>
                  <Row>
                    {subcategory.propriete.map(property => (
                      <Col key={property.id} md={3}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`property-${property.id}`}
                            value={property.id}
                            checked={selectedProperties.includes(property.id)}
                            onChange={() => handleCheckboxChange(property)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`property-${property.id}`}
                          >
                            {property.name}
                          </label>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Collapse>
              </div>
            ))}
          </div>
        </Col>
      </Row>

      

      <Button type="submit" color="primary">
        Add Product
      </Button>
      <Button
        type="button"
        color="secondary"
        className="ms-2"
        onClick={props.handleCancel}
      >
        Cancel
      </Button>
    </Form>
  )
}

export default AddForm
