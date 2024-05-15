import React from "react";
import { Label, Input, FormFeedback } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const EditForm = (props) => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Please enter a name"),
    description: Yup.string().required("Please enter a description"),
  });

  const formik = useFormik({
    initialValues: {
      name: props.property.name || "",
      description: props.property.description || "",
    },
    validationSchema,
    onSubmit: (values) => {
      props.handleEdit(props.property.id, values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-3">
        <Label className="form-label">Name</Label>
        <Input
          type="text"
          className="form-control"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          invalid={formik.touched.name && formik.errors.name}
        />
        <FormFeedback>{formik.errors.name}</FormFeedback>
      </div>
      <div className="mb-3">
        <Label className="form-label">Description</Label>
        <Input
          type="text"
          className="form-control"
          name="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          invalid={formik.touched.description && formik.errors.description}
        />
        <FormFeedback>{formik.errors.description}</FormFeedback>
      </div>

      <button type="submit" className="btn btn-primary">
        Update Propriete Categorie
      </button>
      <button type="button" className="btn btn-secondary ms-2" onClick={props.handleCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditForm;
