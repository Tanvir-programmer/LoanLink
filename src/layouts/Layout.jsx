import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast"; // 👈 IMPORT ADDED

const Layout = () => {
  return (
    <div>
      {/* 1. Navbar (Sticky and high Z-index) */}
      <div className="sticky top-0 z-50">
        <Navbar></Navbar>
      </div>

      {/* 2. Main Content Area */}
      <div className="min-h-screen">
        <div className="w-11/12 mx-auto">
          <Outlet></Outlet>
        </div>
      </div>

      {/* 3. Footer */}
      <Footer></Footer>

      {/* 4. Toaster Component (Placed at the end of the root div) 👈 COMPONENT ADDED */}
      {/* Placing it here ensures it's persistent and can be accessed from any child route via `toast()` */}
      <Toaster
        position="top-right" // You can customize the default position
        reverseOrder={false}
      />
    </div>
  );
};

export default Layout;
