import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Header from "pages/Client/components/header/Header"
import Footer from "pages/Client/components/footer/Footer"
import axios from "axios"
import { Link } from "react-router-dom"

// Importing images
import img1 from "../../images/popular/product-8-1.jpg"
import img2 from "../../images/popular/product-4-1.jpg"
import img3 from "../../images/popular/product-2-1.jpg"
import img4 from "../../images/popular/product-9-1.jpg"
import img5 from "../../images/popular/product-7-1.jpg"

const SubcategoryCard = ({ categories, subcategories }) => {
  const { categoryId } = useParams()
  const [filteredSubcategories, setFilteredSubcategories] = useState([])

  useEffect(() => {
    // Filter subcategories based on the selected category name
    const selectedCategory = categories.find(
      category => category.nom.toLowerCase() === categoryId.toLowerCase()
    )
    if (selectedCategory) {
      const filtered = subcategories.filter(
        subcategory => subcategory.categorie_id === selectedCategory.id
      )
      setFilteredSubcategories(filtered)
    }
  }, [categories, subcategories, categoryId])

  // Rendering subcategory cards
  const renderSubcategoryCards = () => {
    return filteredSubcategories.map((subcategory, index) => (
      <div className="col-md-3 mb-4 d-flex justify-content-center" key={index}>
        <div className="card">
          <Link to={`/cat/${categoryId}/${subcategory.nom.toLowerCase()}`}>
            <img
              src={getSubcategoryImage(index)}
              alt={subcategory.nom}
              className="card-img-top rounded"
              style={{ borderRadius: "15px", fontSize: "larger" }}
            />
          </Link>
          <div className="card-body">
            <Link to={`/cat/${categoryId}/${subcategory.nom.toLowerCase()}`}>
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
            <Link to={`/cat/${categoryId}/${subcategory.nom.toLowerCase()}`}>
              <button
                className="btn btn-primary btn-block"
                style={{ width: "100%", fontFamily: "Montserrat, sans-serif" }}
              >
                Commander
              </button>
            </Link>
          </div>
        </div>
      </div>
    ))
  }

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

  return (
    <>
      <Header categories={categories} subcategories={subcategories} />

      <div className="container mt-5">
        <h2
          className="text-center mb-4 text-primary"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {categoryId}
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
