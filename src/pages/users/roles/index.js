import React ,{useState} from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle , Modal,
    ModalBody,
    ModalHeader, } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import "../../../../src/assets/scss/datatables.scss";
import UserTable from "./table";

const Roleindex = () => {
    const [modal_add, setmodal_add] = useState(false);

    const removeBodyCss = () => {
      document.body.classList.add("no_padding");
    };
  
    const tog_add = () => {
      setmodal_add(!modal_add);
      removeBodyCss();
    };
  
  document.title = "Roles Table ";
  return (
    <React.Fragment>
        <Col sm={6} md={4} xl={3}>
                      
                      <Modal isOpen={modal_add} toggle={tog_add} centered>
                        <ModalHeader className="mt-0" toggle={tog_add}>Add New Role</ModalHeader>
                        <ModalBody>
                          
                        </ModalBody>
                      </Modal>
                    </Col>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs maintitle="users" title="roles" breadcrumbItem="Role Table" tog_add={tog_add} />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  

                  <UserTable/>
                </CardBody>
              </Card>
            </Col>
          </Row>

          
        </div>
      </div>
    </React.Fragment>
  );
};

export default Roleindex;
