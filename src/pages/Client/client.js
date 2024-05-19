// import React, { useEffect, useState, useRef } from "react"
// import PropTypes from "prop-types"
// import { Link } from "react-router-dom"
// import "./Details.css" // Create Details.css file for styles
// import Rating from "@mui/material/Rating"
// import "react-inner-image-zoom/lib/InnerImageZoom/styles.css"
// import InnerImageZoom from "react-inner-image-zoom"
// import Slider from "react-slick"
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
// import { Button } from "react-bootstrap"
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
// import CompareArrowsRoundedIcon from "@mui/icons-material/CompareArrowsRounded"

// // Components
// import Header from "pages/Client/components/header/Header"

// // Static images for slider
// import img1 from "../../images/popular/product-8-1.jpg"
// import img2 from "../../images/popular/product-4-1.jpg"
// import img3 from "../../images/popular/product-2-1.jpg"
// import img4 from "../../images/popular/product-9-1.jpg"
// import img5 from "../../images/popular/product-7-1.jpg"

// const Details = ({ data }) => {
//   const [productDetails, setProductDetails] = useState(null)
//   const [urlImg, setUrlImg] = useState(img1)
//   const [isActive, setIsActive] = useState(2)
//   const [inputRef, setInputRef] = useState(1)
//   const [propertyCategories, setPropertyCategories] = useState([])
//   const sliderRef = useRef()

//   useEffect(() => {
//     // Fetch product details from API
//     fetch("http://127.0.0.1:8000/api/products/53")
//       .then(response => response.json())
//       .then(data => setProductDetails(data.data))
//       .catch(error => console.error("Error fetching product details:", error))

//     // Fetch property categories from API
//     fetch("http://127.0.0.1:8000/api/ProprieteCategorie")
//       .then(response => response.json())
//       .then(data => setPropertyCategories(data.data))
//       .catch(error =>
//         console.error("Error fetching property categories:", error)
//       )
//   }, [])

//   const settings = {
//     dots: false,
//     infinite: false,
//     speed: 200,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//     fade: false,
//     arrows: true,
//     autoplay: true,
//     autoplaySpeed: 1000,
//   }

//   const handleClickSlideImage = (index, imgUrl) => {
//     sliderRef.current.slickGoTo(index)
//     setUrlImg(imgUrl)
//   }

//   const plusOne = () => setInputRef(prev => prev + 1)
//   const minusOne = () => setInputRef(prev => prev - 1)

//   const handlePropertyClick = property => {
//     // Handle property click logic here
//     console.log("Property clicked:", property)
//   }

//   if (!productDetails) {
//     return <div>Loading...</div>
//   }

//   const { name, description, price_unit, propriete } = productDetails

//   return (
//     <>
//       <Header data={data} />

//       <section className="detailPage">
//         <div
//           className="listingPage"
//           style={{
//             borderBottom: "1px solid rgb(0,0,0,0.1)",
//             marginBottom: "20px",
//             marginTop: "10px",
//             padding: "0px",
//           }}
//         >
//           <div className="container-fluid">
//             <ul className="list list-inline breadCrumb2 breadCrumb3">
//               <li className="list-inline-item">
//                 <Link style={{ color: "#45d56b" }}>Home</Link> /
//               </li>
//               <li className="list-inline-item">
//                 <Link style={{ color: "#45d56b" }}>Shop</Link> /
//               </li>
//               <li className="list-inline-item">
//                 <Link>Product Details</Link>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="container detailsContainer pt-3 pb-3">
//           <div className="row">
//             {/* Product Zoom */}
//             <div className="col-md-5">
//               <div className="sticky-top">
//                 <div className="productZoom">
//                   <InnerImageZoom
//                     zoomType="hover"
//                     zoomScale={2}
//                     src={urlImg}
//                     className="img-zoom"
//                   />
//                 </div>
//                 <Slider {...settings} className="zoomSlider" ref={sliderRef}>
//                   {[img1, img2, img3, img4, img5].map((src, index) => (
//                     <div className="item" key={index}>
//                       <img
//                         src={src}
//                         className="w-100"
//                         onClick={() => handleClickSlideImage(index, src)}
//                       />
//                     </div>
//                   ))}
//                 </Slider>
//               </div>
//             </div>

//             {/* Product Info */}
//             <div className="col-md-7 productInfo">
//               <h2>{name}</h2>
//               <div className="d-flex align-items-center mb-4">
//                 <Rating
//                   name="half-rating-read"
//                   defaultValue={3.5}
//                   precision={0.5}
//                   readOnly
//                 />
//                 <span className="text-light"> (30 Reviews)</span>
//               </div>
//               <div className="priceSec d-flex align-items-center mb-3">
//                 <span className="text-g priceLarge">${price_unit}</span>
//                 <div
//                   className="d-flex flex-column"
//                   style={{ marginLeft: "12px" }}
//                 >
//                   <span className="text-org">26% Off</span>
//                   <span className="text-light">
//                     ${(price_unit * 1.26).toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//               <p>{description}</p>
//               <div className="input-group mb-3" style={{ maxWidth: "240px" }}>
//                 <button
//                   className="btn btn-outline-light"
//                   type="button"
//                   onClick={minusOne}
//                 >
//                   -
//                 </button>
//                 <input
//                   type="text"
//                   className="form-control text-center"
//                   value={inputRef}
//                   style={{ backgroundColor: "#eee" }}
//                 />
//                 <button
//                   className="btn btn-outline-light"
//                   type="button"
//                   onClick={plusOne}
//                 >
//                   +
//                 </button>
//               </div>
//               <div className="propetiesSec">
//                 <h5>Properties</h5>
//                 {propertyCategories &&
//                   propertyCategories.map(category => (
//                     <div key={category.id}>
//                       <h6>{category.name}</h6>
//                       <ul>
//                         {category.propriete.map(property => (
//                           <li key={property.id}>
//                             <Button
//                               onClick={() => handlePropertyClick(property)}
//                             >
//                               {property.name}
//                             </Button>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   ))}
//               </div>
//               <div className="d-flex justify-content-between mt-3">
//                 <Button
//                   className="themeBtn"
//                   startIcon={<ShoppingCartOutlinedIcon />}
//                 >
//                   Add To Cart
//                 </Button>
//                 <Button className="themeBtn">
//                   <FavoriteBorderOutlinedIcon />
//                 </Button>
//                 <Button className="themeBtn">
//                   <CompareArrowsRoundedIcon />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   )
// }

// Details.propTypes = {
//   data: PropTypes.object.isRequired,
// }

// export default Details
