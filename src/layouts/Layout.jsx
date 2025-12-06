import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div>
      <div className="sticky top-0 z-50">
        <Navbar></Navbar>
      </div>
      <div className="min-h-screen">
        <div className="w-11/12 mx-auto">
          <Outlet></Outlet>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
