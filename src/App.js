import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import { connect } from "react-redux"

// Import Routes
import { userRoutes, authRoutes, clientRoutes } from "./routes/allRoutes"

// Import middleware
import Authmiddleware from "./routes/middleware/Authmiddleware"

// Layouts
import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
import "./assets/scss/theme.scss"
import "./App.css"

// Import fake backend
import fakeBackend from "./helpers/AuthType/fakeBackend"

import Home from "pages/Client/pages/home/Home"
import Details from "pages/Client/pages/details/Details"
import { get } from "helpers/api_helper"
import SubcategoryCard from "pages/Client/components/SubcategoryCard/SubcategoryCard "
import { use } from "i18next"
import CheckoutPage from "pages/Checkout/CheckoutPage"
import ClientLayout from "pages/Client/pages/home/ClientLayout"
import SuccessPage from "pages/Checkout/SuccessPage"
import LivraisonPage from "pages/Checkout/LivraisonPage"
import PaymentPage from "pages/Checkout/PaymentPage"
// Activating fake backend
fakeBackend()

const App = () => {
  const [categories, setCategories] = useState([])
  const [subcategories, setSubCategories] = useState([])
  const [cartitems,setCartItems]=useState([])
  useEffect(() => {
    fetchCategories()
    fetchSubCategories()
    fetchCartItems()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await get("http://127.0.0.1:8000/api/categories")

      const data = await response.data
      setCategories(data)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchSubCategories = async () => {
    try {
      const response = await get("http://127.0.0.1:8000/api/subcategories")

      const data = await response.data
      setSubCategories(data)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchCartItems = async () => {
    try {
      const response = await get("http://127.0.0.1:8000/api/carts")

      const data = await response.data
      setCartItems(data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <React.Fragment>
      <Routes>
        <Route>
          {authRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={<NonAuthLayout>{route.component}</NonAuthLayout>}
              key={idx}
              exact={true}
            />
          ))}
        </Route>

        <Route>
          {userRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={<Authmiddleware>{route.component}</Authmiddleware>}
              key={idx}
              exact={true}
            />
          ))}
        </Route>

        <Route path="/" element={
          <ClientLayout 
            categories={categories} 
            subcategories={subcategories} 
            cartitems={cartitems} 
            fetchCartItems={fetchCartItems} 
          />
        }>
          <Route index element={<Home />} />
          <Route path="cat/:categoryId/:subcategoryId" element={<Details categories={categories} 
            subcategories={subcategories} 
            cartitems={cartitems} 
            fetchCartItems={fetchCartItems}  />} />
          <Route path="cat/:categoryId" element={<SubcategoryCard categories={categories} 
            subcategories={subcategories} 
            cartitems={cartitems} 
            fetchCartItems={fetchCartItems} />} />
          <Route path="/checkout/success/:orderId" element={<SuccessPage  />} />
          <Route path="/checkout/shipping/:orderId" element={<LivraisonPage  />} />
          <Route path="/checkout/:orderId" element={<PaymentPage  />} />
          <Route path="/checkout/payment/:orderId/:selectedPaymentMethod" element={<CheckoutPage  />} />
        </Route>
      </Routes>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any,
}

const mapStateToProps = state => ({
  layout: state.Layout,
})

export default connect(mapStateToProps, null)(App)
