import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Row, Col, CardBody, Card, Form, FormFeedback, Label, Input, Alert } from "reactstrap";

import * as Yup from "yup";

import { registerUser, apiError, registerUserFailed } from "../../store/actions";

// Redux
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// import images
import { post } from "helpers/api_helper";
import { useFormik } from "formik/dist";

const ProfessionalRegister = props => {
  const history = useNavigate();

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

  // Handle region selection
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
      region:selectedRegion,
      city: selectedCity,
      country: 'Maroc',
      company_size: '',
      industry_sector: '',
      ice: '',
      company: '',
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
      company_size: Yup.string().required("Please Enter Your Company Size"),
      industry_sector: Yup.string().required("Please Enter Your Industry Sector"),
      ice: Yup.string().required("Please Enter Your Ice"),
      company: Yup.string().required("Please Enter Your company"),
    }),
    onSubmit: async  (values) =>  {
      try {
        const response = await post('http://127.0.0.1:8000/api/register',{
          ...values,
          addresses: [{line:values.address1}, {line:values.address2}],
          customer_type:"professional",
      });
        if (response.data.user) {

          localStorage.setItem('token', response.data.token);
          history('/login');
        } else {
          dispatch(registerUserFailed(response.data.message));
        }
      } catch (error) {
        console.error('Error registering user:', error);
        dispatch(apiError('Failed to register user. Please try again later.'));
      }
  
    }
  });

  document.title = "Register | Veltrix - React Admin & Dashboard Template";
  return (
    <React.Fragment>

          <Row className="justify-content-center mt-4">
            
            <Col md={8} lg={4} xl={10}>
              <Card className="overflow-hidden">
                <div className="bg-primary">
                  <div className="text-primary text-center ">
                    <h5 className="text-white font-size-20 p-2">Professional Register</h5>
                  </div>
                </div>
                <CardBody className="p-4">
                  <div className="p-3">
                    {user ? (
                      <Alert color="success" style={{ marginTop: "13px" }} className="mt-5">
                        Register User Successful
                      </Alert>
                    ) : null}
                    <Form className="mt-4" onSubmit={validation.handleSubmit} action="#">
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
                    <Row>
                        <Col xs={12} sm={6} className="mb-3">
                          <Label className="form-label" htmlFor="name">Company</Label>
                          <Input
                            name="company"
                            className="form-control"
                            placeholder="Enter COmpany Name"
                            type="text"
                            id="company"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.company || ""}
                            invalid={validation.touched.company && validation.errors.company}
                          />
                          <FormFeedback>{validation.errors.company}</FormFeedback>
                        </Col>
                        <Col xs={12} sm={6} className="mb-3">
                          <Label className="form-label" htmlFor="ice">Ice</Label>
                          <Input
                            name="ice"
                            className="form-control"
                            placeholder="Enter ice"
                            type="text"
                            id="ice"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.ice || ""}
                            invalid={validation.touched.ice && validation.errors.ice}
                          />
                          <FormFeedback>{validation.errors.ice}</FormFeedback>
                        </Col>
                      </Row>
                      <Row>
  <Col xs={12} sm={6} className="mb-3">
    <Label className="form-label" htmlFor="company_size">Company Size</Label>
    <Input
      type='select'
      name="company_size"
      className="form-control"
      onChange={validation.handleChange}
      onBlur={validation.handleBlur}
      value={validation.values.company_size || ""}
      invalid={validation.touched.company_size && validation.errors.company_size}
    >
      <option value="">Select Company Size</option>
      
       <option value="1 à 9">1 à 9</option>
        <option value="10 à 49">10 à 49</option>
        
         <option value="50 à 99">50 à 99</option>
          <option value="100+">100+</option>
    </Input>
    <FormFeedback>{validation.errors.company_size}</FormFeedback>
  </Col>
  <Col xs={12} sm={6} className="mb-3">
    <Label className="form-label" htmlFor="industry_sector">Industry Sector</Label>
    <Input
      type='select'
      name="industry_sector"
      className="form-control"
      onChange={validation.handleChange}
      onBlur={validation.handleBlur}
      value={validation.values.industry_sector || ""}
      invalid={validation.touched.industry_sector && validation.errors.industry_sector}
    >
            <option value="">Select Industry Sector</option>

       <option value="Agroalimentaire"> Agroalimentaire </option>
        <option value="Automobile">Automobile</option>
         <option value="Banque / Assurance"> Banque / Assurance </option>
          <option value="BTP">BTP</option>
        <option value="Chimie / Parachimie"> Chimie / Parachimie </option> 
        <option value="Commerce / Négoce / Distribution"> Commerce / Négoce / Distribution </option> 
        <option value="Edition / Communication / Multimédia"> Edition / Communication / Multimédia </option> 
        <option value="Education">Education</option> 
        <option value="Electronique / Electricité"> Electronique / Electricité </option> 
        <option value="Etudes et Conseils"> Etudes et Conseils </option>
         <option value="Hôtellerie/Restauration"> Hôtellerie/Restauration </option> 
         <option value="Immobilier">Immobilier</option> <option value="Industrie">Industrie</option>
          <option value="Informatique / Télécoms"> Informatique / Télécoms </option> 
          <option value="Profession libérale"> Profession libérale </option> 
          <option value="Pharmacie/Parapharmacie"> Pharmacie/Parapharmacie </option> 
          <option value="Santé">Santé</option>
           <option value="Services aux entreprises"> Services aux entreprises </option>
            <option value="Textile">Textile</option>
            <option value="Transport / Logistique"> Transport / Logistique </option>
             <option value="Autre">Autre</option> 

    </Input>
    <FormFeedback>{validation.errors.industry_sector}</FormFeedback>
  </Col>
</Row>
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
          onChange={(e)=>{handleRegionChange(e) 
            validation.handleChange(e)}}
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
          onChange={(e)=>{handleCityChange(e) 
            validation.handleChange(e)}}
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
                      </Row>

                      <div className="mb-3 row">
                        <div className="col-12 text-end">
                        <button className="btn btn-primary w-md waves-effect waves-light" type="submit">Register</button>
                        </div>
                      </div>

                      <div className="mt-2 mb-0 row">
                        <div className="col-12 mt-4">
                          <p className="mb-0">By registering you agree to the Veltrix <Link to="#" className="text-primary">Terms of Use</Link></p>
                        </div>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Already have an account ?{" "}
                  <Link to="/login" className="fw-medium text-primary">
                    {" "}
                    Login
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Veltrix. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by Themesbrand
                </p>
              </div>
            </Col>
          </Row>
    </React.Fragment>
  );
};

ProfessionalRegister.propTypes = {
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
  ProfessionalRegister,
  apiError,
  registerUserFailed,
})(ProfessionalRegister);
