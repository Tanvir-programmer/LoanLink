import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSignOutAlt,
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
        setIsMenuOpen(false);
      })
      .catch((error) => toast.error(error.message));
  };

  const getNavLinkClass = ({ isActive }) =>
    `flex items-center px-3 py-2 rounded-lg transition-colors duration-200 font-bold text-white ${
      isActive
        ? "text-primary bg-primary/10 border-b-2 border-primary"
        : "max-md:hover:bg-gray-700 hover:text-primary hover:bg-gray-100"
    }`;

  const handleImageError = (e) => {
    e.target.src = "https://i.ibb.co/6y4tW6F/default-profile.png";
  };

  return (
    <div className="bg-[#171d2e] shadow-lg sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20">
        {/* LEFT */}
        <div className="navbar-start">
          <NavLink to="/" className="flex items-center gap-3 no-underline">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F172A] ring-1 ring-gray-600">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="h-5 w-5 text-white"
              >
                <path d="M7 17V7h4M13 17V7h4" strokeLinecap="round" />
                <path d="M7 17h4M13 17h4" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-xl font-extrabold text-white lg:text-2xl">
              Loan<span className="text-blue-600">Link</span>
            </span>
          </NavLink>
        </div>

        {/* CENTER */}
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

        {/* RIGHT */}
        <div className="navbar-end gap-3 items-center">
          {isLoggedIn && !loading && (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar border-2 border-primary/50"
              >
                <div className="w-10 rounded-full">
                  <img
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co/6y4tW6F/default-profile.png"
                    }
                    alt="User"
                    onError={handleImageError}
                  />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="dropdown-content mt-3 p-2 shadow-lg bg-white rounded-xl w-52 border"
              >
                <li className="px-4 py-3 border-b">
                  <p className="text-xs text-gray-400 uppercase">Account</p>
                  <p className="text-sm font-bold text-gray-800 truncate">
                    {user?.displayName || "User"}
                  </p>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-500 hover:bg-red-50 w-full px-4 py-2 rounded-lg font-semibold"
                  >
                    <FaSignOutAlt /> Logout
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
              <FaTimes className="h-6 w-6 text-white" />
            ) : (
              <FaBars className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU SECTION */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#171d2e] border-t border-gray-700 overflow-hidden"
          >
            <ul className="flex flex-col p-4 space-y-2">
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
              {!isLoggedIn && (
                <div className="flex flex-col gap-2 pt-4 border-t border-gray-700">
                  <button
                    onClick={() => {
                      navigate("/login");
                      setIsMenuOpen(false);
                    }}
                    className="btn btn-primary btn-outline btn-sm w-full"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      navigate("/register");
                      setIsMenuOpen(false);
                    }}
                    className="btn btn-primary btn-sm w-full"
                  >
                    Register
                  </button>
                </div>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
