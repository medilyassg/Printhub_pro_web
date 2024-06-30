import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Card,
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

// Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";

// actions
import { editProfile, resetProfileFlag } from "../../store/actions";
import useSweetAlert from 'helpers/notifications';
import { get, post, put } from 'helpers/api_helper';
import usePermissions from 'helpers/permissions';

const SettingsIndex = props => {
    const { showSuccessAlert, showErrorAlert } = useSweetAlert();

    const [CompanyInfo, setCompanyInfo] = useState(null);
    const [idx, setidx] = useState(1);
    const { hasPermissions, checkUserPermissions } = usePermissions() // Call the usePermissions hook
    useEffect(() => {
      checkUserPermissions()
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await get("http://127.0.0.1:8000/api/company-info");
                const data = response[0];
                setCompanyInfo(data);
                setidx(data.id);
            } catch (error) {
                console.error('Error fetching company info:', error);
            }
        };

        fetchData();
    }, []);

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            company_name: CompanyInfo?.company_name || '',
            email: CompanyInfo?.email || '',
            site: CompanyInfo?.site || '',
            address: CompanyInfo?.address || '',
            phone_number: CompanyInfo?.phone_number || '',
            idx: CompanyInfo?.id || '',
            company_size: CompanyInfo?.company_size || "",
            industry_sector: CompanyInfo?.industry_sector || "",
            ice: CompanyInfo?.ice || "",
            tva: CompanyInfo?.tva || "",
            logo: null,
            printed_footer: null
        },
        validationSchema: Yup.object({
            company_name: Yup.string().required("Please Enter Company Name"),
            site: Yup.string().required("Please Enter Your Company Site"),
            email: Yup.string().required("Please Enter Your Email"),
            phone_number: Yup.string().required("Please Enter Your Phone Number"),
            logo: Yup.mixed().required("Please upload a logo"),
            printed_footer: Yup.mixed().required("Please upload a printed footer")
        }),
        onSubmit: async (values) => {
            
            const formData = new FormData();
            formData['company_name']=values.company_name
            formData['email']=values.email
            formData['site']=values.site
            formData['address']=values.address
            formData['phone_number']=values.phone_number
            formData['company_size']=values.company_size
            formData['industry_sector']=values.industry_sector
            formData['ice']=values.ice
            formData['tva']=values.tva
            formData['logo']=values.logo
            formData['printed_footer']=values.printed_footer
            formData['_method']='PUT'
    
    console.log(formData)
            try {
                const response = await post(`http://127.0.0.1:8000/api/company-info/${idx}`, formData,{headers: {
                    'Content-Type': 'multipart/form-data',
                    
                  }});
                setCompanyInfo(response);
                showSuccessAlert('Edit Company Info', response.message);
            } catch (error) {
                showErrorAlert('Edit Company Info', error.response.data.message);
            }
        }
    });

    if(!hasPermissions.manageCompanyInfo){
        return ""
    }
    return (
        <React.Fragment>
            {CompanyInfo &&
                <div className="page-content">
                    <Container fluid>
                        {/* Render Breadcrumb */}
                        <Breadcrumb title="admin" breadcrumbItem="Company info" />

                        <h4 className="card-title mb-4">Change Company Info</h4>

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
                                    <Row>
                                        <Col sm={6}>
                                            <div className="form-group">
                                                <Label className="form-label">Company Name</Label>
                                                <Input
                                                    name="company_name"
                                                    className="form-control"
                                                    placeholder="Enter Company Name"
                                                    type="text"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.company_name}
                                                    invalid={validation.touched.company_name && validation.errors.company_name ? true : false}
                                                />
                                                {validation.touched.company_name && validation.errors.company_name ? (
                                                    <FormFeedback type="invalid">{validation.errors.company_name}</FormFeedback>
                                                ) : null}
                                                <Input name="idx" value={idx} type="hidden" />
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
                                                    value={validation.values.email}
                                                    invalid={validation.touched.email && validation.errors.email ? true : false}
                                                />
                                                {validation.touched.email && validation.errors.email ? (
                                                    <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="form-group">
                                                <Label className="form-label">Address</Label>
                                                <Input
                                                    name="address"
                                                    className="form-control"
                                                    placeholder="Enter Address"
                                                    type="text"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.address}
                                                />
                                            </div>
                                        </Col>

                                        <Col sm={6}>
                                            <div className="form-group">
                                                <Label className="form-label">Phone Number</Label>
                                                <Input
                                                    name="phone_number"
                                                    className="form-control"
                                                    placeholder="Enter Phone Number"
                                                    type="text"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.phone_number}
                                                    invalid={validation.touched.phone_number && validation.errors.phone_number ? true : false}
                                                />
                                                {validation.touched.phone_number && validation.errors.phone_number ? (
                                                    <FormFeedback type="invalid">{validation.errors.phone_number}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="form-group">
                                                <Label className="form-label">Site</Label>
                                                <Input
                                                    name="site"
                                                    className="form-control"
                                                    placeholder="Enter Site"
                                                    type="text"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.site}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <div>
                                        <div>
                                            <Row>
                                                <Col xs={12} sm={6} className="mb-3">
                                                    <Label className="form-label" htmlFor="tva">TVA Number</Label>
                                                    <Input
                                                        name="tva"
                                                        className="form-control"
                                                        placeholder="Enter tva number"
                                                        type="text"
                                                        id="tva"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.tva}
                                                        invalid={validation.touched.tva && validation.errors.tva}
                                                    />
                                                    <FormFeedback>{validation.errors.tva}</FormFeedback>
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
                                                        value={validation.values.ice}
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
                                                        value={validation.values.company_size}
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
                                                        value={validation.values.industry_sector}
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
                                                        <option value="Immobilier">Immobilier</option> 
                                                        <option value="Industrie">Industrie</option>
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
                                                    <Label className="form-label" htmlFor="logo">Logo</Label>
                                                    <Input
                                                        type="file"
                                                        name="logo"
                                                        className="form-control"
                                                        onChange={(event) => {
                                                            validation.setFieldValue("logo", event.currentTarget.files[0]);
                                                        }}
                                                        invalid={validation.touched.logo && validation.errors.logo}
                                                    />
                                                    {validation.touched.logo && validation.errors.logo ? (
                                                        <FormFeedback type="invalid">{validation.errors.logo}</FormFeedback>
                                                    ) : null}
                                                </Col>
                                                <Col xs={12} sm={6} className="mb-3">
                                                    <Label className="form-label" htmlFor="printed_footer">Printed Footer</Label>
                                                    <Input
                                                        type="file"
                                                        name="printed_footer"
                                                        className="form-control"
                                                        onChange={(event) => {
                                                            validation.setFieldValue("printed_footer", event.currentTarget.files[0]);
                                                        }}
                                                        invalid={validation.touched.printed_footer && validation.errors.printed_footer}
                                                    />
                                                    {validation.touched.printed_footer && validation.errors.printed_footer ? (
                                                        <FormFeedback type="invalid">{validation.errors.printed_footer}</FormFeedback>
                                                    ) : null}
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                    <div className="text-center mt-4">
                                        <Button type="submit" color="danger">
                                            Edit Company Info
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

SettingsIndex.propTypes = {
    editProfile: PropTypes.func,
    error: PropTypes.any,
    success: PropTypes.any
};

const mapStatetoProps = state => {
    const { error, success } = state.Profile;
    return { error, success };
};

export default withRouter(
    connect(mapStatetoProps, { editProfile, resetProfileFlag })(SettingsIndex)
);
