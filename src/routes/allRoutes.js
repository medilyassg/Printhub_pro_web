import React from "react";

// Profile
import UserProfile from "../pages/Authentication/user-profile";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";

//Utility
import Pages404 from "../pages/Utility/pages-404";
import Pages500 from "../pages/Utility/pages-500";

// Dashboard
import Dashboard from "../pages/Dashboard/index";
import Register from "pages/Authentication/Register";
import Userindex from "pages/users/users";
import Roleindex from "pages/users/roles";
import Permissionindex from "pages/users/permissions";
import CategoryIndex from "pages/Categories/Category";
import SubCategoryIndex from "pages/Categories/Sub-Category";
import Productindex from "pages/Products/product";
import Propertyindex from "pages/Properties/property";


const userRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/users", component: <Userindex /> },
  { path: "/permissions", component: <Permissionindex /> },
  { path: "/roles", component: <Roleindex /> },
  {path:"/categories",component:<CategoryIndex/>},
  {path:"/sub-categories",component:<SubCategoryIndex/>},
  { path: "/products", component: <Productindex /> },
  { path: "/properties", component: <Propertyindex /> },

  // //profile
  { path: "/profile", component: <UserProfile /> },

  // this route should be at the end of all other routes
  { path: "/", component: <Dashboard /> },
];

const authRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/register", component: <Register /> },
  { path: "/pages-404", component: <Pages404 /> },
  { path: "/pages-500", component: <Pages500 /> },
];

export { userRoutes, authRoutes };
