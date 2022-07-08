import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import UserRoute from "./UserRoute";

import Login from "../pages/Login";
import { RegisterUser } from "../pages/User";
import { RegisterCMS } from "../pages/CMS";
import SideBarCMS from "../components/SideBarCMS";
const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registerUser" element={<RegisterUser />}></Route>
      <Route path="/registerCMS" element={<RegisterCMS />}></Route>
      <Route path="/cms/*" element={<SideBarCMS />}></Route>
      <Route path="/user/*" element={<UserRoute />}></Route>
    </Routes>
  );
};

export default MainRoute;
