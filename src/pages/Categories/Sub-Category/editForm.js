import React, { useEffect, useState } from "react";

const EditForm = ({ subcategory, onSubmit, toggle }) => {
  const [editedSubCategory, setEditedSubCategory] = useState(subcategory);
  const [categories, setCategories] = useState([]);
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
    setEditedSubCategory({ ...editedSubCategory, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(editedSubCategory);
    toggle()
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Sub-Category Name</label>
        <input
          type="text"
          step={0.1}
          className="form-control"
          name="nom"
          value={editedSubCategory.nom}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Category</label>
        <select className="form-control" name="categorie_id"
          value={editedSubCategory.categorie_id}
          onChange={handleChange}>
          <option selected disabled>choose a category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.nom}</option>
          ))}
        </select>
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