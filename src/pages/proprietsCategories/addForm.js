import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { Row, Col, CardBody, Card, Form, FormFeedback, Label, Input } from "reactstrap";
import Select from "react-select";
import * as Yup from "yup";
import { get, post } from "helpers/api_helper";

const AddForm = props => {

  const validationSchema = Yup.object({
    name: Yup.string().required("Please Enter a name"),
    description: Yup.string().required("Please Enter description"),
  });


  const validation = useFormik({
    initialValues : {
      name: "",
      description: "",
    },
    validationSchema,
    onSubmit: (values) =>{
      props.handleSave(values)},
  });

  return (
    <form onSubmit={validation.handleSubmit}>
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
      <div className="mb-3">
        <Label className="form-label">Description</Label>
        <Input
          type="text"
          className="form-control"
          name="description"
          id="description"
          onChange={validation.handleChange}
          onBlur={validation.handleBlur}
          value={validation.values.description || ""}
          invalid={validation.touched.description && validation.errors.description}
        />
        <FormFeedback>{validation.errors.description}</FormFeedback>
      </div>

      <button type="submit" className="btn btn-primary">Add ProprieteCategorie</button>
      <button type="button" className="btn btn-secondary ms-2" onClick={props.handleCancel}>Cancel</button>
    </form>
  )
}

export default AddForm;