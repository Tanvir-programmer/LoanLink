import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext"; // adjust path if needed

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle Login
  const handleLogin = () => {
    navigate("/login");
  };

  // Handle Logout
  const handleLogout = async () => {
    await signOutUser();
    navigate("/");
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* LEFT SIDE */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          {/* MOBILE MENU */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>All Loans</a>
            </li>
            <li>
              <a>About Us</a>
            </li>
            <li>
              <a>Contact</a>
            </li>
          </ul>
        </div>

        <a className="btn btn-ghost text-xl text-primary">LoanLink</a>
      </div>

      {/* CENTER MENU */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>All Loans</a>
          </li>
          <li>
            <a>About Us</a>
          </li>
        </ul>
      </div>

      {/* RIGHT SIDE */}
      <div className="navbar-end flex items-center gap-3">
        {/* Show user info if logged in */}
        {user && (
          <>
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="user"
                className="w-8 h-8 rounded-full border"
              />
            )}

            {user.displayName && (
              <span className="font-semibold hidden sm:inline">
                {user.displayName}
              </span>
            )}
          </>
        )}

        {/* Login / Logout Button */}
        {user ? (
          <button onClick={handleLogout} className="btn btn-primary">
            Logout
          </button>
        ) : (
          <button onClick={handleLogin} className="btn btn-primary">
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
