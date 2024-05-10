import PropTypes from "prop-types";
import React from "react";
import { Row, Col, CardBody, Form, FormFeedback, Label, Input, Alert } from "reactstrap";

import * as Yup from "yup";

import { apiError } from "../../../store/actions";

import { connect } from "react-redux";

import { useFormik } from "formik/dist";

const EditRoleForm = props => {

  const validationSchema = Yup.object({
    name: Yup.string().required("Please Enter Role Name")
  });

  const validation = useFormik({
    initialValues: {
      name: props.role.name
    },
    validationSchema,
    onSubmit: (values) => props.handleEdit(props.role.id, values)
  });

  return (
    <React.Fragment>

      <Row >
        <Col md={12} lg={12}>

          <CardBody className="">
            <div className="">
              {props.error && <Alert color="danger">{props.error}</Alert>}
              <Form className="mt-4" onSubmit={validation.handleSubmit} action="#">
                <Row>
                  <Col xs={12} md={12} xl={12}>
                    <Label className="form-label" htmlFor="name">Role Name</Label>
                    <Input
                      name="name"
                      className="form-control"
                      placeholder="Enter Role Name"
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

EditRoleForm.propTypes = {
  apiError: PropTypes.func.isRequired,
};

export default connect(null, {
  apiError,
})(EditRoleForm);
