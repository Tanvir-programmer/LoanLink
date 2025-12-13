import React, { useContext } from "react";
// FIX: Corrected import from "react-router" to "react-router-dom"
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
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

// --- Custom Hook (useAuth) ---
const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    // This provides safe defaults if AuthContext is not available
    return { user: null, loading: true, signOutUser: () => Promise.resolve() };
  }
  return auth;
};

// --- Placeholder AuthButton Component (Assumed to be defined elsewhere) ---
// This is added to prevent errors since it's called in the Navbar return block
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
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();
  const isLoggedIn = !!user;
  // const defaultAvatar = "https://i.ibb.co/6y4tW6F/default-profile.png";

  // FIX: Robust logic to check multiple user properties for the photo URL
  // const avatarSrc = user.photoURL;

  const handleLogout = () => {
    signOutUser()
      .then(() => {
        navigate("/");
        toast.success("Logged out successfully!");
      })
      .catch((error) => {
        console.error("Logout Error:", error);
        // Firebase logout errors are rare, but this handles potential issues
        toast.error(error.message || "Error logging out.");
      });
  };

  const getNavLinkClass = ({ isActive }) =>
    `flex items-center px-3 py-2 rounded-lg transition-colors duration-200 ${
      isActive
        ? "text-primary font-bold bg-primary/10 border-b-2 border-primary"
        : "text-gray-600 hover:text-primary hover:bg-gray-100"
    }`;

  // Log user information after login
  React.useEffect(() => {
    if (isLoggedIn) {
      console.log("User logged in:", user);
    }
  }, [isLoggedIn, user]);

  return (
    <div className="bg-white shadow-lg sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20">
        <div className="navbar-start">
          <a className="text-2xl font-extrabold text-primary tracking-wider transition-colors duration-200 btn btn-ghost">
            <NavLink to="/">LoanLink</NavLink>
          </a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">
            <li>
              <NavLink to="/" className={getNavLinkClass}>
                <FaHome className="h-4 w-4" />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/allloans" className={getNavLinkClass}>
                <FaMoneyBillAlt className="h-4 w-4" />
                All Loans
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={getNavLinkClass}>
                <FaInfoCircle className="h-4 w-4" />
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={getNavLinkClass}>
                <FaPhone className="h-4 w-4" />
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

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
                  {user.displayName || "Profile"}
                </li>
                <li className="font-semibold text-gray-800 p-2 border-b border-gray-200">
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <button
                    className="text-red-500 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}

          <div className="hidden lg:flex">
            <AuthButton isLoggedIn={isLoggedIn} />
          </div>

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

      {/* Mobile Menu */}
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
              <FaHome className="mr-2" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/allloans"
              className={getNavLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              <FaMoneyBillAlt className="mr-2" />
              All Loans
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={getNavLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              <FaInfoCircle className="mr-2" />
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={getNavLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              <FaPhone className="mr-2" />
              Contact
            </NavLink>
          </li>
          <li className="pt-4">
            <AuthButton isLoggedIn={isLoggedIn} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
