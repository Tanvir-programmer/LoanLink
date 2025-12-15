import React, { useContext, useState, useEffect } from "react";
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
  FaThLarge, // Icon for Dashboard
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

// --- Custom Hook (useAuth) ---
const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    return { user: null, loading: true, signOutUser: () => Promise.resolve() };
  }
  return auth;
};

// --- AuthButton Component ---
const AuthButton = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-2">
      {!isLoggedIn && (
        <>
          <button
            className="btn btn-primary btn-outline btn-sm text-sm"
            onClick={() => navigate("/login")}
          >
            <FaSignInAlt className="w-4 h-4 mr-1" />
            Login
          </button>
          <button
            className="btn btn-primary btn-sm text-sm hidden sm:inline-flex"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </>
      )}
    </div>
  );
};

// --- Navbar Component ---
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();
  const isLoggedIn = !!user;

  const handleLogout = () => {
    signOutUser()
      .then(() => {
        navigate("/");
        toast.success("Logged out successfully!");
      })
      .catch((error) => {
        console.error("Logout Error:", error);
        toast.error(error.message || "Error logging out.");
      });
  };

  const getNavLinkClass = ({ isActive }) =>
    `flex items-center px-3 py-2 rounded-lg transition-colors duration-200 ${
      isActive
        ? "text-primary font-bold bg-primary/10 border-b-2 border-primary"
        : "text-gray-600 hover:text-primary hover:bg-gray-100"
    }`;

  return (
    <div className="bg-white shadow-lg sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20">
        {/* Logo Section */}
        <div className="navbar-start">
          <NavLink
            to="/"
            className="text-2xl font-extrabold text-primary tracking-wider btn btn-ghost normal-case"
          >
            LoanLink
          </NavLink>
        </div>

        {/* Desktop Navigation Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">
            <li>
              <NavLink to="/" className={getNavLinkClass}>
                <FaHome className="h-4 w-4 mr-1" /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/allloans" className={getNavLinkClass}>
                <FaMoneyBillAlt className="h-4 w-4 mr-1" /> All Loans
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={getNavLinkClass}>
                <FaInfoCircle className="h-4 w-4 mr-1" /> About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={getNavLinkClass}>
                <FaPhone className="h-4 w-4 mr-1" /> Contact
              </NavLink>
            </li>

            {/* CONDITIONAL DASHBOARD LINK (Desktop) */}
            {isLoggedIn && (
              <li>
                <NavLink to="/dashboard" className={getNavLinkClass}>
                  <FaThLarge className="h-4 w-4 mr-1" /> Dashboard
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        {/* Right Side: Profile & Auth Buttons */}
        <div className="navbar-end gap-3 items-center">
          {isLoggedIn && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border-2 border-primary/50 transition-shadow hover:shadow-md"
              >
                <div className="w-10 rounded-full">
                  <img
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co/6y4tW6F/default-profile.png"
                    }
                    alt={user?.displayName || "User Profile"}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white rounded-lg shadow-xl z-[1] mt-3 w-48 p-2 border border-gray-100"
              >
                <li className="font-semibold text-gray-800 p-2 border-b border-gray-200">
                  {user.displayName || "User"}
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

          <div className="hidden lg:flex">
            <AuthButton isLoggedIn={isLoggedIn} />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="btn btn-ghost lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <FaTimes className="h-6 w-6 text-primary" />
            ) : (
              <FaBars className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden shadow-inner ${
          isMenuOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0"
        } bg-gray-50 border-t border-gray-200`}
      >
        <ul className="flex flex-col space-y-2 px-4">
          <li>
            <NavLink
              to="/"
              className={getNavLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              <FaHome className="mr-2" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/allloans"
              className={getNavLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              <FaMoneyBillAlt className="mr-2" /> All Loans
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={getNavLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              <FaInfoCircle className="mr-2" /> About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={getNavLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              <FaPhone className="mr-2" /> Contact
            </NavLink>
          </li>

          {/* CONDITIONAL DASHBOARD LINK (Mobile) */}
          {isLoggedIn && (
            <li>
              <NavLink
                to="/dashboard"
                className={getNavLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                <FaThLarge className="mr-2" /> Dashboard
              </NavLink>
            </li>
          )}

          <li className="pt-4 border-t border-gray-200">
            <AuthButton isLoggedIn={isLoggedIn} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
