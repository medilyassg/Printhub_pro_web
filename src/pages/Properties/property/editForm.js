import React, { useState } from "react";

const EditForm = ({ property, onSubmit, toggle, subCategories }) => {
  const [editedProperty, setEditedProperty] = useState(property);

  const handleChange = e => {
    const { name, value } = e.target;
    setEditedProperty({ ...editedProperty, [name]: value });
  };

  const handleSubcategoryChange = e => {
    const { options } = e.target;
    const selectedSubcategories = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedSubcategories.push(parseInt(options[i].value));
      }
    }
    setEditedProperty({ ...editedProperty, sub_categories: selectedSubcategories });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(editedProperty);
    toggle();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          name="nom"
          value={editedProperty.nom}
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
      <div className="mb-3">
        <label className="form-label">Subcategories</label>
        <select
          className="form-select"
          name="sub_categories"
          multiple
          value={editedProperty.sub_categories}
          onChange={handleSubcategoryChange}
        >
          {subCategories.map(subCategory => (
            <option key={subCategory.id} value={subCategory.id}>
              {subCategory.nom}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Save Changes
      </button>
      <button type="button" className="btn btn-secondary" onClick={toggle}>
        Cancel
      </button>
    </form>
  );
};

export default EditForm;
