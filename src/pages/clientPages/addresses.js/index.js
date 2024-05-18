import React, { useState, useEffect } from "react";
import {
  Row, Col, Card, CardBody, Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";

import Breadcrumbs from "../../../components/Common/Breadcrumb";
import "../../../../src/assets/scss/datatables.scss";
import { post, get, del, put } from "helpers/api_helper";
import useSweetAlert from "helpers/notifications";
import AddAddresseForm from "./AddAddresseForm";
import AddresseTable from "./table";

const ClientAddressesIndex = () => {
  const [modal_add, setmodal_add] = useState(false);
  const [error, setError] = useState('');
  const [addresses, setaddresses] = useState([]);
  const {  showSuccessAlert, showErrorAlert } = useSweetAlert();
  const [user,setUser]=useState()

  const removeBodyCss = () => {
    document.body.classList.add("no_padding");
  };

  const tog_add = () => {
    setmodal_add(!modal_add);
    removeBodyCss();
  };

  const handleSave = async (values) => {
    console.log("jjjj")
    try {
      const response = await post('http://127.0.0.1:8000/api/addresses', {...values,user_id:user.id});
        setmodal_add(false)
        fetchAddresses();
        showSuccessAlert('Add New Addresse ', response.message);


    } catch (error) {
      showErrorAlert('Add New Addresse ', error.response.data.message);

    }
  }

  const handleEdit = async (id, values) => {
    try {
      const response = await put(`http://127.0.0.1:8000/api/addresses/${id}`, { ...values, id: id });
        setError('');
        fetchAddresses();
        showSuccessAlert('Edit  Addresse ', response.message);


    } catch (error) {
      showErrorAlert('Edit Addresse ',error.response.data.message);
    }
  }

 

  const fetchAddresses = async () => {
    try {
        if(user){
            const response = await get(`http://127.0.0.1:8000/api/addresses/user/${user.id}`);
            const data = await response.addresses;
            setaddresses(data);
        }
       
    } catch (error) {
        setError(error.response.data.message);

    }
};
useEffect(() => {
    if (localStorage.getItem("authUser")) {
        const obj = JSON.parse(localStorage.getItem("authUser"));
        setUser(obj.user)
      }
    

}, []);

useEffect(() => {
    fetchAddresses();
  }, [user]);

  const handleDelete = async (addresse) => {
    try {
      const response = await del(`http://127.0.0.1:8000/api/addresses/${addresse.id}`);

      fetchAddresses();
      showSuccessAlert('Delete Addresse ', response.message);

    } catch (error) {
      showErrorAlert('Delete Addresse', error.response.data.message);

    }
  };
  document.title = "Addresses Table ";
  return (
    <React.Fragment>
      <div>

        <Col sm={6} md={4} xl={3}>

          <Modal isOpen={modal_add} toggle={tog_add} centered>
            <ModalHeader className="mt-0" toggle={tog_add}>Add New Addresse</ModalHeader>
            <ModalBody>
              <AddAddresseForm
               handleCancel={tog_add} handleSave={handleSave} error={error} />
            </ModalBody>
          </Modal>
        </Col>


      </div>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs maintitle="addresse" title="addresses" breadcrumbItem="Addresse Table" tog_add={tog_add} />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>


                  <AddresseTable addresses={addresses} handleDelete={handleDelete} handleEdit={handleEdit} />
                </CardBody>
              </Card>
            </Col>
          </Row>


        </div>
      </div>
    </React.Fragment>
  );
};

export default ClientAddressesIndex;
