import PropTypes from "prop-types";
import React from "react";
import { Row, Col, CardBody, Form, FormFeedback, Label, Input, Alert } from "reactstrap";

import * as Yup from "yup";

import { apiError } from "../../../store/actions";

import { connect } from "react-redux";

import { useFormik } from "formik/dist";

const AddAddresseForm = props => {

  const validationSchema = Yup.object({
    name: Yup.string().required("Please Enter Role Name")
  });

  const validation = useFormik({
    initialValues: {
      line: '',
      city: '',
      zip: ''
    },
    onSubmit: (values) => props.handleSave(values)
  });

  return (
    <React.Fragment>

      <Row >
        <Col md={12} lg={12}>

          <CardBody className="">
            <div className="">
              <Form className="mt-4" onSubmit={validation.handleSubmit} action="#">
              
                <Row>
                  <Col xs={12} md={12} xl={12}>
                    <Label className="form-label" htmlFor="city">City </Label>
                    <Input
                      name="city"
                      className="form-control"
                      placeholder="Enter city"
                      type="text"
                      id="city"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.city || ""}
                      invalid={validation.touched.city && validation.errors.city}
                    />
                    <FormFeedback>{validation.errors.city}</FormFeedback>
                  </Col>
                  </Row>
                <Row>
                  <Col xs={12} md={12} xl={12}>
                    <Label className="form-label" htmlFor="zip">Zip Code</Label>
                    <Input
                      name="zip"
                      className="form-control"
                      placeholder="Enter Zip Code"
                      type="number"
                      id="zip"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.zip || ""}
                      invalid={validation.touched.zip && validation.errors.zip}
                    />
                    <FormFeedback>{validation.errors.zip}</FormFeedback>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={12} xl={12}>
                    <Label className="form-label" htmlFor="line">Addresse Line</Label>
                    <Input
                      name="line"
                      className="form-control"
                      placeholder="Enter Addresse Line"
                      type="textarea"
                      id="line"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.line || ""}
                      invalid={validation.touched.line && validation.errors.line}
                    />
                    <FormFeedback>{validation.errors.line}</FormFeedback>
                  </Col>
                  </Row>

                <div className="mt-3 d-flex justify-content-between">
                  <button className="btn btn-secondary waves-effect" type="button" onClick={props.handleCancel}>Cancel</button>
                  <button className="btn btn-primary waves-effect" type="submit">Save Addresse</button>
                </div>
              </Form>
            </div>
          </CardBody>

        </Col>
      </Row>
    </React.Fragment>
  );
};

AddAddresseForm.propTypes = {
  apiError: PropTypes.func.isRequired,
};

export default connect(null, {
  apiError,
})(AddAddresseForm);
