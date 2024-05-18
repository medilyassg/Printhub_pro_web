import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Form,
  FormFeedback,
  Label,
  Input
} from "reactstrap";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// Redux
import { connect } from "react-redux";
import withRouter from 'components/Common/withRouter';

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";

import avatar from "../../assets/images/users/user-4.jpg";
// actions
import { editProfile, resetProfileFlag } from "../../store/actions";
import useSweetAlert from 'helpers/notifications';
import { put } from 'helpers/api_helper';

const UserProfile = props => {
  const { showSuccessAlert, showErrorAlert } = useSweetAlert();

  const [email, setemail] = useState("");
  const [phone_number, setphone_number] = useState("");
  const [name, setname] = useState("");
  const [last_name, setLastName] = useState("");
  const [idx, setidx] = useState(1);
  const [user, setUser] = useState();

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"));

      setUser(obj.user)
      setname(obj.user.name);
      setLastName(obj.user.last_name)
      setemail(obj.user.email);
      setphone_number(obj.user.phone_number);
      setidx(obj.user.id || 1);
    }
    setTimeout(() => {
      props.resetProfileFlag();
    }, 3000);

  }, [props.success]);
  
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: name || '',
      last_name: last_name || '',
      email: email || '',
      password: '',
      phone_number: phone_number,
      idx: idx || '',
    
      company_name_size:  user ? user.customer ? user.customer.company_size : "" : "",
      industry_sector: user ? user.customer  ? user.customer.industry_sector:"" :"",
      ice: user ? user.customer ? user.customer.ice :"" : "",
      company_name: user ? user.customer ?  user.customer.company_name : "" : "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your  Name"),
      last_name: Yup.string().required("Please Enter Your Last Name"),
      email: Yup.string().required("Please Enter Your  Email"),
      phone_number: Yup.string().required("Please Enter Your  Phone Number"),
    }),
    onSubmit: async (values) => {
      try {
        if (!values.password) {
          delete values.password;
        }

        const response = await put(`http://127.0.0.1:8000/api/users/${idx}`, { ...values, id: idx,customer_id:user.customer ? user.customer.id : null });
        setUser(response.user)
        localStorage.removeItem("authUser")
        localStorage.setItem("authUser", JSON.stringify(response));
        showSuccessAlert('Edit User Info ', response.message);
      } catch (error) {
        showErrorAlert('Edit User Info ', error.response.data.message);
      }

    }
  });

  document.title = "Profile";
  return (
    <React.Fragment>
      {user &&
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Veltrix" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              {props.error && props.error ? (
                <Alert color="danger">{props.error}</Alert>
              ) : null}
              {props.success ? (
                <Alert color="success">{props.success}</Alert>
              ) : null}

              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="mx-3">
                      <img
                        src={avatar}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="align-self-center flex-1">
                      <div className="text-muted">
                        <h5>{name}</h5>
                        <p className="mb-1">{email}</p>
                        <p className="mb-0">Id no: #{idx}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Change User Info</h4>

          <Card>
            <CardBody>

              <Form
                className="form-horizontal"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <div className="form-group">
                  <Label className="form-label">Name</Label>
                  <Input
                    name="name"
                    className="form-control"
                    placeholder="Enter Name"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.name || ""}
                    invalid={
                      validation.touched.name && validation.errors.name ? true : false
                    }
                  />
                  {validation.touched.name && validation.errors.name ? (
                    <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                  ) : null}
                  <Input name="idx" value={idx} type="hidden" />
                </div>
                <div className="form-group">
                  <Label className="form-label">Last Name</Label>
                  <Input
                    name="last_name"
                    className="form-control"
                    placeholder="Enter last Name"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.last_name || ""}
                    invalid={
                      validation.touched.last_name && validation.errors.last_name ? true : false
                    }
                  />
                  {validation.touched.last_name && validation.errors.last_name ? (
                    <FormFeedback type="invalid">{validation.errors.last_name}</FormFeedback>
                  ) : null}
                </div>
                <div className="form-group">
                  <Label className="form-label">Email</Label>
                  <Input
                    name="email"
                    className="form-control"
                    placeholder="Enter Email"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.email || ""}
                    invalid={
                      validation.touched.email && validation.errors.email ? true : false
                    }
                  />
                  {validation.touched.email && validation.errors.email ? (
                    <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                  ) : null}
                </div>
                <div className="form-group">
                  <Label className="form-label">Phone Number</Label>
                  <Input
                    name="phone_number"
                    className="form-control"
                    placeholder="Enter Email"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.phone_number || ""}
                    invalid={
                      validation.touched.phone_number && validation.errors.phone_number ? true : false
                    }
                  />
                  {validation.touched.phone_number && validation.errors.phone_number ? (
                    <FormFeedback type="invalid">{validation.errors.phone_number}</FormFeedback>
                  ) : null}
                </div>
                <div className="form-group">
                  <Label className="form-label">password</Label>
                  <Input
                    name="password"
                    className="form-control"
                    placeholder="Laissez vide pour garder le même"
                    type="password"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.password || ""}

                  />

                </div>
                {user.customer  &&
                <div>
                {user.customer.type=="professional" &&
                  <div>
                    <Row>
                      <Col xs={12} sm={6} className="mb-3">
                        <Label className="form-label" htmlFor="name">Company</Label>
                        <Input
                          name="company_name"
                          className="form-control"
                          placeholder="Enter COmpany Name"
                          type="text"
                          id="company_name"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.company_name || ""}
                          invalid={validation.touched.company_name && validation.errors.company_name}
                        />
                        <FormFeedback>{validation.errors.company_name}</FormFeedback>
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
                        <Label className="form-label" htmlFor="company_name_size">Company Size</Label>
                        <Input
                          type='select'
                          name="company_name_size"
                          className="form-control"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.company_name_size || ""}
                          invalid={validation.touched.company_name_size && validation.errors.company_name_size}
                        >
                          <option value="">Select Company Size</option>

                          <option value="1 à 9">1 à 9</option>
                          <option value="10 à 49">10 à 49</option>

                          <option value="50 à 99">50 à 99</option>
                          <option value="100+">100+</option>
                        </Input>
                        <FormFeedback>{validation.errors.company_name_size}</FormFeedback>
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
                  </div>
                }
                </div>
                }
                <div className="text-center mt-4">
                  <Button type="submit" color="danger">
                    Edit User Info
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
      }
    </React.Fragment>
  );
};

UserProfile.propTypes = {
  editProfile: PropTypes.func,
  error: PropTypes.any,
  success: PropTypes.any
};

const mapStatetoProps = state => {
  const { error, success } = state.Profile;
  return { error, success };
};

export default withRouter(
  connect(mapStatetoProps, { editProfile, resetProfileFlag })(UserProfile)
);
