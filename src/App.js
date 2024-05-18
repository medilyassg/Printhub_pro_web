import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import { connect } from "react-redux"
import "./App.css"

// Import Routes
import { userRoutes, authRoutes, clientRoutes } from "./routes/allRoutes"

// Import middleware
import Authmiddleware from "./routes/middleware/Authmiddleware"

// Layouts
import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
import "./assets/scss/theme.scss"

// Import fake backend
import fakeBackend from "./helpers/AuthType/fakeBackend"

// Static data
import dbJson from "./db.json"

// Page Components
import Home from "pages/Client/pages/home/Home"
import Details from "pages/Client/pages/details/Details"

// Activating fake backend
fakeBackend()

const App = () => {
  const [productData, setProductData] = useState([])

  useEffect(() => {
    setProductData(dbJson.productData)
  }, [])

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
          <Route path="/home" element={<Home data={productData} />} />
          <Route path="/home/product/details" element={<Details data={productData} />} />
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
