import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import Logo from "../../images/logo.svg"
import searchIcon from "../../images/search.png"
import "./header.css"
import axios from "axios"
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
import { del, get, post } from "helpers/api_helper"
import useSweetAlert from "helpers/notifications"

const Header = props => {
  const [isRight, setIsRight] = useState(false)
  const [products, setProducts] = useState([])
  const HeaderRef = useRef()
  const [openDropDown, setOpenDropDown] = useState(false)
  const [isopenSearch, setOpenSearch] = useState(false)
  const InputSearchRef = useRef()
  const { showSuccessAlert, showErrorAlert } = useSweetAlert()
  const countryList = []
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [total_amount, setTotalAmount] = useState()
  const toggleRightCanvas = () => {
    setIsRight(!isRight)
  }
  const [windowWidth, setwindowWidth] = useState(window.innerWidth)
  const authUser = JSON.parse(localStorage.getItem("authUser"))
  const navigate = useNavigate()

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

  const doOpenSearch = () => {
    setOpenSearch(true)
    InputSearchRef.current.focus()
  }
  const handleOrder = async () => {
    const customerId = props.cartitems[0]?.customer_id
    const cartId = props.cartitems[0]?.id
    let total_amount = 12

    if (!customerId || !cartId) {
      showErrorAlert("Order Creation Error", "Missing customer or cart ID")
      return
    }

    const orderData = {
      customer_id: customerId,
      cart_id: cartId,
      status: "accepted",
      progress: "Processing",
      total_amount: total_amount, // Placeholder, will update later
      products: [],
      phone_number: authUser.user.phone_number || "",
      email: authUser.user.email || "",
      address:
        authUser.user.address && authUser.user.address[0]
          ? authUser.user.address[0].line
          : "",
      city:
        authUser.user.address && authUser.user.address[0]
          ? authUser.user.address[0].city
          : "",
      zip_code:
        authUser.user.address && authUser.user.address[0]
          ? authUser.user.address[0].zip
          : "",
    }

    if (props.cartitems && Array.isArray(props.cartitems)) {
      orderData.products = props.cartitems.flatMap(cartItem =>
        cartItem.cart_items.map(item => {
          const itemTotal = item.price * item.quantity // Calculate item total
          total_amount += itemTotal
          console.log(
            `Item Total: ${itemTotal}, Cumulative Total Amount: ${total_amount}`
          ) // Debug log
          return {
            product_id: item.product_id,
            price: item.price,
            quantity: item.quantity,
            total: itemTotal,
            details: JSON.parse(item.details),
          }
        })
      )
    }

    // Update total_amount in orderData
    orderData.total_amount = total_amount

    try {
      const response = await post("http://127.0.0.1:8000/api/orders", orderData)
      setIsRight(false)
      props.fetchCartItems()
      // Navigate to the shipping page with the order ID
      navigate(`/checkout/shipping/${response.id}`)
    } catch (error) {
      showErrorAlert("Order Creation Error", error.response.message)
    }
  }

  const handleDelete = async cardItemId => {
    try {
      const response = await del(
        `http://127.0.0.1:8000/api/cart-items/${cardItemId}`
      )
      showSuccessAlert("Delete Item Cart ")
      setIsRight(false)
      props.fetchCartItems()
    } catch (error) {
      showErrorAlert("Delete Item Cart")
    }
  }
  const isAuthenticated = localStorage.getItem("authUser") !== null

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

  useEffect(() => {
    if (searchTerm) {
      const results = [
        ...props.categories.filter(category =>
          category.nom.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        ...props.subcategories.filter(subcategory =>
          subcategory.nom.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      ]
      setSearchResults(results.slice(0, 5))
    } else {
      setSearchResults([])
    }
  }, [searchTerm, props.categories, props.subcategories])

  const handleSearchChange = e => {
    setSearchTerm(e.target.value)
  }
  console.log(props.cartitems)
  return (
    <>
      <div className="headerWrapper" ref={HeaderRef}>
        <header>
          <div className="container-fluid" style={{ padding: "15px 0" }}>
            <div className="row">
              <div className="col d-flex align-items-center justify-content-start">
                <Link to="/">
                  {/* <img src={Logo} style={{ height: "60px", width: "190px" }} /> */}
                  printHub
                </Link>
              </div>

              <div className="col d-flex align-items-center justify-content-center">
                <div
                  className={`headerSearch d-flex align-items-center ${
                    isopenSearch === true ? "open" : ""
                  }`}
                >
                  <img
                    src={searchIcon}
                    className="searchIcon cursor"
                    onClick={() => setOpenSearch(true)}
                  />
                  <div className="search">
                    <input
                      type="text"
                      placeholder="Search Your Items..."
                      ref={InputSearchRef}
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </div>
                </div>
                {searchResults.length > 0 && (
                  <div className="searchResults">
                    {searchResults.map(result => (
                      <div
                        className={`searchResult ${
                          result.categorie_id ? "subcategory" : "category"
                        }`}
                        key={result.id}
                      >
                        <Link
                          to={`/cat/${
                            result.categorie_id
                              ? `${result.categorie_id}/${result.id}`
                              : result.nom.toLowerCase()
                          }`}
                        >
                          {result.nom}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
                          
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
                          {props.cartitems &&
                          props.cartitems.length > 0 &&
                          props.cartitems[0].cart_items.length > 0 ? (
                            props.cartitems[0].cart_items.map(cart =>
                              products.map(
                                product =>
                                  product.id === cart.product_id && (
                                    <Card
                                      key={cart.id}
                                      className="mb-3"
                                      style={{
                                        border: "1px solid #e0e0e0",
                                        borderRadius: "10px",
                                        boxShadow:
                                          "0 2px 4px rgba(0, 0, 0, 0.1)",
                                      }}
                                    >
                                      <CardBody
                                        className="d-flex align-items-center"
                                        style={{ padding: "10px" }}
                                      >
                                        <div
                                          className="image-container"
                                          style={{
                                            flexShrink: 0,
                                            marginRight: "15px",
                                          }}
                                        >
                                          <CardImg
                                            top
                                            className="img-fluid"
                                            src={
                                              product.images
                                                ? `http://127.0.0.1:8000/storage/${
                                                    JSON.parse(
                                                      product.images
                                                    )[0]
                                                  }`
                                                : ""
                                            }
                                            alt="Product Image"
                                            style={{
                                              width: "100px",
                                              height: "100px",
                                              objectFit: "cover",
                                              borderRadius: "10px",
                                            }}
                                          />
                                        </div>
                                        <div
                                          className="info-container"
                                          style={{ flexGrow: 1 }}
                                        >
                                          <h5
                                            className="mb-2"
                                            style={{ fontSize: "1rem" }}
                                          >
                                            {product.name}
                                          </h5>
                                          <p
                                            className="mb-1"
                                            style={{ fontSize: "0.9rem" }}
                                          >
                                            <strong>Slug:</strong>{" "}
                                            {product.slug}
                                          </p>
                                          <p
                                            className="mb-1"
                                            style={{ fontSize: "0.9rem" }}
                                          >
                                            <strong>Price Unit:</strong>{" "}
                                            {cart.price}
                                          </p>
                                          <p
                                            className="mb-1"
                                            style={{ fontSize: "0.9rem" }}
                                          >
                                            <strong>Quantity ordered:</strong>{" "}
                                            {cart.quantity}
                                          </p>
                                        </div>
                                        <Button
                                          className="ml-auto btn-close"
                                          onClick={() => handleDelete(cart.id)}
                                        >
                                          <i className="ti-close" />
                                        </Button>
                                      </CardBody>
                                    </Card>
                                  )
                              )
                            )
                          ) : (
                            <p>Your cart is empty</p>
                          )}
                        </OffcanvasBody>
                        <Link
                          className="btn btn-primary waves-effect waves-light m-4"
                          onClick={handleOrder}
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
