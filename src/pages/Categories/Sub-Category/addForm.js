import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";

const AddForm = ({ isOpen, toggle }) => {
  const [categories, setCategories] = useState([])
  const [newSubCategory, setNewSubCategory] = useState({
    nom: "",
    categorie_id: 0,
  });
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categories")
      .then(response => response.json())
      .then(data => {
        setCategories(data.data)
      })
      .catch(error => {
        console.error("Error fetching categories:", error)
      });
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;
    setNewSubCategory({ ...newSubCategory, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/subcategories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nom: newSubCategory.nom,
        categorie_id: newSubCategory.categorie_id,
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to add new  subcategory");
        }
      })
      .then(data => {
        console.log("New  subcategory added successfully:", data);
        toggle();
      })
      .catch(error => {
        console.error("Error adding new  subcategory:", error);
      });
  };



  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Sub-Category name</label>
        <input
          type="text"
          step={0.1}
          className="form-control"
          name="nom"
          value={newSubCategory.nom}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Category</label>
        <select className="form-control" name="categorie_id" required
          value={newSubCategory.categorie_id}
          onChange={handleChange}>
          <option selected disabled>choose a category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.nom}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Add Sub-Category</button>
      <button type="button" className="btn btn-secondary ms-2" onClick={toggle}>Cancel</button>
    </form>
  )
}

export default AddForm