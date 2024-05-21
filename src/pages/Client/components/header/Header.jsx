import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Logo from "../../images/logo.svg";
import searchIcon from "../../images/search.png";
import "./header.css";
import Navbar from "./nav/Navbar";
import IconCart from "../../images/icon-cart.svg";
import IconAccount from "../../images/icon-user.svg";
import { Button } from "reactstrap";

const Header = (props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [isopenSearch, setOpenSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const InputSearchRef = useRef();
  const HeaderRef = useRef();
  const isAuthenticated = localStorage.getItem("authUser") !== null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (HeaderRef.current) {
        const position = window.pageYOffset;
        if (position > 70) {
          HeaderRef.current.classList.add("fixed");
        } else {
          HeaderRef.current.classList.remove("fixed");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const results = [
        ...props.categories.filter((category) =>
          category.nom.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        ...props.subcategories.filter((subcategory) =>
          subcategory.nom.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      ];
      setSearchResults(results.slice(0, 5)); // Limiting to 5 search results
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, props.categories, props.subcategories]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="headerWrapper" ref={HeaderRef}>
        <header>
          <div className="container-fluid">
            <div className="row">
              <div className="col d-flex align-items-center justify-content-start">
                <Link to="/">
                  <img src={Logo} style={{ height: "60px", width: "190px" }} />
                </Link>
              </div>

              <div className="col d-flex align-items-center justify-content-center">
                <div
                  className={`headerSearch d-flex align-items-center ${
                    isopenSearch === true ? "open" : ""
                  }`}
                >
                  <img
                    src={searchIcon}
                    className="searchIcon cursor"
                    onClick={() => setOpenSearch(true)}
                  />
                  <div className="search">
                    <input
                      type="text"
                      placeholder="Search Your Items..."
                      ref={InputSearchRef}
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </div>
                </div>
                {searchResults.length > 0 && (
                  <div className="searchResults">
                    {searchResults.map((result) => (
                      <div
                        className={`searchResult ${
                          result.categorie_id ? "subcategory" : "category"
                        }`}
                        key={result.id}
                      >
                        <Link
                          to={`/cat/${
                            result.categorie_id
                              ? `${result.categorie_id}/${result.id}`
                              : result.nom.toLowerCase()
                          }`}
                        >
                          {result.nom}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="col d-flex align-items-center justify-content-end">
                <ul className="list list-inline mb-0 headerTabs">
                  <li className="list-inline-items">
                    <span>
                      <img src={IconCart} />
                      Cart
                    </span>
                  </li>
                  {isAuthenticated ? (
                    <li className="list-inline-items">
                      <span onClick={() => setOpenDropDown(!openDropDown)}>
                        <img src={IconAccount} />
                        Account
                      </span>
                      {openDropDown !== false && (
                        <ul className="accountDropDownMenu">
                          <>
                            <li>
                              <Button className="align-items-center">
                                <Link to="/profile" className="text-dark">
                                  Profile
                                </Link>
                              </Button>{" "}
                            </li>
                            <li>
                              <Button className="align-items-center">
                                <a href="#" className="text-dark">
                                  Order Tracking
                                </a>
                              </Button>{" "}
                            </li>
                          </>
                        </ul>
                      )}
                    </li>
                  ) : (
                    <li className="list-inline-items">
                      <Link to="/login">
                        <span className="text-dark">Login</span>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </header>
        <Navbar
          categories={props.categories}
          subcategories={props.subcategories}
        />
      </div>
      <div className="afterHeader"></div>
    </>
  );
};

export default Header;
