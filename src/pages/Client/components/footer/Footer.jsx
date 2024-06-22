import React from "react"
import "./footer.css"
import Icon1for from "../../images/all-in/icon-1.png"
import Icon2for from "../../images/all-in/icon-2.png"
import Icon3for from "../../images/all-in/icon-3.png"
import Icon4for from "../../images/all-in/icon-4.png"
import Icon5for from "../../images/all-in/icon-5.png"
import Logo from "../../images/logo-png.png"
import { Link } from "react-router-dom"
import {
  LocationOnOutlined,
  CallOutlined,
  EmailOutlined,
  AccessTimeOutlined,
  Facebook,
  Twitter,
  Instagram,
  YouTube,
} from "@mui/icons-material";

import PlayStoreImg from "../../images/google-play.jpg"; // Replace with your app store images
import AppStoreImg from "../../images/app-store.jpg"; // Replace with your app store images
import PaymentImg from "../../images/payment-method.png"; // Replace with your payment method image


const Footer = () => {
  return (
    <>
      <div className="footerWrapper">
        <div className="footerbox">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="box d-flex align-items-center w-100">
                  <img src={Icon1for} />

                  <div className="info">
                    <h4>Best price & Offers</h4>
                    <p>Order $50 or more</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="box d-flex align-items-center w-100">
                  <img src={Icon2for} />

                  <div className="info">
                    <h4>Free delivery</h4>
                    <p>Order $50 or more</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="box d-flex align-items-center w-100">
                  <img src={Icon3for} />

                  <div className="info">
                    <h4>Great daily deal</h4>
                    <p>Order $50 or more</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="box d-flex align-items-center w-100">
                  <img src={Icon4for} />

                  <div className="info">
                    <h4>Wide assortment</h4>
                    <p>Order $50 or more</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="box d-flex align-items-center w-100">
                  <img src={Icon5for} />

                  <div className="info">
                    <h4>Easy returns</h4>
                    <p>Order $50 or more</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3 part1">
                <Link to="/">
                  <img
                    src={Logo}
                    style={{ height: "80px", width: "auto" }}
                    alt="Logo"
                  />
                </Link>
                <br />
                <br />
                <p>Your trusted printing service provider</p>
                <p>
                  <LocationOnOutlined /> <strong>Address:</strong> 123 Print St,
                  tetouan, State, Maroc, 12345
                </p>
                <p>
                  <CallOutlined /> <strong>Call Us:</strong> (+212) 456-7890
                </p>
                <p>
                  <EmailOutlined /> <strong>Email:</strong>{" "}
                  info@printhub.com
                </p>
              </div>

              <div className="col-md-6 part2">
                <div className="row">
                  <div className="col">
                    <h3>Company</h3>
                    <ul className="footer-list mb-sm-5 mb-md-0">
                      <li>
                        <Link to="/about">About Us</Link>{" "}
                      </li>
                      <li>
                        <Link to="/services">Our Services</Link>{" "}
                      </li>
                      <li>
                        <Link to="/privacy">Privacy Policy</Link>{" "}
                      </li>
                      <li>
                        <Link to="/terms">Terms & Conditions</Link>{" "}
                      </li>
                      <li>
                        <Link to="/contact">Contact Us</Link>{" "}
                      </li>
                      <li>
                        <Link to="/support">Support Center</Link>{" "}
                      </li>
                      <li>
                        <Link to="/careers">Careers</Link>{" "}
                      </li>
                    </ul>
                  </div>
                  <div className="col">
                    <h3>Account</h3>
                    <ul className="footer-list mb-sm-5 mb-md-0">
                      <li>
                        <Link to="/signin">Sign In</Link>{" "}
                      </li>
                      <li>
                        <Link to="/cart">View Cart</Link>{" "}
                      </li>
                      <li>
                        <Link to="/wishlist">My Wishlist</Link>{" "}
                      </li>
                      <li>
                        <Link to="/track-order">Track My Order</Link>{" "}
                      </li>
                      <li>
                        <Link to="/help">Help Ticket</Link>{" "}
                      </li>
                      <li>
                        <Link to="/shipping">Shipping Details</Link>{" "}
                      </li>
                      <li>
                        <Link to="/compare">Compare Products</Link>{" "}
                      </li>
                    </ul>
                  </div>
                  <div className="col">
                    <h3>Resources</h3>
                    <ul className="footer-list mb-sm-5 mb-md-0">
                      <li>
                        <Link to="/vendors">Become a Vendor</Link>{" "}
                      </li>
                      <li>
                        <Link to="/affiliate">Affiliate Program</Link>{" "}
                      </li>
                      <li>
                        <Link to="/suppliers">Our Suppliers</Link>{" "}
                      </li>
                      <li>
                        <Link to="/faq">FAQs</Link>{" "}
                      </li>
                      <li>
                        <Link to="/promotions">Promotions</Link>{" "}
                      </li>
                      <li>
                        <Link to="/blog">Blog</Link>{" "}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-md-3 part3">
                <h3>Install App</h3>
                <p>Download our mobile app</p>
                <div className="d-flex">
                  <Link to="/">
                    <img
                      src={PlayStoreImg}
                      width={150}
                      alt="Google Play Store"
                    />
                  </Link>
                  <Link to="/">
                    <img
                      src={AppStoreImg}
                      className="mx-2"
                      width={150}
                      alt="Apple App Store"
                    />
                  </Link>
                </div>
                <br />
                <br />
                <p className="d-block">Secure Payment Methods</p>
                <Link to="/">
                  <img
                    src={PaymentImg}
                    className="mx-2"
                    width={150}
                    alt="Payment Methods"
                  />
                </Link>
              </div>
            </div>

            <div className="row lastStrip">
              <div className="col-md-12 text-center">
                <div className="social-icons">
                  <Link to="/">
                    <Facebook />
                  </Link>
                  <Link to="/">
                    <Twitter />
                  </Link>
                  <Link to="/">
                    <Instagram />
                  </Link>
                  <Link to="/">
                    <YouTube />
                  </Link>
                </div>
                <p>
                  ©2024 Your Printing Service. All rights reserved. Developed by
                  Your Team.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Footer
