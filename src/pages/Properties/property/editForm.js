// EditForm.js

import React, { useState } from "react";

const EditForm = ({ property, onSubmit , toggle}) => {
  const [editedProperty, setEditedProperty] = useState(property);

  const handleChange = e => {
    const { name, value } = e.target;
    setEditedProperty({ ...editedProperty, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(editedProperty);
    toggle()
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={editedProperty.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <input
          type="text"
          className="form-control"
          name="description"
          value={editedProperty.description}
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
          value={editedProperty.price}
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
