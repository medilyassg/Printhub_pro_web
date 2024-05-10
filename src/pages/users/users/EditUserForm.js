import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Row, Col, CardBody, Card, Form, FormFeedback, Label, Input } from "reactstrap";
import Select from "react-select";

import * as Yup from "yup";

import { apiError, registerUserFailed } from "../../../store/actions";

// Redux
import { connect } from "react-redux";

import { get } from "helpers/api_helper";
import { useFormik } from "formik/dist";

const EditUserForm = (props) => {
  const [selectedMulti, setselectedMulti] = useState(null);
  const [selectedRolesIDs, setselectedRolesIDs] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await get("http://127.0.0.1:8000/api/roles");

      const data = await response.data;
      setRoles(data);
    } catch (error) {
      // setError(error.response.data.message);

    }
  };

  useEffect(() => {
    if (props.userData.roles) {
      const selectedRoles = props.userData.roles.map((role) => ({
        label: role.name,
        value: role.id,
      }));
      setselectedMulti(selectedRoles);
      setselectedRolesIDs(selectedRoles.map((role) => role.value));
    }
  }, [props.userData]);

  const optionGroup = roles.map((role) => ({
    label: role.name,
    value: role.id
  }))




  const handleMulti = (selectedOptions) => {
    const selectedIds = selectedOptions.map(option => option.value);
    setselectedRolesIDs(selectedIds)
    setselectedMulti(selectedOptions);
  };








  const validation = useFormik({
    initialValues: {
      email: props.userData.email,
      name: props.userData.name,
      last_name: props.userData.last_name,
      phone_number: props.userData.phone_number,
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      name: Yup.string().required("Please Enter Your Name"),
      last_name: Yup.string().required("Please Enter Your Last Name"),
      phone_number: Yup.string().required("Please Enter Your phone number"),
    }),
    onSubmit: (values) => props.handleEdit(props.userData.id, {
      ...values,
      roles: selectedRolesIDs
    })
  });

  return (
    <React.Fragment>

      <Row className="">

        <Col md={12} lg={12} xl={12}>
          <Card>

            <CardBody >
              <div >

                <Form onSubmit={validation.handleSubmit} action="#">
                  <Row>
                    <Col xs={12} sm={6} className="mb-3">
                      <Label className="form-label" htmlFor="name">Name</Label>
                      <Input
                        name="name"
                        className="form-control"
                        placeholder="Enter Name"
                        type="text"
                        id="name"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.name || ""}
                        invalid={validation.touched.name && validation.errors.name}
                      />
                      <FormFeedback>{validation.errors.name}</FormFeedback>
                    </Col>
                    <Col xs={12} sm={6} className="mb-3">
                      <Label className="form-label" htmlFor="last_name">Last Name</Label>
                      <Input
                        name="last_name"
                        className="form-control"
                        placeholder="Enter Last Name"
                        type="text"
                        id="last_name"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.last_name || ""}
                        invalid={validation.touched.last_name && validation.errors.last_name}
                      />
                      <FormFeedback>{validation.errors.last_name}</FormFeedback>
                    </Col>
                  </Row>
                  {/* Email & Username */}
                  <Row>
                    <Col xs={12} sm={6} className="mb-3">
                      <Label className="form-label" htmlFor="useremail">Email</Label>
                      <Input
                        name="email"
                        className="form-control"
                        placeholder="Enter Email"
                        type="email"
                        id="useremail"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.email || ""}
                        invalid={validation.touched.email && validation.errors.email}
                      />
                      <FormFeedback>{validation.errors.email}</FormFeedback>
                    </Col>
                    <Col xs={12} sm={6} className="mb-3">
                      <Label className="form-label" htmlFor="phone_number">Phone Number</Label>
                      <Input
                        name="phone_number"
                        className="form-control"
                        placeholder="Enter phone_number"
                        type="text"
                        id="phone_number"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.phone_number || ""}
                        invalid={validation.touched.phone_number && validation.errors.phone_number}
                      />
                      <FormFeedback>{validation.errors.phone_number}</FormFeedback>
                    </Col>
                  </Row>

                  <Col xs={12} sm={6} className="mb-3">
                    <Label className="form-label" htmlFor="roles">Roles</Label>

                    <Select
                      name="roles"
                      value={selectedMulti}
                      isMulti={true}
                      onChange={handleMulti}
                      options={optionGroup}
                      classNamePrefix="select2-selection"
                    />
                    <FormFeedback>{validation.errors.confirmPassword}</FormFeedback>
                  </Col>

                  <div className="mt-3 d-flex justify-content-between">
                    <button className="btn btn-secondary waves-effect" type="button" onClick={props.handleCancel}>Cancel</button>
                    <button className="btn btn-primary waves-effect" type="submit">Save User</button>
                  </div>


                </Form>
              </div>
            </CardBody>
          </Card>

        </Col>
      </Row>

    </React.Fragment>
  );
};

EditUserForm.propTypes = {
  registerUser: PropTypes.func,

};

const mapStatetoProps = state => {
  const { user, registrationError, loading } = state.Account;
  return { user, registrationError, loading };
};

export default connect(mapStatetoProps, {
  EditUserForm,
  apiError,
  registerUserFailed,
})(EditUserForm);
