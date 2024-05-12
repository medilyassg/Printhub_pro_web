import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { Label, Input, FormFeedback } from "reactstrap";
import Select from "react-select";
import * as Yup from "yup";
import { get } from "helpers/api_helper";

const EditForm = (props) => {
  const [selectedMulti, setselectedMulti] = useState([]);
  const [selectedSubcategoriesIDs, setselectedSubcategoriesIDs] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    fetchSubcategories();
  }, []);

  useEffect(() => {
    if (props.property.sub_categories) {
      const selectedProperty = props.property.sub_categories.map((subcategory) => ({
        label: subcategory.nom,
        value: subcategory.id
      }));
      setselectedMulti(selectedProperty);
      setselectedSubcategoriesIDs(selectedProperty.map((subcategory) => subcategory.value));
    }
  }, [props.property]);

  const fetchSubcategories = async () => {
    try {
      const response = await get("http://127.0.0.1:8000/api/subcategories");
      const data = await response.data;
      setSubcategories(data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const optionGroup = subcategories.map((subcategory) => ({
    label: subcategory.nom,
    value: subcategory.id
  }));

  const handleMulti = (selectedOptions) => {
    const selectedIds = selectedOptions.map((option) => option.value);
    setselectedSubcategoriesIDs(selectedIds);
    setselectedMulti(selectedOptions);
  };

  const validationSchema = Yup.object({
    nom: Yup.string().required("Please Enter a name"),
    description: Yup.string().required("Please Enter description"),
    price: Yup.number().required("Please Enter price"),
  });

  const validation = useFormik({
    initialValues: {
      nom: props.property.nom || "",
      description: props.property.description || "",
      price: props.property.price || "",
    },
    validationSchema,
    onSubmit: (values) => {
      props.handleEdit(props.property.id, { ...values, sub_categories: selectedSubcategoriesIDs });
    },
  });

  return (
    <form onSubmit={validation.handleSubmit}>
      <div className="mb-3">
        <Label className="form-label">Name</Label>
        <Input
          type="text"
          className="form-control"
          name="nom"
          onChange={validation.handleChange}
          onBlur={validation.handleBlur}
          value={validation.values.nom}
          invalid={validation.touched.nom && validation.errors.nom}
        />
        <FormFeedback>{validation.errors.nom}</FormFeedback>
      </div>
      <div className="mb-3">
        <Label className="form-label">Description</Label>
        <Input
          type="text"
          className="form-control"
          name="description"
          onChange={validation.handleChange}
          onBlur={validation.handleBlur}
          value={validation.values.description}
          invalid={validation.touched.description && validation.errors.description}
        />
        <FormFeedback>{validation.errors.description}</FormFeedback>
      </div>
      <div className="mb-3">
        <Label className="form-label">Price</Label>
        <Input
          type="number"
          step={0.1}
          className="form-control"
          name="price"
          onChange={validation.handleChange}
          onBlur={validation.handleBlur}
          value={validation.values.price}
          invalid={validation.touched.price && validation.errors.price}
        />
        <FormFeedback>{validation.errors.price}</FormFeedback>
      </div>
      <div className="mb-3">
        <Label className="form-label">Subcategories</Label>
        <Select
          name="sub_categories"
          value={selectedMulti}
          isMulti={true}
          onChange={handleMulti}
          options={optionGroup}
          classNamePrefix="select2-selection"
        />
      </div>
      <FormFeedback>{validation.errors.sub_categories}</FormFeedback>
      <button type="submit" className="btn btn-primary">Update Property</button>
      <button type="button" className="btn btn-secondary ms-2" onClick={props.handleCancel}>Cancel</button>
    </form>
  );
};

export default EditForm;
