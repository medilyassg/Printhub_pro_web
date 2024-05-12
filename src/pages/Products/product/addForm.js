import { useFormik } from "formik";
import React, { useState } from "react";
import { Form, FormFeedback, Input, Label } from "reactstrap";
import * as Yup from "yup";

const AddForm = props => {
  const validationSchema = Yup.object({
    price_unit: Yup.number().required("Please Enter Price Unit"),
    price_total: Yup.number().required("Please Enter Price Total"),
    impression: Yup.string().required("Please Enter Impression"),
    paper: Yup.string().required("Please Enter Paper"),
    format: Yup.string().required("Please Enter Format"),
    quantity: Yup.number().required("Please Enter Quantity"),
  });


  const validation = useFormik({
    initialValues : {
      price_unit: "",
      price_total: "",
      impression: "",
      paper: "",
      format: "",
      quantity: "",
      
    },
    validationSchema,
    onSubmit: (values) => props.handleSave({ ...values ,sub_category_id: 1 }),
  });

  
  return (
    <form onSubmit={validation.handleSubmit}>
      <div className="mb-3">
        <Label className="form-label">Price Unit</Label>
        <Input
          type="number"
          step={0.1}
          className="form-control"
          name="price_unit"
          onChange={validation.handleChange}
          onBlur={validation.handleBlur}
          value={validation.values.price_unit}
          invalid={validation.touched.price_unit && validation.errors.price_unit}
        />
        <FormFeedback>{validation.errors.price_unit}</FormFeedback>
      </div>
      <div className="mb-3">
        <Label className="form-label">Price Total</Label>
        <Input
          type="number"
          step={0.1}
          className="form-control"
          name="price_total"
          onChange={validation.handleChange}
          onBlur={validation.handleBlur}
          value={validation.values.price_total}
          invalid={validation.touched.price_total && validation.errors.price_total}
        />
        <FormFeedback>{validation.errors.price_total}</FormFeedback>
      </div>
      <div className="mb-3">
        <Label className="form-label">Impression</Label>
        <Input
          type="text"
          className="form-control"
          name="impression"
          onChange={validation.handleChange}
          onBlur={validation.handleBlur}
          value={validation.values.impression}
          invalid={validation.touched.impression && validation.errors.impression}
        />
        <FormFeedback>{validation.errors.impression}</FormFeedback>
      </div>
      <div className="mb-3">
        <Label className="form-label">Paper</Label>
        <Input
          type="text"
          className="form-control"
          name="paper"
          onChange={validation.handleChange}
          onBlur={validation.handleBlur}
          value={validation.values.paper}
          invalid={validation.touched.paper && validation.errors.paper}
        />
        <FormFeedback>{validation.errors.paper}</FormFeedback>
      </div>
      <div className="mb-3">
        <Label className="form-label">Format</Label>
        <Input
          type="text"
          className="form-control"
          name="format"
          onChange={validation.handleChange}
          onBlur={validation.handleBlur}
          value={validation.values.format}
          invalid={validation.touched.format && validation.errors.format}
        />
        <FormFeedback>{validation.errors.format}</FormFeedback>
      </div>
      <div className="mb-3">
        <Label className="form-label">Quantity</Label>
        <Input
          type="number"
          className="form-control"
          name="quantity"
          onChange={validation.handleChange}
          onBlur={validation.handleBlur}
          value={validation.values.quantity}
          invalid={validation.touched.quantity && validation.errors.quantity}
        />
        <FormFeedback>{validation.errors.quantity}</FormFeedback>
      </div>
      <button type="submit" className="btn btn-primary">Add Product</button>
      <button type="button" className="btn btn-secondary ms-2" onClick={props.handleCancel} >Cancel</button>
    </form>
  )
}

export default AddForm
