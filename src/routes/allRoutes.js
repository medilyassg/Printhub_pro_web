
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

import PaymentCredentials from "pages/settings/PaymentCredentials";
import LivraisonPage from "pages/Checkout/LivraisonPage";
import PaymentPage from "pages/Checkout/PaymentPage";
import CheckoutPage from "pages/Checkout/CheckoutPage";
import SuccessPage from "pages/Checkout/SuccessPage";
import TransactionIndex from "pages/Orders/Order/transactions/TransactionIndex";
import BankIndex from "pages/settings/banks";
import VirmentBancaire from "pages/Checkout/VirmentBancaire";
import TrackingOrder from "pages/Orders/Tracking/TrackingOrder";


const userRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/users", component: <Userindex /> },
  { path: "/costumers", component: <Costumerindex /> },
  { path: "/roles", component: <Roleindex /> },
  { path: "/categories", component: <CategoryIndex /> },
  { path: "/sub-categories", component: <SubCategoryIndex /> },
  { path: "/products", component: <Productindex /> },
  { path: "/properties", component: <Propertyindex /> },
  { path: "/orders", component: <OrderIndex /> },
  { path: "/transactions", component: <TransactionIndex /> },
  { path: "/settings/company-info", component: <SettingsIndex /> },
  { path: "/settings/payments-info", component: <PaymentCredentials /> },
  { path: "/settings/banks", component: <BankIndex /> },
  { path: "/propriets-categories", component: <PropertyCategoryindex /> },
  { path: "/account/orders", component: <ClientOrderIndex /> },
  { path: "/account/addresses", component: <ClientAddressesIndex /> },
  { path: "/tracking/:trackingNumber", component: <TrackingOrder /> },

  //profile
  { path: "/profile", component: <UserProfile /> },



];

const authRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/register", component: <RegisterIndex /> },
  { path: "/pages-404", component: <Pages404 /> },
  { path: "/pages-500", component: <Pages500 /> },
  { path: "/virmentbancaire", component: <VirmentBancaire /> },
  

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
