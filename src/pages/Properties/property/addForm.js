import React, { useState, useEffect } from "react";

const AddForm = ({ isOpen, toggle }) => {
  const [newProperty, setNewProperty] = useState({
    nom: "",
    description: "",
    price: "",
    sub_categories: [],
  });

  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/subcategories")
      .then(response => response.json())
      .then(data => {
        setSubCategories(data.data);
      })
      .catch(error => {
        console.error("Error fetching subcategories:", error);
      });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setNewProperty({ ...newProperty, [name]: value });
  };

  const handleSubcategoryChange = e => {
    const { options } = e.target;
    const selectedSubcategories = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedSubcategories.push(parseInt(options[i].value));
      }
    }
    setNewProperty({ ...newProperty, sub_categories: selectedSubcategories });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/properties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProperty)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to add new property");
        }
      })
      .then(data => {
        console.log("New property added successfully:", data);
        // Close the modal after submitting
        toggle();
      })
      .catch(error => {
        console.error("Error adding new property:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          name="nom"
          value={newProperty.nom}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <input
          type="text"
          className="form-control"
          name="description"
          value={newProperty.description}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Price</label>
        <input
          type="number"
          step={0.1}
          className="form-control"
          name="price"
          value={newProperty.price}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Subcategories</label>
        <select
          className="form-select"
          name="sub_categories"
          multiple
          value={newProperty.sub_categories}
          onChange={handleSubcategoryChange}
        >
          {subCategories.map(subCategory => (
            <option key={subCategory.id} value={subCategory.id}>
              {subCategory.nom}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Add Property</button>
      <button type="button" className="btn btn-secondary ms-2" onClick={toggle}>Cancel</button>
    </form>
  )
}

export default AddForm;
