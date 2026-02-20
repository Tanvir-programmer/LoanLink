import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import {
  FaSignOutAlt,
  FaSignInAlt,
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaPhone,
  FaMoneyBillAlt,
  FaThLarge,
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOutUser, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const isLoggedIn = !!user;

  const handleLogout = () => {
    signOutUser()
      .then(() => {
        navigate("/");
        toast.success("Logged out successfully!");
      })
      .catch((error) => toast.error(error.message));
  };

  const getNavLinkClass = ({ isActive }) =>
    `flex items-center px-3 py-2 rounded-lg transition-colors duration-200 font-bold text-white ${
      isActive
        ? "text-primary font-bold bg-primary/10 border-b-2 border-primary"
        : "max-md:bg-black text-white hover:text-primary hover:bg-gray-100"
    }`;

  // This handles the error you're seeing in the console
  const handleImageError = (e) => {
    e.target.src = "https://i.ibb.co/6y4tW6F/default-profile.png";
  };

  return (
    <div className="bg-[#171d2e] shadow-lg sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20">
        <div className="navbar-start ">
          <NavLink
            to="/"
            className="group flex items-center gap-3 no-underline"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F172A] ring-1 ring-gray-600 group-hover:bg-blue-600 transition-colors">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="h-5 w-5 text-white"
              >
                <path
                  d="M7 17V7h4M13 17V7h4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 17h4M13 17h4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-extrabold tracking-tighter text-white lg:text-2xl">
                Loan<span className="text-blue-600">Link</span>
              </span>
            </div>
          </NavLink>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">
            <li>
              <NavLink to="/" className={getNavLinkClass}>
                <FaHome className="mr-1" /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/allloans" className={getNavLinkClass}>
                <FaMoneyBillAlt className="mr-1" /> All Loans
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={getNavLinkClass}>
                <FaInfoCircle className="mr-1" /> About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={getNavLinkClass}>
                <FaPhone className="mr-1" /> Contact
              </NavLink>
            </li>
            {isLoggedIn && (
              <li>
                <NavLink to="/dashboard" className={getNavLinkClass}>
                  <FaThLarge className="mr-1" /> Dashboard
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        <div className="navbar-end gap-3 items-center">
          {isLoggedIn && !loading && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border-2 border-primary/50"
              >
                <div className="w-10 rounded-full">
                  <img
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co/6y4tW6F/default-profile.png"
                    }
                    alt="User"
                    onError={handleImageError} // FIXED: Catches the NotSameOrigin error
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white rounded-lg shadow-xl z-[1] mt-3 w-48 p-2 border border-gray-100"
              >
                <li className="font-semibold text-gray-800 p-2 border-b">
                  {user?.displayName || "User"}
                </li>
                <li>
                  <button
                    className="text-red-500 hover:bg-red-50 py-2"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="mr-1" /> Logout
                  </button>
                </li>
              </ul>
            </div>
          )}

          {!isLoggedIn && (
            <div className="hidden lg:flex gap-2">
              <button
                onClick={() => navigate("/login")}
                className="btn btn-primary btn-outline btn-sm"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="btn btn-primary btn-sm"
              >
                Register
              </button>
            </div>
          )}

          <button
            className="btn btn-ghost lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <FaTimes className="h-6 w-6 text-primary" />
            ) : (
              <FaBars className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
