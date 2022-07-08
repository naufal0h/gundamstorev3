import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ShoppingCart from "../components/ShoppingCart";
import { CheckoutPage } from "../pages/User";

const UserRoute = () => {
  return (
    // <div class="container mx-auto">
    <Routes>
      <Route path="/" element={<Navigate replace to="/user/home" />} />
      <Route path="/*" element={<ShoppingCart />}></Route>
      <Route path="/checkout/:id" element={<CheckoutPage />}></Route>
    </Routes>
    // </div>
  );
};

export default UserRoute;
