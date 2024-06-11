import PropTypes from "prop-types";
import React from "react";
import { Row, Col, CardBody, Form, FormFeedback, Label, Input, Alert } from "reactstrap";

import * as Yup from "yup";

import { apiError } from "../../../store/actions";

import { connect } from "react-redux";

import { useFormik } from "formik/dist";

const AddBankForm = props => {

  const validationSchema = Yup.object({
    bank_name: Yup.string().required('Bank Name is required'),
    holder_name: Yup.string().required('Holder Name is required'),
    num_rip: Yup.string().required('RIB Number is required'),
    cle_rip: Yup.string().required('CLE RIB is required'),
    code_swift: Yup.string().required('Swift Code is required'),
  });

  const validation = useFormik({
    initialValues: {
      bank_name: '',
      holder_name: '',
      num_rip: '',
      cle_rip: '',
      code_swift: ''
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
              <Form
                className="form-horizontal"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <Row>
                  <Col sm={6}>
                    <div className="form-group ">
                      <Label className="form-label">Bank Name</Label>
                      <Input
                        name="bank_name"
                        className="form-control"
                        placeholder="Enter Bank Name"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.bank_name}
                        invalid={validation.touched.bank_name && validation.errors.bank_name ? true : false}
                      />
                      {validation.touched.bank_name && validation.errors.bank_name ? (
                        <FormFeedback type="invalid">{validation.errors.bank_name}</FormFeedback>
                      ) : null}
                    </div>

                    <div className="form-group">
                      <Label className="form-label">Holder Name</Label>
                      <Input
                        name="holder_name"
                        className="form-control"
                        placeholder="Enter Holder Name"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.holder_name}
                        invalid={validation.touched.holder_name && validation.errors.holder_name ? true : false}
                      />
                      {validation.touched.holder_name && validation.errors.holder_name ? (
                        <FormFeedback type="invalid">{validation.errors.holder_name}</FormFeedback>
                      ) : null}
                    </div>
                  </Col>

                  <Col sm={6}>
                    <div className="form-group ">
                      <Label className="form-label">RIB Number</Label>
                      <Input
                        name="num_rip"
                        className="form-control"
                        placeholder="Enter RIB Number"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.num_rip}
                        invalid={validation.touched.num_rip && validation.errors.num_rip ? true : false}
                      />
                      {validation.touched.num_rip && validation.errors.num_rip ? (
                        <FormFeedback type="invalid">{validation.errors.num_rip}</FormFeedback>
                      ) : null}
                    </div>

                    <div className="form-group">
                      <Label className="form-label">CLE RIB</Label>
                      <Input
                        name="cle_rip"
                        className="form-control"
                        placeholder="Enter CLE RIB"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.cle_rip}
                        invalid={validation.touched.cle_rip && validation.errors.cle_rip ? true : false}
                      />
                      {validation.touched.cle_rip && validation.errors.cle_rip ? (
                        <FormFeedback type="invalid">{validation.errors.cle_rip}</FormFeedback>
                      ) : null}
                    </div>

                    <div className="form-group">
                      <Label className="form-label">Swift Code</Label>
                      <Input
                        name="code_swift"
                        className="form-control"
                        placeholder="Enter Swift Code"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.code_swift}
                        invalid={validation.touched.code_swift && validation.errors.code_swift ? true : false}
                      />
                      {validation.touched.code_swift && validation.errors.code_swift ? (
                        <FormFeedback type="invalid">{validation.errors.code_swift}</FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Row>

                <button type="submit" className="btn btn-primary">Add Bank</button>
      <button type="button" className="btn btn-secondary ms-2" onClick={props.handleCancel}>Cancel</button>
              </Form>
            </div>
          </CardBody>

        </Col>
      </Row>
    </React.Fragment>
  );
};

AddBankForm.propTypes = {
  apiError: PropTypes.func.isRequired,
};

export default connect(null, {
  apiError,
})(AddBankForm);
