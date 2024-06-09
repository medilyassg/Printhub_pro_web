import { useFormik } from "formik";
import { get } from "helpers/api_helper";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Collapse,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import * as Yup from "yup";
import Select from "react-select";

const EditForm = props => {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [openSubcategory, setOpenSubcategory] = useState(null);
  const [SelectedSubCat, setSelectedSubCat] = useState(null);
  const [rulesModalOpen, setRulesModalOpen] = useState(false);
  const [quantityPriceRules, setQuantityPriceRules] = useState({});

  useEffect(() => {
    if (props.product?.subCategory) {
      setSelectedSubCat(props.product.subCategory.id);
    }
    if (props.product?.propriete) {
      setSelectedProperties(
        props.product.propriete.map(property => property.id)
      );
    }
    if (props.product?.quantity_price_rules) {
      setQuantityPriceRules(props.product.quantity_price_rules);
    }
  }, [props.product]);

  const toggleSubcategory = index => {
    if (openSubcategory === index) {
      setOpenSubcategory(null);
    } else {
      setOpenSubcategory(index);
    }
  };

  const handleSubCatChange = async e => {
    const subcat = e.target.value;
    setSelectedSubCat(subcat);
    validation.setFieldValue("sub_category_id", subcat);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await get("http://127.0.0.1:8000/api/subcategories");
        const data = await response.data;
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await get(
          "http://127.0.0.1:8000/api/ProprieteCategorie"
        );
        const data = await response.data;
        setSubcategories(data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubcategories();
  }, []);

  const handleCheckboxChange = property => {
    const propertyId = property.id;
    setSelectedProperties(prevState => {
      if (prevState.includes(propertyId)) {
        return prevState.filter(id => id !== propertyId);
      } else {
        return [...prevState, propertyId];
      }
    });
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Please Enter Name"),
    slug: Yup.string().required("Please Enter Slug"),
    description: Yup.string().required("Please Enter Description"),
    design_price: Yup.number().required("Please Enter Design Price"),
    price_unit: Yup.number().required("Please Enter Price Unit"),
    quantity: Yup.number().required("Please Enter Quantity"),
    quantity_type: Yup.string().required("Please Enter Quantity Type"),
    quantity_price_rules: Yup.object().test(
      "has-rules",
      "Please add at least one quantity price rule",
      value => Object.keys(value).length > 0
    ),
  });

  const validation = useFormik({
    initialValues: {
      name: props.product?.name || "",
      slug: props.product?.slug || "",
      description: props.product?.description || "",
      design_price: props.product?.design_price || "",
      price_unit: props.product?.price_unit || "",
      quantity: props.product?.quantity || "",
      quantity_type: props.product?.quantity_type || "",
      sub_category_id: props.product?.subCategory?.id || "",
      propriete: [],
      quantity_price_rules: props.product?.quantity_price_rules || {},
    },
    validationSchema,
    onSubmit: values => {
      props.handleEdit(props.product.id, {
        ...values,
        propriete: selectedProperties,
      });
    },
  });

  const handleAddRule = event => {
    event.preventDefault();
    const form = event.target;
    const newRule = {
      operator: form.operator.value,
      quantity: form.quantity.value,
      discount: form.discount.value,
    };
    const newRuleIndex = Object.keys(quantityPriceRules).length;
    setQuantityPriceRules({ ...quantityPriceRules, [newRuleIndex]: newRule });
    setRulesModalOpen(false);
    validation.setFieldValue("quantity_price_rules", {
      ...quantityPriceRules,
      [newRuleIndex]: newRule,
    });
  };

  const handleQuantityPriceRulesChange = selectedOptions => {
    const newRules = {};
    selectedOptions.forEach((option, index) => {
      newRules[index] = option.value;
    });
    setQuantityPriceRules(newRules);
    validation.setFieldValue("quantity_price_rules", newRules);
  };

  const quantityPriceRuleOptions = Object.values(quantityPriceRules).map(
    (rule, index) => ({
      value: rule,
      label: `${rule.quantity} ${rule.operator} ${rule.discount}`,
      key: `${rule.quantity}-${rule.operator}-${rule.discount}-${index}`, // Ensure unique keys
    })
  );

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
                label: `${rule.quantity} ${rule.operator} ${rule.discount}`,
                key: `${rule.quantity}-${rule.operator}-${rule.discount}-${index}`, // Ensure unique keys
              }))}
            />
            {validation.touched.quantity_price_rules &&
              validation.errors.quantity_price_rules && (
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
              value={SelectedSubCat}
              onChange={e => {
                handleSubCatChange(e);
                validation.handleChange(e);
              }}
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
                  <Label className="form-label">Discount</Label>
                  <Input type="text" name="discount" required />
                </div>
              </Col>
            </Row>
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
        Edit Product
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
  );
};

export default EditForm;
