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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap"
import Dropzone from "react-dropzone"
import { Link } from "react-router-dom"
import * as Yup from "yup"
import Select from "react-select"

const AddForm = props => {
  const [subcategories, setSubcategories] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedProperties, setSelectedProperties] = useState([])
  const [openSubcategory, setOpenSubcategory] = useState(null)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [rulesModalOpen, setRulesModalOpen] = useState(false)
  const [quantityPriceRules, setQuantityPriceRules] = useState({})
  const [discountType, setDiscountType] = useState("percent")

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await get("http://127.0.0.1:8000/api/subcategories")
        setCategories(response.data)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await get(
          "http://127.0.0.1:8000/api/ProprieteCategorie"
        )
        setSubcategories(response.data)
      } catch (error) {
        console.error("Error fetching subcategories:", error)
      }
    }

    fetchSubcategories()
  }, [])

  const handleCheckboxChange = prop => {
    setSelectedProperties(prev => {
      if (!prev.includes(prop.id)) {
        return [...prev, prop.id]
      } else {
        return prev.filter(id => id !== prop.id)
      }
    })
  }

  const handleAcceptedFiles = files => {
    const formattedFiles = files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )
    setSelectedFiles(formattedFiles)
  }

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  const toggleSubcategory = index => {
    setOpenSubcategory(openSubcategory === index ? null : index)
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
    quantity_price_rules: Yup.object().test(
      'has-rules',
      'Please add at least one quantity price rule',
      value => Object.keys(value).length > 0
    ),
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
      quantity_price_rules: {},
    },
    validationSchema,
    onSubmit: (values) => {
      const combinedValues = {
        ...values,
        propriete: selectedProperties,
      }
      console.log(combinedValues)
      selectedFiles.forEach((file, index) => {
        combinedValues[`file${index}`] = file
      })
      props.handleSave(combinedValues)
    },
  })

  const handleAddRule = (event) => {
    event.preventDefault()
    const form = event.target
    const newRule = {
      operator: form.operator.value,
      quantity: form.quantity.value,
      discountType: form.discountType.value,
      discount: form.discountType.value === "percent" ? form.discount.value : null,
      amount: form.discountType.value === "fixed" ? form.amount.value : null,
    }
    const newRuleIndex = Object.keys(quantityPriceRules).length
    setQuantityPriceRules({ ...quantityPriceRules, [newRuleIndex]: newRule })
    setRulesModalOpen(false)
    validation.setFieldValue("quantity_price_rules", { ...quantityPriceRules, [newRuleIndex]: newRule })
  }

  const handleQuantityPriceRulesChange = (selectedOptions) => {
    const newRules = {}
    selectedOptions.forEach((option, index) => {
      newRules[index] = option.value
    })
    setQuantityPriceRules(newRules)
    validation.setFieldValue("quantity_price_rules", newRules)
  }

  const quantityPriceRuleOptions = Object.values(quantityPriceRules).map((rule, index) => ({
    value: rule,
    label: `${rule.quantity} ${rule.operator} ${rule.discountType === "percent" ? `${rule.discount}%` : `$${rule.amount}`}`,
  }))

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
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <div className="mb-3">
            <Label className="form-label">Quantity Type</Label>
            <Input
              type="text"
              className="form-control"
              name="quantity_type"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.quantity_type || ""}
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
            <Label className="form-label">Quantity Price Rules</Label>
            <Select
              name="quantity_price_rules"
              isMulti
              options={quantityPriceRuleOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleQuantityPriceRulesChange}
              value={Object.values(quantityPriceRules).map((rule, index) => ({
                value: rule,
                label: `${rule.quantity} ${rule.operator} ${rule.discountType === "percent" ? `${rule.discount}%` : `$${rule.amount}`}`,
                key: `${rule.quantity}-${rule.operator}-${rule.discountType === "percent" ? rule.discount : rule.amount}-${index}`,
              }))}
            />
            {validation.touched.quantity_price_rules && validation.errors.quantity_price_rules && (
              <FormFeedback className="d-block">
                {validation.errors.quantity_price_rules}
              </FormFeedback>
            )}
            <Button
              type="button"
              color="secondary"
              className="ms-2"
              onClick={() => setRulesModalOpen(true)}
            >
              Add Rule
            </Button>
          </div>
        </Col>
        <Col md={6}>
          <div className="mb-3">
            <Label className="form-label">Sub Category</Label>
            <Input
              type="select"
              name="sub_category_id"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.sub_category_id || ""}
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
              <div>
                <Dropzone onDrop={handleAcceptedFiles}>
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
                  {selectedFiles.map((f, i) => (
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
                  ))}
                </div>
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

      <Modal isOpen={rulesModalOpen} toggle={() => setRulesModalOpen(false)}>
        <ModalHeader toggle={() => setRulesModalOpen(false)}>
          Add Quantity Price Rule
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleAddRule}>
            <Row>
              <Col md={4}>
                <div className="mb-3">
                  <Label className="form-label">Comparison Operator</Label>
                  <Input type="select" name="operator" required>
                    <option value=">">Greater Than (&gt;)</option>
                    <option value="<">Less Than (&lt;)</option>
                    <option value="=">Equal To (=)</option>
                  </Input>
                </div>
              </Col>
              <Col md={4}>
                <div className="mb-3">
                  <Label className="form-label">Quantity</Label>
                  <Input type="number" name="quantity" required />
                </div>
              </Col>
              <Col md={4}>
                <div className="mb-3">
                  <Label className="form-label">Discount Type</Label>
                  <Input
                    type="select"
                    name="discountType"
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value)}
                    required
                  >
                    <option value="percent">Percent</option>
                    <option value="fixed">Fixed</option>
                  </Input>
                </div>
              </Col>
            </Row>
            {discountType === "percent" && (
              <Row>
                <Col md={12}>
                  <div className="mb-3">
                    <Label className="form-label">Discount</Label>
                    <Input type="text" name="discount" required />
                  </div>
                </Col>
              </Row>
            )}
            {discountType === "fixed" && (
              <Row>
                <Col md={12}>
                  <div className="mb-3">
                    <Label className="form-label">Amount</Label>
                    <Input type="text" name="amount" required />
                  </div>
                </Col>
              </Row>
            )}
            <Button type="submit" color="primary">
              Add Rule
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setRulesModalOpen(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

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
