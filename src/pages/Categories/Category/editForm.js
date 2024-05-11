import React, { useState } from "react";

const EditForm = ({ category, onSubmit , toggle}) => {
  const [editedCategory, setEditedCategory] = useState(category);

  const handleChange = e => {
    const { name, value } = e.target;
    setEditedCategory({ ...editedCategory, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(editedCategory);
    toggle()
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Category Name</label>
        <input
          type="text"
          step={0.1}
          className="form-control"
          name="nom"
          value={editedCategory.nom}
          onChange={handleChange}
        />
      </div>
      
      <button type="submit" className="btn btn-primary mx-2" >
        Save Changes
      </button>
      <button type="button" className="btn btn-secondary" onClick={toggle}>
        Cancel
      </button>
    </form>
  );
};

export default EditForm;