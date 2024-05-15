import { useFormik } from "formik"
import { get } from "helpers/api_helper"
import React, { useEffect, useState } from "react"
import { Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap"
import * as Yup from "yup"

const AddForm = props => {
  const [subcategories, setSubcategories] = useState([])
  const [selectedProperties, setSelectedProperties] = useState([])

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await get(
          "http://127.0.0.1:8000/api/ProprieteCategorie"
        )
        const data = await response.data
        setSubcategories(data)
      } catch (error) {}
    }

    fetchSubcategories()
  }, [])

  const handleCheckboxChange = prop => {
    setSelectedProperties(properties => {
      // Check if the prop.id already exists in the selectedProperties array
      if (!properties.includes(prop.id)) {
        // If it doesn't exist, add it to the array
        return [...properties, prop.id];
      } else {
        // If it exists, remove it from the array
        return properties.filter(id => id !== prop.id);
      }
    });
    }
  console.log(selectedProperties)


  const validationSchema = Yup.object({
    price_unit: Yup.number().required("Please Enter Price Unit"),
    price_total: Yup.number().required("Please Enter Price Total"),
    impression: Yup.string().required("Please Enter Impression"),
    paper: Yup.string().required("Please Enter Paper"),
    format: Yup.string().required("Please Enter Format"),
    quantity: Yup.number().required("Please Enter Quantity"),
  })

  const validation = useFormik({
    initialValues: {
      price_unit: "",
      price_total: "",
      impression: "",
      paper: "",
      format: "",
      quantity: "",
    },
    validationSchema,
    onSubmit: values => props.handleSave({ ...values, sub_category_id: null }),
  })

  return (
    <Form onSubmit={validation.handleSubmit}>
      <div>
        {subcategories &&
          subcategories.map(subcategorie => (
            <div key={subcategorie.id}>
              <p>{subcategorie.name}</p>
              {subcategorie.propriete &&
                subcategorie.propriete.map(prop => (
                  <Label key={prop.id} check>
                    <Input
                      type="checkbox"
                      id={prop.id}
                      name="propriete"
                      value={prop.name}
                      onChange={() => handleCheckboxChange(prop)}
                    />
                    <span className="mx-2">{prop.name}</span>
                  </Label>
                ))}
            </div>
          ))}
        <Button type="submit" color="primary">
          Add Product
        </Button>
        <Button
          type="button"
          color="secondary"
          className="ms-2"
          onClick={props.handleCancel}
        >
          Cancel
        </Button>
      </div>
    </Form>
  )
}

export default AddForm
