import React, { useState } from "react";

const AddForm = ({ isOpen, toggle }) => {
  const [newProduct, setNewProduct] = useState({
    price_unit: "",
    price_total: "",
    impression: "",
    paper: "",
    format: "",
    quantity: "",
    sub_category_id: 1 
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        price_unit: newProduct.price_unit,
        price_total: newProduct.price_total,
        impression: newProduct.impression,
        paper: newProduct.paper,
        format: newProduct.format,
        quantity: newProduct.quantity,
        sub_category_id: newProduct.sub_category_id
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to add new product");
        }
      })
      .then(data => {
        console.log("New product added successfully:", data);
        // Close the modal after submitting
        toggle();
      })
      .catch(error => {
        console.error("Error adding new product:", error);
      });
  };
  

  
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Price Unit</label>
        <input
          type="number"
          step={0.1}
          className="form-control"
          name="price_unit"
          value={newProduct.price_unit}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Price Total</label>
        <input
          type="number"
          step={0.1}
          className="form-control"
          name="price_total"
          value={newProduct.price_total}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Impression</label>
        <input
          type="text"
          className="form-control"
          name="impression"
          value={newProduct.impression}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Paper</label>
        <input
          type="text"
          className="form-control"
          name="paper"
          value={newProduct.paper}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Format</label>
        <input
          type="text"
          className="form-control"
          name="format"
          value={newProduct.format}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Quantity</label>
        <input
          type="number"
          className="form-control"
          name="quantity"
          value={newProduct.quantity}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Product</button>
      <button type="button" className="btn btn-secondary ms-2" onClick={toggle}>Cancel</button>
    </form>
  )
}

export default AddForm
