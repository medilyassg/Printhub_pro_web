import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { Row, Col, CardBody, Card, Form, FormFeedback, Label, Input } from "reactstrap";
import Select from "react-select";
import * as Yup from "yup";
import { get, post } from "helpers/api_helper";

const AddForm = props => {
  
  const [subcategories, setSubcategories] = useState([]);
  const [SelectedCat, setSelectedCat] = useState([]);

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const handleCatChange = async (e) => {
    const cat = e.target.value;
    console.log(cat);
    setSelectedCat(cat);
}
  const fetchSubcategories = async () => {
    try {
      const response = await get("http://127.0.0.1:8000/api/ProprieteCategorie");

      const data = await response.data;
      setSubcategories(data);
    } catch (error) {
      // setError(error.response.data.message);

    }
  };
  



  const validationSchema = Yup.object({
    name: Yup.string().required("Please Enter a name"),
    description: Yup.string().required("Please Enter description"),
    price: Yup.number().required("Please Enter price"),
  });


  const validation = useFormik({
    initialValues : {
      name: "",
      description: "",
      price: "",
      propriete_categorie_id: SelectedCat,
    },
    validationSchema,
    onSubmit: (values) =>{
      props.handleSave(values)},
  });

  return (
    <form onSubmit={validation.handleSubmit}>
      <div className="mb-3">
        <Label className="form-label">Name</Label>
        <Input
          type="text"
          className="form-control"
          name="name"
          onChange={validation.handleChange}
          onBlur={validation.handleBlur}
          value={validation.values.name || ""}
          invalid={validation.touched.name && validation.errors.name}
        />
        <FormFeedback>{validation.errors.name}</FormFeedback>
      </div>
      <div className="mb-3">
        <Label className="form-label">Description</Label>
        <Input
          type="text"
          className="form-control"
          name="description"
          id="description"
          onChange={validation.handleChange}
          onBlur={validation.handleBlur}
          value={validation.values.description || ""}
          invalid={validation.touched.description && validation.errors.description}
        />
        <FormFeedback>{validation.errors.description}</FormFeedback>
      </div>
      <div className="mb-3">
        <Label className="form-label">Price</Label>
        <Input
          type="number"
          step={0.1}
          className="form-control"
          name="price"
          id="price"
          onChange={validation.handleChange}
          onBlur={validation.handleBlur}
          value={validation.values.price || ""}
          invalid={validation.touched.price && validation.errors.price}
        />
        <FormFeedback>{validation.errors.price}</FormFeedback>
      </div>
      <div className="mb-3">
        <Label className="form-label">Subcategories</Label>
        <Input
          type="select"
          name="propriete_categorie_id"
          value={SelectedCat}
          onChange={(e)=>{handleCatChange(e) 
            validation.handleChange(e)}}
          classNamePrefix="select2-selection"
          invalid={validation.touched.propriete_categorie_id && validation.errors.propriete_categorie_id}
        >
          <option value="">Select Region</option>
          {subcategories && subcategories.map((cat, index) => (
            <option key={index} value={cat.id}>{cat.name}</option>
          ))}
          
        </Input>
      </div>
      <FormFeedback>{validation.errors.subcategories}</FormFeedback>
      <button type="submit" className="btn btn-primary">Add Property</button>
      <button type="button" className="btn btn-secondary ms-2" onClick={props.handleCancel}>Cancel</button>
    </form>
  )
}

export default AddForm;