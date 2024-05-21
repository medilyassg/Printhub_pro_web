import React, { useEffect, useState } from "react";

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
import Userindex from "pages/users/users";
import Roleindex from "pages/users/roles";
import CategoryIndex from "pages/Categories/Category";
import SubCategoryIndex from "pages/Categories/Sub-Category";
import Productindex from "pages/Products/product";
import Propertyindex from "pages/Properties/property";
import Costumerindex from "pages/users/customers";
import RegisterIndex from "pages/Authentication/RegisterIndex";
import OrderIndex from "pages/Orders/Order";
import PropertyCategoryindex from "pages/proprietsCategories";
import ClientOrderIndex from "pages/clientPages/orders";
import ClientAddressesIndex from "pages/clientPages/addresses.js";
import SettingsIndex from "pages/settings/index.js";


const userRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/users", component: <Userindex /> },
  { path: "/costumers", component: <Costumerindex /> },
  { path: "/roles", component: <Roleindex /> },
  {path:"/categories",component:<CategoryIndex/>},
  {path:"/sub-categories",component:<SubCategoryIndex/>},
  { path: "/products", component: <Productindex /> },
  { path: "/properties", component: <Propertyindex /> },
  { path: "/orders", component: <OrderIndex /> },
  { path: "/settings", component: <SettingsIndex /> },
  { path: "/propriets-categories", component: <PropertyCategoryindex /> },
  { path: "/account/orders", component: <ClientOrderIndex /> },
  { path: "/account/addresses", component: <ClientAddressesIndex /> },

  //profile
  { path: "/profile", component: <UserProfile /> },

  
];

const authRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/register", component: <RegisterIndex /> },
  { path: "/pages-404", component: <Pages404 /> },
  { path: "/pages-500", component: <Pages500 /> },
];

// const clientRoutes = [

//   { path: "/home", component: <Header data={productData}/> },
//   { path: "/home", component: <Navbar /> },
//   { path: "/home", component: <Navbar /> },
//   { path: "/home", component: <Navbar /> },
//   { path: "/home", component: <Navbar /> },
//   { path: "/home", component: <Navbar /> },
//   { path: "/home", component: <Navbar /> },
// ];
export { userRoutes, authRoutes };
