import React from "react";
import { Routes, Route } from "react-router-dom";
import Buy from "../pages/Buy";
import MyAccount from "../pages/MyAccount";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Ticket from "../pages/Ticket";
import { Movies } from "../components/Movies";

const Allrouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy/:id" element={<Buy />} />
        <Route path="/account" element={<MyAccount />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/movies/:id" element={<Movies />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Allrouter;
