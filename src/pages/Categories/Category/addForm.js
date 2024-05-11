import { useFormik } from "formik";
import React, { useState } from "react";
import { Form, FormFeedback, Input, Label } from "reactstrap";
import * as Yup from "yup";

const AddForm = props => {
  const validationSchema = Yup.object({
    nom: Yup.string().required("Please Enter Category Name")
  });

  const validation = useFormik({
    initialValues: {
      nom: ''
    },
    validationSchema,
    onSubmit: (values) => props.handleSave({...values})
  });

  return (
    <Form onSubmit={validation.handleSubmit}>
      <div className="mb-3">
        <Label className="form-label">Category name</Label>
        <Input
          type="text"
          placeholder="Enter category name"
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
      <button type="submit" className="btn btn-primary">Add Category</button>
      <button type="button" className="btn btn-secondary ms-2" onClick={props.handleCancel}>Cancel</button>
    </Form>
  )
}

export default AddForm