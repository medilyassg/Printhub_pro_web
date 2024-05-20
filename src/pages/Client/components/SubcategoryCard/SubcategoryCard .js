import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "pages/Client/components/header/Header";
import Footer from "pages/Client/components/footer/Footer";

// Importing images
import img1 from "../../images/popular/product-8-1.jpg";
import img2 from "../../images/popular/product-4-1.jpg";
import img3 from "../../images/popular/product-2-1.jpg";
import img4 from "../../images/popular/product-9-1.jpg";
import img5 from "../../images/popular/product-7-1.jpg";
import "./SubcategoryCard.css"; // Import your CSS file for styling

const SubcategoryCard = ({ categories, subcategories }) => {
  const { categoryId } = useParams();
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);

  useEffect(() => {
    if (categoryId === "tous-les-produits") {
      setFilteredSubcategories(subcategories);
    } else {
      const selectedCategory = categories.find(
        (category) => category.nom.toLowerCase() === categoryId.toLowerCase()
      );
      if (selectedCategory) {
        const filtered = subcategories.filter(
          (subcategory) => subcategory.categorie_id === selectedCategory.id
        );
        setFilteredSubcategories(filtered);
      }
    }
  }, [categories, subcategories, categoryId]);

  // Function to get subcategory image based on index
  const getSubcategoryImage = (index) => {
    const images = [img1, img2, img3, img4, img5];
    return images[index % images.length];
  };

  // Function to render subcategory card
  const renderSubcategoryCard = (subcategory) => (
    <div className="col-md-3 mb-4" key={subcategory.id}>
      <div className="card rounded subcategory-card">
        <Link to={`/cat/${categoryId}/${subcategory.id}`}>
          <img
            src={getSubcategoryImage(subcategory.id)}
            alt={subcategory.nom}
            className="card-img-top rounded"
          />
        </Link>
        <div className="card-body">
          <Link
            to={`/cat/${categoryId}/${subcategory.id}`}
            className="card-title text-primary text-decoration-none"
          >
            <h5 className="text-center">{subcategory.nom}</h5>
          </Link>
          <Link
            to={`/cat/${categoryId}/${subcategory.id}`}
            className="btn btn-primary btn-block commander-btn"
            style={{ width: "100%" }}
          >
            <i className="dripicons-cart"></i>{" "}
            Commander
          </Link>
        </div>
      </div>
    </div>
  );

  // Function to render category with subcategories
  const renderCategoryWithSubcategories = (category) => {
    const categorySubcategories = filteredSubcategories.filter(
      (subcategory) => subcategory.categorie_id === category.id
    );
    if (categorySubcategories.length > 0) {
      return (
        <div key={category.id} className="mb-4">
          <h2 className="text-primary text-center">{category.nom}</h2>
          <div className="row row-cols-1 row-cols-md-4">
            {categorySubcategories.map(renderSubcategoryCard)}
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  // Rendering subcategories based on category or "Tous les produits"
  const renderSubcategories = () => {
    if (categoryId === "tous-les-produits") {
      return categories.map((category) =>
        renderCategoryWithSubcategories(category)
      );
    } else {
      return (
        <div className="row row-cols-1 row-cols-md-4">
          {filteredSubcategories.length > 0 &&
            filteredSubcategories.map(renderSubcategoryCard)}
        </div>
      );
    }
  };

  return (
    <>
      <Header categories={categories} subcategories={subcategories} />

      <div className="container mt-5 mb-5">
        <h2 className="text-center mb-4 text-primary">
          {categoryId === "tous-les-produits" ? "Tous les produits" : categoryId}
        </h2>
        {renderSubcategories()}
      </div>

      <Footer />
    </>
  );
};

export default SubcategoryCard;
