import React, { useEffect, useState, useRef } from "react"
import PropTypes from "prop-types"
import { Link, useParams } from "react-router-dom" // Import useParams
import "./Details.css"
import Rating from "@mui/material/Rating"
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css"
import InnerImageZoom from "react-inner-image-zoom"
import Slider from "react-slick"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { Button, Row, Col, Collapse } from "react-bootstrap"
import Header from "pages/Client/components/header/Header"
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap"
import img1 from "../../images/popular/product-8-1.jpg"

import { get, post } from "helpers/api_helper"
import useSweetAlert from "helpers/notifications"
import { PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument from "./devis"

const Details = ({ categories, subcategories, cartitems, fetchCartItems }) => {
  const { subcategoryId } = useParams()
  const [productDetails, setProductDetails] = useState(null)
  const [urlImg, setUrlImg] = useState(img1)
  const [propertyCategories, setPropertyCategories] = useState([])
  const [openSubcategory, setOpenSubcategory] = useState(null)
  const [activeProperties, setActiveProperties] = useState({})
  const [totalPrice, setTotalPrice] = useState(0)
  const [modal_panier, setModalPanier] = useState(false)
  const { showSuccessAlert, showErrorAlert } = useSweetAlert()
  const [selectedProperty, setSelectedProperty] = useState({})
  const tog_panier = () => {
    setModalPanier(!modal_panier)
  }

  const removeBodyCss = () => {
    document.body.classList.add("no_padding")
  }

  

  const sliderRef = useRef()

  const [user, setUser] = useState(null)
  const [customerId, setCustomerId] = useState(null)

  useEffect(() => {
    const authUser = localStorage.getItem("authUser")
    if (authUser) {
      const userObj = JSON.parse(authUser)
      setUser(userObj.user)
      if (userObj.user.customer) {
        setCustomerId(userObj.user.customer.id) 
      }
    }
  }, [])
  const addToCart = async () => {
    if (!customerId) {
      showErrorAlert("Add New Item to Cart", "Customer ID not found")
      return
    }

    const data = {
      customer_id: customerId,
      cart_items: [
        {
          product_id: productDetails.id,
          quantity: productDetails.quantity,
          price: productDetails.price_unit,
          total: productDetails.price_unit * productDetails.quantity,
          details:selectedProperty
        },
      ],
    }

    try {
      const response = await post("http://127.0.0.1:8000/api/carts", data)
      setModalPanier(false)
      showSuccessAlert("Add new Item to cart ", response.data.message)
      fetchCartItems()
    } catch (error) {
      setModalPanier(false)
      showErrorAlert("Add New Item to Cart", error.response.data.message)
    }
    console.log(data)
  }
 
  

  

  useEffect(() => {
    if (subcategoryId) {
      // Fetch all products from API
      fetch(`http://127.0.0.1:8000/api/products`)
        .then(response => response.json())
        .then(data => {
          const filteredProducts = data.data.filter(
            product => product.subCategory.id === parseInt(subcategoryId)
          );
          if (filteredProducts.length > 0) {
            // Assuming you want the first product in the list
            setProductDetails(filteredProducts[0]);
          } else {
            // No product found for the selected subcategory
            setProductDetails(null);
          }
        })
        .catch(error =>
          console.error("Error fetching products:", error)
        )
    } else {
      // No subcategory ID provided
      setProductDetails(null)
    }
  }, [subcategoryId]);
  

  useEffect(() => {
    if (productDetails) {
      // Fetch property categories from API
      fetch("http://127.0.0.1:8000/api/ProprieteCategorie")
        .then(response => response.json())
        .then(data => {
          // Filter property categories to include only those with properties that match the product's properties
          const filteredCategories = data.data.filter(category =>
            category.propriete.some(prop =>
              productDetails.propriete.find(p => p.id === prop.id)
            )
          )
          setPropertyCategories(filteredCategories)
        })
        .catch(error =>
          console.error("Error fetching property categories:", error)
        )
    }
  }, [productDetails])

  useEffect(() => {
    // Recalculate total price whenever activeProperties changes
    const selectedProperties = propertyCategories
      .map(category =>
        category.propriete.find(
          prop => prop.id === activeProperties[category.id]
        )
      )
      .filter(prop => prop !== undefined)

    const newTotalPrice = selectedProperties.reduce(
      (sum, prop) => sum + parseFloat(prop.price),
      parseFloat(productDetails?.price_unit || 0)
    )
    setTotalPrice(newTotalPrice)
  }, [activeProperties, propertyCategories, productDetails])


  const settings = {
    dots: false,
    infinite: false,
    speed: 200,
    slidesToShow: 5,
    slidesToScroll: 1,
    fade: false,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 1000,
  }

  if (!productDetails) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <Spinner animation="border" role="status" className="text-primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-2 text-primary">Loading...</p>
        </div>
      </div>
    );
  }
  
  const { name, description, price_unit, propriete } = productDetails

  const handleClickSlideImage = (index, imgUrl) => {
    sliderRef.current.slickGoTo(index)
    setUrlImg(imgUrl)
  }

  const toggleSubcategory = index => {
    setOpenSubcategory(openSubcategory === index ? null : index)
  }

  const handlePropertyClick = (property, categoryId, categoryName) => {
    setActiveProperties(prevState => ({
      ...prevState,
      [categoryId]: property.id,
    }))

    // Update selectedPropertiesForPDF
    setSelectedProperty(prevState => ({
      ...prevState,
      [categoryId]: {
        category: categoryName,
        property: property,
      },
    }))
  }
  console.log(selectedProperty);
  const isAuthenticated = localStorage.getItem("authUser") !== null
  return (
    <>
      <Header
        categories={categories}
        subcategories={subcategories}
        cartitems={cartitems}
        fetchCartItems={fetchCartItems}
      />
      <section className="detailPage">
        <div className="container detailsContainer pt-3 pb-3">
          <div className="row">
            {/* product Zoom */}
            <div className="left-col col-md-6 nw-general-panel-container">
              <div className="productZoom">
                <InnerImageZoom
                  zoomType="hover"
                  zoomScale={2}
                  src={productDetails.images ? `http://127.0.0.1:8000/storage/${JSON.parse(productDetails.images)[0]}` : ''}
                  className="w-100"
                />
              </div>
              <Slider {...settings} className="zoomSlider" ref={sliderRef}>
                {[
                  { src:productDetails.images ? `http://127.0.0.1:8000/storage/${JSON.parse(productDetails.images)[0]}`:"", index: 0 },
                  { src: productDetails.images ? `http://127.0.0.1:8000/storage/${JSON.parse(productDetails.images)[1]}`:"", index: 1 },
                  { src: productDetails.images ?`http://127.0.0.1:8000/storage/${JSON.parse(productDetails.images)[2]}`:"", index: 2 },
                  { src: productDetails.images ?`http://127.0.0.1:8000/storage/${JSON.parse(productDetails.images)[3]}`:"", index: 3 },
                  { src: productDetails.images ?`http://127.0.0.1:8000/storage/${JSON.parse(productDetails.images)[4]}`:"", index: 4 },
                  { src: productDetails.images ?`http://127.0.0.1:8000/storage/${JSON.parse(productDetails.images)[5]}`:"", index: 5 },
                ].map(item => (
                  <div className="item" key={item.index}>
                    <img
                      src={item.src}
                      className="w-100"
                      onClick={() =>
                        handleClickSlideImage(item.index, item.src)
                      }
                    />
                  </div>
                ))}
              </Slider>{" "}
              <table className="table property-table mt-3">
                <tbody>
                  {propertyCategories.map((category, index) => (
                    <tr key={category.id}>
                      <td>{category.name}</td>
                      <td>
                        {activeProperties[category.id] && (
                          <span>
                            {
                              category.propriete.find(
                                prop =>
                                  prop.id === activeProperties[category.id]
                              ).name
                            }
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>Price Unit</td>
                    <td>${price_unit}</td>
                  </tr>
                  <tr>
                    <td>Price Total</td>
                    <td>${totalPrice.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
              {isAuthenticated && 
                <PDFDownloadLink document={<MyDocument user={user} total={totalPrice} product={productDetails} properties={selectedProperty}/>} fileName="devis.pdf" >
                <Button
                className="btn btn-primary "
                style={{ width: "100%" }}
              >
                telechrger un devis
            </Button>

    </PDFDownloadLink>
  }

              
            </div>

            {/* product Info */}
            <div className="right-col col-md-6 nw-attrs-panel-container">
              <h2>{name}</h2>
              <div className="d-flex align-items-center mb-4">
                <Rating
                  name="half-rating-read"
                  defaultValue={3.5}
                  precision={0.5}
                  readOnly
                />
                <span className="text-light"> (30 Reviews)</span>
              </div>
              <p>{description}</p>
              <Row>
                <Col md={12}>
                  <div className="propriete-container">
                    {propertyCategories.map((subcategory, index) => (
                      <div key={subcategory.id}>
                        <h6
                          onClick={() => toggleSubcategory(index)}
                          className="category-name"
                        >
                          {subcategory.name}
                          {openSubcategory === index ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </h6>
                        <Collapse in={openSubcategory === index}>
                          <div className="property-options">
                            {subcategory.propriete.map(property => (
                              <Button
                                key={property.id}
                                onClick={() =>
                                  handlePropertyClick(property, subcategory.id,subcategory.name)
                                }
                                variant={
                                  activeProperties[subcategory.id] === property.id
                                    ? "primary"
                                    : "outline-primary"
                                }
                                className="m-1"
                              >
                                {property.name}
                              </Button>
                            ))}
                          </div>
                        </Collapse>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>

              <hr />
              <div className="price-section">
                <div className="price-unit">Prix unitaire ${price_unit}</div>
                <div className="price-total">
                  Total ( Economisez 34.95 Dhs ) ${totalPrice.toFixed(2)}
                </div>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <Button className="themeBtn" onClick={tog_panier}>
                  ajouter au panier
                </Button>
                <Modal
                  isOpen={modal_panier}
                  toggle={tog_panier}
                  centered
                  size="lg"
                >
                  <ModalHeader className="mt-0" toggle={tog_panier}>
                    Ajouter au panier
                  </ModalHeader>
                  <ModalBody>
                    <div className="row">
                      {isAuthenticated ? (
                        <>
                          <div className="col-md-6 p-3 border rounded mb-3">
                            <div className="d-flex align-items-center mb-3">
                              <i className="bi bi-upload me-2"></i>
                              <span>Importer mon fichier</span>
                            </div>
                            <p className="mb-0">
                              Votre fichier d'impression est déjà prêt et
                              respecte les conditions pour une impression
                              optimale.
                            </p>
                            <Button className="btn btn-primary w-100 mt-3">
                              Importer mon fichier
                            </Button>
                          </div>
                          <div className="col-md-6 p-3 border rounded mb-3">
                            <div className="d-flex align-items-center mb-3">
                              <i className="bi bi-cart me-2"></i>
                              <span>Ajouter au panier</span>
                            </div>
                            <p className="mb-0">
                              Complétez votre commande et importez ou créez
                              votre fichier au moment de la finalisation.
                            </p>
                            <Button
                              className="btn btn-secondary w-100 mt-3"
                              onClick={addToCart}
                            >
                              Ajouter au panier
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="col-md-12 p-3 border rounded mb-3 d-flex align-items-center flex-column">
                            <p className="mb-0">
                              Vous devez être connecté pour ajouter des articles
                              au panier.
                            </p>
                            <Button
                              className="btn btn-primary w-50 mt-3"
                              href="/login"
                            >
                              Se connecter
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </ModalBody>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

Details.propTypes = {
  categories: PropTypes.array.isRequired,
  subcategories: PropTypes.array.isRequired,
}

export default Details
