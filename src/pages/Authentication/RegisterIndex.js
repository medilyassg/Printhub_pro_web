import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";


//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import classnames from "classnames";
import Register from "./ParticularRegister";
import ParticularRegister from "./ParticularRegister";
import ProfessionalRegister from "./ProfessionalRegister";

class RegisterIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
      activeTab1: "5",
      activeTab2: "9",
      activeTab3: "13",
      verticalActiveTab: "1",
      customActiveTab: "1",
      activeTabJustify: "1",
      col1: true,
      col2: false,
      col3: false,
      col5: true,
      col6: true,
      col7: true,
      col8: true,
      col9: true,
      col10: false,
      col11: false,
    };
    this.toggle = this.toggle.bind(this);
    this.toggle1 = this.toggle1.bind(this);

    this.t_col1 = this.t_col1.bind(this);
    this.t_col2 = this.t_col2.bind(this);
    this.t_col3 = this.t_col3.bind(this);
    this.t_col5 = this.t_col5.bind(this);
    this.t_col6 = this.t_col6.bind(this);
    this.t_col7 = this.t_col7.bind(this);
    this.t_col8 = this.t_col8.bind(this);
    this.t_col9 = this.t_col9.bind(this);
    this.t_col10 = this.t_col10.bind(this);
    this.t_col11 = this.t_col11.bind(this);

    this.toggle2 = this.toggle2.bind(this);
    this.toggle3 = this.toggle3.bind(this);

    this.toggleVertical = this.toggleVertical.bind(this);
    this.toggleCustom = this.toggleCustom.bind(this);
    this.toggleJustidyCustom = this.toggleJustidyCustom.bind(this);
  }

  t_col1() {
    this.setState({ col1: !this.state.col1 });
    this.setState({ col2: false });
    this.setState({ col3: false });
  }

  t_col2() {
    this.setState({ col2: !this.state.col2 });
    this.setState({ col1: false });
    this.setState({ col3: false });
  }

  t_col3() {
    this.setState({ col3: !this.state.col3 });
    this.setState({ col1: false });
    this.setState({ col2: false });
  }

  t_col5() {
    this.setState({ col5: !this.state.col5 });
  }

  t_col6() {
    this.setState({ col6: !this.state.col6 });
  }

  t_col7() {
    this.setState({ col7: !this.state.col7 });
  }

  t_col8() {
    this.setState({
      col6: !this.state.col6,
      col7: !this.state.col7
    });
  }

  t_col9() {
    this.setState({ col9: !this.state.col9 });
    this.setState({ col10: false });
    this.setState({ col11: false });
  }

  t_col10() {
    this.setState({ col10: !this.state.col10 });
    this.setState({ col9: false });
    this.setState({ col11: false });
  }

  t_col11() {
    this.setState({ col11: !this.state.col11 });
    this.setState({ col9: false });
    this.setState({ col10: false });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  toggle1(tab) {
    if (this.state.activeTab1 !== tab) {
      this.setState({
        activeTab1: tab,
      });
    }
  }

  toggle2(tab) {
    if (this.state.activeTab2 !== tab) {
      this.setState({
        activeTab2: tab,
      });
    }
  }

  toggle3(tab) {
    if (this.state.activeTab3 !== tab) {
      this.setState({
        activeTab3: tab,
      });
    }
  }

  toggleVertical(tab) {
    if (this.state.verticalActiveTab !== tab) {
      this.setState({
        verticalActiveTab: tab,
      });
    }
  }

  toggleCustom(tab) {
    if (this.state.customActiveTab !== tab) {
      this.setState({
        customActiveTab: tab,
      });
    }
  }

  toggleJustidyCustom(tab) {
    if (this.state.activeTabJustify !== tab) {
      this.setState({
        activeTabJustify: tab,
      });
    }
  }


  render() {
    document.title = "Tab & Accordions | Veltrix - React Admin & Dashboard Template";
    return (
      <React.Fragment >
              <Row className="justify-content-center mx-4 mt-5">
              <Col lg={10} className="mt-8">
                    <Nav tabs justified className="nav-tabs-custom">
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: this.state.activeTabJustify === "1",
                          })}
                          onClick={() => {
                            this.toggleJustidyCustom("1");
                          }}
                        >
                          <span className="d-none d-sm-block">Particular</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: this.state.activeTabJustify === "2",
                          })}
                          onClick={() => {
                            this.toggleJustidyCustom("2");
                          }}
                        >
                          <span className="d-none d-sm-block">Professional</span>
                        </NavLink>
                      </NavItem>
                      
                      
                    </Nav>

                    <TabContent activeTab={this.state.activeTabJustify} className="p-3 text-muted">
                      <TabPane tabId="1">
                        <ParticularRegister />
                      </TabPane>
                      <TabPane tabId="2">
                      <ProfessionalRegister />

                      </TabPane>
                   
          
                    </TabContent>
              </Col>

           </Row>
          
      </React.Fragment>
    );
  }
}

export default RegisterIndex;
