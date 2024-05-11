import { useFormik } from "formik";
import React, { useState } from "react";
import { Form, FormFeedback, Input, Label } from "reactstrap";
import * as Yup from "yup";

const EditForm = props => {
  const validationSchema = Yup.object({
    nom: Yup.string().required("Please Enter Category Name")
  });

  const validation = useFormik({
    initialValues: {
      nom: props.category.nom
    },
    validationSchema,
    onSubmit: (values) => props.handleEdit(props.category.id, values)
  });


  return (
    <Form onSubmit={validation.handleSubmit}>
      <div className="mb-3">
        <Label className="form-label">Category Name</Label>
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