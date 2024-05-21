import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Header from "pages/Client/components/header/Header"
import Footer from "pages/Client/components/footer/Footer"
import axios from "axios"
import "./SubcategoryCard.css"

// Importing images
import img1 from "../../images/popular/product-8-1.jpg"
import img2 from "../../images/popular/product-4-1.jpg"
import img3 from "../../images/popular/product-2-1.jpg"
import img4 from "../../images/popular/product-9-1.jpg"
import img5 from "../../images/popular/product-7-1.jpg"

const SubcategoryCard = ({ categories, subcategories }) => {
  const { categoryId } = useParams()
  const [filteredSubcategories, setFilteredSubcategories] = useState([])
  const [categoryName, setCategoryName] = useState("")

  useEffect(() => {
    if (categoryId === "tous-les-produits") {
      setFilteredSubcategories(
        subcategories.filter(subcategory => subcategory.nom !== "")
      )
      setCategoryName("Tous les produits")
    } else {
      const selectedCategory = categories.find(
        category => category.nom.toLowerCase() === categoryId.toLowerCase()
      )
      if (selectedCategory) {
        const filtered = subcategories.filter(
          subcategory =>
            subcategory.categorie_id === selectedCategory.id &&
            subcategory.nom !== ""
        )
        setFilteredSubcategories(filtered)
        setCategoryName(selectedCategory.nom)
      }
    }
  }, [categories, subcategories, categoryId])

  // Function to get subcategory image based on index
  const getSubcategoryImage = index => {
    switch (index % 5) {
      case 0:
        return img1
      case 1:
        return img2
      case 2:
        return img3
      case 3:
        return img4
      case 4:
        return img5
      default:
        return img1
    }
  }

  // Rendering subcategory cards
  const renderSubcategoryCards = () => {
    return filteredSubcategories.map((subcategory, index) => (
      <div className="col-md-3 mb-4 d-flex justify-content-center" key={index}>
        <div className="card rounded subcategory-card">
          <Link to={`/cat/${categoryId}/${subcategory.id}`}>
            <img
              src={getSubcategoryImage(index)}
              alt={subcategory.nom}
              className="card-img-top rounded"
            />
          </Link>
          <div className="card-body">
            <Link to={`/cat/${categoryId}/${subcategory.id}`}>
              <h5
                className="card-title text-center text-primary"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  color: "#525b6a",
                }}
              >
                {subcategory.nom}
              </h5>
            </Link>
            <Link to={`/cat/${categoryId}/${subcategory.id}`}>
              <button
                className="btn btn-primary btn-block commander-btn"
                style={{ width: "100%", fontFamily: "Montserrat, sans-serif" }}
              >
                <i className="dripicons-cart"></i> Commander
              </button>
            </Link>
          </div>
        </div>
      </div>
    ))
  }

  return (
    <>
      <Header categories={categories} subcategories={subcategories} />

      <div className="container mt-5">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/cat/tous-les-produits">Tous les produits</Link>
            </li>
            {categoryId !== "tous-les-produits" && (
              <>
                <li className="breadcrumb-item active" aria-current="page">
                  {categoryName}
                </li>
              </>
            )}
          </ol>
        </nav>

        <h2
          className="text-center mb-4"
          style={{
            fontFamily: "Montserrat, sans-serif",
            color: "#525b6a",
            fontSize: "30px",
          }}
        >
          {categoryName}
        </h2>
        <div className="row row-cols-1 row-cols-md-4">
          {renderSubcategoryCards()}
        </div>
      </div>

      <Footer />
    </>
  )
}

export default SubcategoryCard
