// EditForm.js

import React, { useState } from "react";

const EditForm = ({ product, onSubmit , toggle}) => {
  const [editedProduct, setEditedProduct] = useState(product);

  const handleChange = e => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(editedProduct);
    toggle()
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
          value={editedProduct.price_unit}
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
          value={editedProduct.price_total}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Impression</label>
        <input
          type="text"
          className="form-control"
          name="impression"
          value={editedProduct.impression}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Paper</label>
        <input
          type="text"
          className="form-control"
          name="paper"
          value={editedProduct.paper}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Format</label>
        <input
          type="text"
          className="form-control"
          name="format"
          value={editedProduct.format}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Quantity</label>
        <input
          type="number"
          className="form-control"
          name="quantity"
          value={editedProduct.quantity}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary" >
        Save Changes
      </button>
      <button type="button" className="btn btn-secondary" onClick={toggle}>
        Cancel
      </button>
    </form>
  );
};

export default EditForm;
