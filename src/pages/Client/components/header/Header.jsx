import React, { useEffect, useRef, useState } from "react"
import Logo from "../../images/logo.svg"
import searchIcon from "../../images/search.png"
import "./header.css"
import SelectDrop from "../selectDrop/SelectDrop"
import axios from "axios"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import IconCopare from "../../images/icon-compare.svg"
import Iconheart from "../../images/icon-heart.svg"
import IconCart from "../../images/icon-cart.svg"
import IconAccount from "../../images/icon-user.svg"
import { Button, CardImg } from "reactstrap"
import MenuIcon from "@mui/icons-material/Menu"
import {
  LoginOutlined,
  MapOutlined,
  Person2Outlined,
} from "@mui/icons-material"
import { ClickAwayListener } from "@mui/base/ClickAwayListener"
import Navbar from "./nav/Navbar"
import { Link } from "react-router-dom"
import img3 from "../../../../assets/images/small/img-3.jpg"

import {
  Card,
  CardBody,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
} from "reactstrap"
import { get } from "helpers/api_helper"

const Header = props => {
  const [open, setOpen] = useState(false)
  const [isRight, setIsRight] = useState(false)
  const [products, setProducts] = useState([])
  const HeaderRef = useRef()
  const [openDropDown, setOpenDropDown] = useState(false)
  const countryList = []
  const toggleRightCanvas = () => {
    setIsRight(!isRight)
  }
  const [windowWidth, setwindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchproducts()
  }, [])

  useEffect(() => {
    getCountry("https://countriesnow.space/api/v0.1/countries/")
  }, [])
  const getCountry = async url => {
    try {
      await axios.get(url).then(res => {
        if (res !== null) {
          res.data.data.map((item, index) => {
            countryList.push(item.country)
          })
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  const fetchproducts = async () => {
    try {
      const response = await get("http://127.0.0.1:8000/api/products")

      const data = await response.data
      setProducts(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const handleScroll = () => {
      if (HeaderRef.current) {
        const position = window.pageYOffset
        if (position > 70) {
          HeaderRef.current.classList.add("fixed")
        } else {
          HeaderRef.current.classList.remove("fixed")
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const [isopenSearch, setOpenSearch] = useState(false)
  const InputSearchRef = useRef()
  const doOpenSearch = () => {
    setOpenSearch(true)
    InputSearchRef.current.focus()
  }
  const isAuthenticated = localStorage.getItem("authUser") !== null
  console.log(isAuthenticated)
  return (
    <>
      <div className="headerWrapper" ref={HeaderRef}>
        <header>
          <div className="container-fluid">
            <div className="row">
              <div className="col d-flex align-items-center justify-content-start">
                <Link to="/">
                  <img src={Logo} style={{ height: "60px", width: "190px" }} />
                </Link>
              </div>

              <div className="col d-flex align-items-center justify-content-center">
                <div
                  className={`headerSearch d-flex align-items-center ${
                    isopenSearch === true ? "open" : ""
                  }`}
                >
                  <img src={searchIcon} className="searchIcon cursor" />
                  <div className="search">
                    <input
                      type="text"
                      placeholder="Search Your Items..."
                      ref={InputSearchRef}
                    />
                  </div>
                </div>
              </div>

              <div className="col d-flex align-items-center justify-content-end">
                <ul className="list list-inline mb-0 headerTabs">
                  {isAuthenticated ? (
                    <>
                      <li className="list-inline-items">
                        <Link className="text-dark" onClick={toggleRightCanvas}>
                          <img src={IconCart} alt="Cart Icon" />
                          Cart
                        </Link>
                      </li>
                      <Offcanvas
                        isOpen={isRight}
                        direction="end"
                        toggle={toggleRightCanvas}
                      >
                        <OffcanvasHeader toggle={toggleRightCanvas}>
                          Your Cart
                        </OffcanvasHeader>
                        <OffcanvasBody>
                          {props.cartitems?.map(item =>
                            item.cart_items?.map(cart =>
                              products.map(
                                product =>
                                  product.id === cart.product_id && (
                                    <Card key={cart.id}>
                                      <CardImg
                                        top
                                        className="img-fluid w-75"
                                        src={img3}
                                        alt="Product Image"
                                      />
                                      <CardBody>
                                        <h4>Product details</h4>
                                        <p className="card-text">
                                          <div>Name: {product.name}</div>
                                          <div>Slug: {product.slug}</div>
                                          <div>
                                            Price Unit: {product.price_unit}
                                          </div>
                                          <div>
                                            Quantity ordered: {cart.quantity}
                                          </div>
                                        </p>
                                      </CardBody>
                                    </Card>
                                  )
                              )
                            )
                          )}
                        </OffcanvasBody>
                        <Link
                          to="#"
                          className="btn btn-primary waves-effect waves-light m-4"
                        >
                          Commander
                        </Link>
                      </Offcanvas>
                      <li className="list-inline-items">
                        <span onClick={() => setOpenDropDown(!openDropDown)}>
                          <img src={IconAccount} alt="Account Icon" />
                          Account
                        </span>
                        {openDropDown && (
                          <ul className="accountDropDownMenu">
                            <li>
                              <Button className="align-items-center">
                                <Link to="/profile" className="text-dark">
                                  <Person2Outlined />
                                  Profile
                                </Link>
                              </Button>
                            </li>
                            <li>
                              <Button className="align-items-center">
                                <Link
                                  to="/account/orders"
                                  className="text-dark"
                                >
                                  <MapOutlined />
                                  Order Tracking
                                </Link>
                              </Button>
                            </li>
                          </ul>
                        )}
                      </li>
                    </>
                  ) : (
                    <li className="list-inline-items">
                      <Link to="/login">
                        <span className="text-dark fs-5">
                          <LoginOutlined />
                          Login
                        </span>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </header>{" "}
        <Navbar
          categories={props.categories}
          subcategories={props.subcategories}
        />
      </div>
      <div className="afterHeader"></div>
    </>
  )
}

export default Header
