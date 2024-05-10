import PropTypes from "prop-types";
import React from "react";
import { Row, Col, CardBody, Form, FormFeedback, Label, Input, Alert } from "reactstrap";

import * as Yup from "yup";

import { apiError } from "../../../store/actions";

import { connect } from "react-redux";

import { useFormik } from "formik/dist";

const AddRoleForm = props => {

  const validationSchema = Yup.object({
    name: Yup.string().required("Please Enter Role Name")
  });

  const validation = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema,
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
                    <Label className="form-label" htmlFor="name">Role Name</Label>
                    <Input
                      name="name"
                      className="form-control"
                      placeholder="Enter Permission Name"
                      type="text"
                      id="name"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.name || ""}
                      invalid={validation.touched.name && validation.errors.name}
                    />
                    <FormFeedback>{validation.errors.name}</FormFeedback>
                  </Col>
                </Row>

                <div className="mt-3 d-flex justify-content-between">
                  <button className="btn btn-secondary waves-effect" type="button" onClick={props.handleCancel}>Cancel</button>
                  <button className="btn btn-primary waves-effect" type="submit">Save Role</button>
                </div>
              </Form>
            </div>
          </CardBody>

        </Col>
      </Row>
    </React.Fragment>
  );
};

AddRoleForm.propTypes = {
  apiError: PropTypes.func.isRequired,
};

export default connect(null, {
  apiError,
})(AddRoleForm);
