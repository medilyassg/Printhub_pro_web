import React, { useState } from "react";

const AddForm = ({ isOpen, toggle }) => {
  const [newCategory, setNewCategory] = useState({
    nom: "",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nom: newCategory.nom,
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to add new category");
        }
      })
      .then(data => {
        console.log("New category added successfully:", data);
        toggle();
      })
      .catch(error => {
        console.error("Error adding new category:", error);
      });
  };
  

  
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Category name</label>
        <input
          type="text"
          step={0.1}
          className="form-control"
          name="nom"
          value={newCategory.nom}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Category</button>
      <button type="button" className="btn btn-secondary ms-2" onClick={toggle}>Cancel</button>
    </form>
  )
}

export default AddForm