import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from "pages/Client/components/header/Header";

const ClientLayout = (props) => {
  return (
    <>
      <Header 
        categories={props.categories} 
        subcategories={props.subcategories} 
        cartitems={props.cartitems} 
        fetchCartItems={props.fetchCartItems} 
      />
      <Outlet />
    </>
  );
};

export default ClientLayout;
