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
// Activating fake backend
fakeBackend()

const App = () => {
  const [categories, setCategories] = useState([])
  const [subcategories, setSubCategories] = useState([])
  useEffect(() => {
    fetchCategories()
    fetchSubCategories()
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
        <Route
          path="/"
          element={
            <Home categories={categories} subcategories={subcategories} />
          }
        />
        <Route
          path="product/details"
          element={
            <Details categories={categories} subcategories={subcategories} />
          }
        />
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
