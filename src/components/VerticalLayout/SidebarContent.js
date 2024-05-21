import PropTypes from "prop-types";
import React, { useEffect, useCallback, useRef, useState } from "react";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import withRouter from "components/Common/withRouter";
import { Link, useLocation } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";
import usePermissions from "helpers/permissions";

const SidebarContent = props => {
  const { hasPermissions, checkUserPermissions } = usePermissions(); // Call the usePermissions hook
  const [user, setUser] = useState()
  const location = useLocation();
  const ref = useRef();
  const path = location.pathname;


  useEffect(() => {
    new MetisMenu("#side-menu");
    checkUserPermissions();
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"));
      setUser(obj.user)
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    ref.current.recalculate();
  }, []);

  useEffect(() => {
    const pathName = location.pathname;
    const fullPath = pathName;
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    removeActivation(items)
    for (let i = 0; i < items.length; ++i) {
      if (fullPath === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [path]);

  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag
        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.length && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show");
        }

        parent.classList.remove("mm-active");
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.childNodes[0].classList.remove("mm-active");

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove("mm-show"); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("mm-show"); // li
                parent5.childNodes[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  return (
    <React.Fragment>

      <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
        <div id="sidebar-menu">
          {user && user.customer ?
            <ul className="metismenu list-unstyled" id="side-menu">
              <li>
              <Link to="/profile" className="waves-effect">
                  <i className="ti-user"></i>
                  <span>{props.t("Profile")}</span>
                </Link>
                <Link to="/account/orders" className="waves-effect">
                  <i className="ti-shopping-cart"></i>
                  <span>{props.t("Orders")}</span>
                </Link>
                  <Link to="/account/addresses" className="waves-effect">
                    <i className="ti-location-pin"></i>
                    <span>{props.t("Addresses")}</span>
                  </Link>

              </li>
               
            </ul>

            :
            <ul className="metismenu list-unstyled" id="side-menu">

              <li className="menu-title">{props.t("Main")} </li>
              <li>
                <Link to="/dashboard" className="waves-effect">
                  <i className="ti-home"></i>
                  <span className="badge rounded-pill bg-primary float-end">1</span>
                  <span>{props.t("Dashboard")}</span>
                </Link>
              </li>

              <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="ti-user"></i>
                  <span>{props.t("User Management")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  {hasPermissions.browseUsers && (

                    <li>
                      <Link to="/users">{props.t("Users")}</Link>
                    </li>
                  )}
                  {hasPermissions.browseRoles && (

                    <li>
                      <Link to="/roles">{props.t("Roles")} </Link>
                    </li>
                  )}

                  {hasPermissions.browseCustomers && (

                    <li>
                      <Link to="/costumers">{props.t("Costumers")} </Link>
                    </li>
                  )}

                </ul>
              </li>

              <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="ti-folder"></i>
                  <span>{props.t("Manage Categories")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  {hasPermissions.browseCategory && (

                    <li>
                      <Link to="/categories">{props.t("Category")} </Link>
                    </li>
                  )}
                  {hasPermissions.browseSubCategory && (

                    <li>
                      <Link to="/sub-categories">{props.t("Sub-Category")} </Link>
                    </li>
                  )}
                  <li>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="ti-shopping-cart"></i>
                  <span>{props.t("Product Management")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  {hasPermissions.browseProduct && (

                    <li>
                      <Link to="/products">{props.t("Product")} </Link>
                    </li>
                  )}
                  {hasPermissions.browseProperty && (

                    <li>
                      <Link to="/properties">{props.t("Attributs")} </Link>
                    </li>
                  )}
                  <li>
                    <Link to="/propriets-categories">{props.t("Attributs category")} </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="ti-receipt"></i>
                  <span>{props.t("Orders Management")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  {hasPermissions.browseProduct && (

                    <li>
                      <Link to="/orders" >{props.t("Orders")}</Link>
                    </li>
                  )}


                </ul>
                <li>
                <Link to="/settings" className=" waves-effect">
                  <i className="ti-settings"></i>
                  <span>{props.t("Settings")}</span>
                </Link>
                  </li>
              </li>



            </ul>

          }




        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));