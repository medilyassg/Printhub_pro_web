import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Form, FormFeedback, Input, Label } from "reactstrap";
import * as Yup from "yup";
const EditForm = props => {
  const validationSchema = Yup.object({
    nom: Yup.string().required("Please Enter Sub-Category Name"),
    categorie_id: Yup.string().required("Please Select A Sub-Category")
  });

  const validation = useFormik({
    initialValues: {
      nom: props.subcategory.nom,
      categorie_id: props.subcategory.categorie_id
    },
    validationSchema,
    onSubmit: (values) => props.handleEdit(props.subcategory.id, values)
  });


  return (
    <Form onSubmit={validation.handleSubmit}>
      <div className="mb-3">
        <Label className="form-label">Sub-Category Name</Label>
        <Input
          type="text"
          step={0.1}
          className="form-control"
          name="nom"
          onChange={validation.handleChange}
          onBlur={validation.handleBlur}
          value={validation.values.nom || ""}
          invalid={validation.touched.nom && validation.errors.nom}
        />
        <FormFeedback>{validation.errors.nom}</FormFeedback>
        
      </div>
      <div className="mb-3">
      <Label className="form-label">Category</Label>
        <Input
          type="select"
          name="categorie_id"
          onChange={validation.handleChange}
          onBlur={validation.handleBlur}
          value={validation.values.categorie_id || 0}
          invalid={
            validation.touched.categorie_id && validation.errors.categorie_id ? true : false
          }
        >
          <option selected disabled>Choose a category</option>
          {props.categories?.map((category => <option value={category.id}>{category.nom}</option>))}
        </Input>
        <FormFeedback>{validation.errors.categorie_id}</FormFeedback>

      </div>

      <button type="submit" className="btn btn-primary mx-2" >
        Save Changes
      </button>
      <button type="button" className="btn btn-secondary" onClick={props.handleCancel}>
        Cancel
      </button>
    </Form>
  );
};

export default EditForm;