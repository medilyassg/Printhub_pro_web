import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Row, Col, CardBody, Card, Form, FormFeedback, Label, Input } from "reactstrap";
import Select from "react-select";

import * as Yup from "yup";

import { apiError, registerUserFailed } from "../../../store/actions";

import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { get, post } from "helpers/api_helper";
import { useFormik } from "formik/dist";

const AddUserForm = props => {
  const history = useNavigate();
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
  const optionGroup = roles.map((role) => ({
    label: role.name,
    value: role.id
  }))




  const handleMulti = (selectedOptions) => {
    const selectedIds = selectedOptions.map(option => option.value);
    setselectedRolesIDs(selectedIds)
    setselectedMulti(selectedOptions);
  };
  const dispatch = useDispatch();

  const { user } = useSelector(state => ({
    user: state.Account.user,
  }));
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    fetchRegions();
  }, []);

  // Fetch regions data from GeoNames API
  const fetchRegions = () => {
    fetch('http://api.geonames.org/childrenJSON?geonameId=2542007&username=ilyes')
      .then(response => response.json())
      .then(data => {
        // Extract region names from the response
        const regionNames = data?.geonames?.map(region => ({ name: region?.adminName1, code: region?.adminCode1 }));
        setRegions(regionNames);
      })
      .catch(error => {
        console.error('Error fetching regions:', error);
      });
  };

  const fetchCities = (adminCode) => {
    fetch(`http://api.geonames.org/searchJSON?country=MA&adminCode1=${adminCode}&username=ilyes`)
      .then(response => response.json())
      .then(data => {
        // Extract city names from the response
        const cityNames = data?.geonames?.map(city => city?.name);
        setCities(cityNames);
      })
      .catch(error => {
        console.error('Error fetching cities:', error);
      });
  };

  const handleRegionChange = async (e) => {
    const region = e.target.value;
    await fetchCities(region);
    setSelectedRegion(region);
  }

  // Handle city selection
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => history("/login"), 3000);
    }
  }, [dispatch, user, history]);

  const validation = useFormik({
    enableReinitialize: false,
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      last_name: '',
      phone_number: '',
      address1: '',
      address2: '',
      region: selectedRegion,
      city: selectedCity,
      country: 'Maroc',
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
      confirmPassword: Yup.string()
        .required("Please Confirm Your Password")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
      name: Yup.string().required("Please Enter Your Name"),
      last_name: Yup.string().required("Please Enter Your Last Name"),
      phone_number: Yup.string().required("Please Enter Your phone_number"),
      address1: Yup.string().required("Please Enter Your Address 1"),

      region: Yup.string().required("Please Enter Your Region"),
      city: Yup.string().required("Please Enter Your City"),
      country: Yup.string().required("Please Enter Your Country"),
    }),
    onSubmit: (values) => props.handleSave({
      ...values,
      addresses: [{ name: values.address1, type: "nobe" }, { name: values.address2, type: "none" }],
      roles: selectedRolesIDs
    })
  });

  document.title = "Add user | Veltrix - React Admin & Dashboard Template";
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
                      <Label className="form-label" htmlFor="phone_number">phone_number</Label>
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
                  <Row>

                    <Col xs={12} sm={6} className="mb-3">
                      <Label className="form-label" htmlFor="address1">Address 1</Label>
                      <Input
                        name="address1"
                        className="form-control"
                        placeholder="Enter Address 1"
                        type="text"
                        id="address1"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.address1 || ""}
                        invalid={validation.touched.address1 && validation.errors.address1}
                      />
                      <FormFeedback>{validation.errors.address1}</FormFeedback>
                    </Col>
                    <Col xs={12} sm={6} className="mb-3">
                      <Label className="form-label" htmlFor="address2">Address 2</Label>
                      <Input
                        name="address2"
                        className="form-control"
                        placeholder="Enter Address 2"
                        type="text"
                        id="address2"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.address2 || ""}
                        invalid={validation.touched.address2 && validation.errors.address2}
                      />
                      <FormFeedback>{validation.errors.address2}</FormFeedback>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} sm={6} className="mb-3">
                      <Label className="form-label" htmlFor="region">Region</Label>
                      <Input
                        type='select'
                        name="region"
                        className="form-control"
                        onChange={(e) => {
                          handleRegionChange(e)
                          validation.handleChange(e)
                        }}
                        value={selectedRegion}
                        invalid={validation.touched.region && validation.errors.region}

                      >
                        <option value="">Select Region</option>
                        {regions && regions.map((region, index) => (
                          <option key={index} value={region.code}>{region.name}</option>
                        ))}
                      </Input>
                    </Col>
                    <Col xs={12} sm={6} className="mb-3">
                      <Label className="form-label" htmlFor="city">City</Label>
                      <Input
                        type='select'
                        name="city"
                        className="form-control"
                        onChange={(e) => {
                          handleCityChange(e)
                          validation.handleChange(e)
                        }}
                        value={selectedCity}
                        invalid={validation.touched.city && validation.errors.city}
                      >
                        <option value="">Select City</option>
                        {cities && cities.map((city, index) => (
                          <option key={index} value={city}>{city}</option>
                        ))}
                      </Input>
                    </Col>
                  </Row>

                  <Row>

                    <Col xs={12} sm={6} className="mb-3">
                      <Label className="form-label" htmlFor="country">Country</Label>
                      <Input
                        name="country"
                        className="form-control"
                        placeholder="Enter Country"
                        type="text"
                        id="country"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.country || "Maroc"}
                        invalid={validation.touched.country && validation.errors.country}
                      />
                      <FormFeedback>{validation.errors.country}</FormFeedback>
                    </Col>
                  </Row>

                  {/* Password & Confirm Password */}
                  <Row>
                    <Col xs={12} sm={6} className="mb-3">
                      <Label className="form-label" htmlFor="userpassword">Password</Label>
                      <Input
                        name="password"
                        value={validation.values.password || ""}
                        type="password"
                        id="userpassword"
                        className="form-control"
                        placeholder="Enter Password"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        invalid={validation.touched.password && validation.errors.password}
                      />
                      <FormFeedback>{validation.errors.password}</FormFeedback>
                    </Col>
                    <Col xs={12} sm={6} className="mb-3">
                      <Label className="form-label" htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        name="confirmPassword"
                        value={validation.values.confirmPassword || ""}
                        type="password"
                        id="confirmPassword"
                        className="form-control"
                        placeholder="Confirm Password"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        invalid={validation.touched.confirmPassword && validation.errors.confirmPassword}
                      />
                      <FormFeedback>{validation.errors.confirmPassword}</FormFeedback>
                    </Col>
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
                  </Row>

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

AddUserForm.propTypes = {
  registerUser: PropTypes.func,
  registerUserFailed: PropTypes.func,
  registrationError: PropTypes.any,
  user: PropTypes.any,
};

const mapStatetoProps = state => {
  const { user, registrationError, loading } = state.Account;
  return { user, registrationError, loading };
};

export default connect(mapStatetoProps, {
  AddUserForm,
  apiError,
  registerUserFailed,
})(AddUserForm);
