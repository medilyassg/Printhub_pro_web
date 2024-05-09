import React, { useState } from "react";

const AddForm = ({ isOpen, toggle }) => {
  const [newProperty, setNewProperty] = useState({
    name: "",
    description: "",
    price: "",
   
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setNewProperty({ ...newProperty, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/properties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: newProperty.name,
        description: newProperty.description,
        price: newProperty.price,
        
      })
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
          name="name"
          value={newProperty.name}
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
      
      <button type="submit" className="btn btn-primary">Add Property</button>
      <button type="button" className="btn btn-secondary ms-2" onClick={toggle}>Cancel</button>
    </form>
  )
}

export default AddForm
