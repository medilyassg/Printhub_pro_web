import React, { useEffect, useState } from "react"
import "./nav.css"
import { Button } from "@mui/material"
import {
  GridView,
  HeadphonesOutlined,
  KeyboardArrowDown,
} from "@mui/icons-material"
import { Link } from "react-router-dom"
import MegaImgt from "../../../images/360_F_712724773_cFHfl8fvajfRJntpVHI2o4kI3ram9ZbE.jpg"
import SubcategoryCard from "../../SubcategoryCard/SubcategoryCard "


const Navbar = props => {
  const [navData, setNavData] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)

  useEffect(() => {
    setNavData(props.data)
    window.scrollTo(0, 0)
  }, [])

  const handleCategoryClick = categoryId => {
    setSelectedCategoryId(categoryId)
    console.log("Category ID:", categoryId)
  }

  return (
    <>
      <div className="nav d-flex align-items-center">
        <div className="container-fluid ">
          <div className="row position-relative">
            <div className="col part2 position-static">
              <nav>
                <ul className="list list-inline mb-0">
                  <li className="list-inline-item position-static">
                    <Button>
                      <Link to="/cat/tous-les-produits">Tous les produits</Link>
                      <KeyboardArrowDown />
                    </Button>
                    {/* Mega menu starts */}
                    <div className="dropDown_Menu megaMenu w-100">
                      <div className="row">
                        {/* Mapping categories */}
                        {props.categories.map(category => (
                          <div className="col" key={category.id}>
                            <Link
                              to={`/cat/${category.nom?.toLowerCase()}`}
                              categoryId={category.id}
                            >
                              <h4 className="text-g text-capitalize">
                                {category.nom}
                              </h4>
                            </Link>
                            {/* Mapping subcategories */}
                            {props.subcategories
                              .filter(sub => sub.categorie_id === category.id)
                              .map(subcategory => (
                                <ul key={subcategory.id} className="mt-4 mb-0">
                                  <li>
                                    <Link
                                      to={`/cat/${category.nom?.toLowerCase()}/${String(
                                        subcategory.id
                                      )
                                        .replace(/\s/g, "-")
                                        .toLowerCase()}`}
                                    >
                                      {subcategory.nom}
                                    </Link>
                                  </li>
                                </ul>
                              ))}
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Mega menu ends */}
                  </li>
                  
                  {/* Conductions of nav 3 elements groceries , electronic & fashion starts */}
                  {props.categories.length !== 0 &&
                    props.categories.map((category, index) => {
                      const categorySubcategories = props.subcategories.filter(
                        subcategory => subcategory.categorie_id === category.id
                      )

                      return (
                        <li className="list-inline-item" key={index}>
                          <Button>
                            <Link to={`/cat/${category.nom?.toLowerCase()}`}>
                              {category.nom}
                            </Link>
                            <KeyboardArrowDown />
                          </Button>

                          {/* Dropdown starts */}
                          {categorySubcategories.length !== 0 && (
                            <div className="dropDown_Menu">
                              <ul>
                                {categorySubcategories.map(
                                  (subcategory, subIndex) => (
                                    <li key={subIndex}>
                                      <Button>
                                        <Link
                                          to={`/cat/${category.nom?.toLowerCase()}/${String(
                                            subcategory.id
                                          )
                                            .replace(/\s/g, "-")
                                            .toLowerCase()}`}
                                        >
                                          {subcategory.nom}
                                        </Link>
                                      </Button>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                          {/* Dropdown ends */}
                        </li>
                      )
                    })}

                  {/* <li className="list-inline-item">
                    <Button>
                      <Link>Shop</Link>
                      <KeyboardArrowDown />
                    </Button>
                    <div className="dropDown_Menu">
                      <ul>
                        <li>
                          <Button>
                            <Link to={"/"}>Shop</Link>
                          </Button>
                        </li>
                        <li className="list-inline-item">
                          <Button>
                            <Link to={"product/details"}>Product Details</Link>
                          </Button>
                        </li>

                        <li>
                          <Button>
                            <Link to={"/cat/:id"}>Listing</Link>
                          </Button>
                        </li>
                        <li>
                          <Button>
                            <Link to={"/404"}>404 Pages</Link>
                          </Button>
                        </li>
                      </ul>
                    </div>
                  </li> */}

                  {/* blog ends */}
                  {/* <li className="list-inline-item">
                    <Button>
                      <Link>Contact</Link>
                    </Button>
                  </li> */}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {selectedCategoryId && (
        <SubcategoryCard categoryId={selectedCategoryId} />
      )}
    </>
  )
}

export default Navbar
