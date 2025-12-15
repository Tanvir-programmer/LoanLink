import React, { useContext } from "react";
import {
  FaUserEdit,
  FaEnvelope,
  FaIdBadge,
  FaSignOutAlt,
  FaCalendarAlt,
  FaShieldAlt,
} from "react-icons/fa";
import { AuthContext } from "../../../context/AuthContext"; // Ensure this path is correct
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const MyProfile = () => {
  // Destructure from Context
  const { user, signOutUser, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOutUser()
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/");
      })
      .catch((err) => toast.error(err.message));
  };

  // Show loading spinner while Firebase is validating the user session
  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  // Fallback if no user is found (though PrivateRoute usually handles this)
  if (!user) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">
          Please login to view your profile.
        </h2>
        <button
          onClick={() => navigate("/login")}
          className="btn btn-primary mt-4"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 animate__animated animate__fadeIn">
      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700">
        {/* Decorative Header/Cover */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>

        <div className="relative px-6 pb-8">
          {/* Avatar Section */}
          <div className="relative -top-12 flex flex-col items-center md:items-start md:flex-row md:gap-6">
            <div className="p-1 bg-white dark:bg-slate-800 rounded-full shadow-lg">
              <img
                src={
                  user?.photoURL ||
                  "https://i.ibb.co/6y4tW6F/default-profile.png"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-slate-800"
              />
            </div>

            <div className="mt-14 md:mt-16 text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                {user?.displayName || "User Name Not Set"}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                <span className="badge badge-primary badge-outline py-3 px-4 gap-2">
                  <FaShieldAlt /> Borrower
                </span>
                <span className="badge badge-ghost py-3 px-4 uppercase select-none pointer-events-none">
                  ID: {user?.uid.slice(0, 8)}
                </span>
              </div>
            </div>
          </div>

          {/* User Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
            <div className="flex items-center gap-4 p-5 bg-gray-50 dark:bg-slate-700/50 rounded-2xl border border-gray-100 dark:border-slate-600">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-full text-primary">
                <FaEnvelope className="text-xl" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">
                  Email Address
                </p>
                <p className="font-semibold text-gray-800 dark:text-white break-all">
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 bg-gray-50 dark:bg-slate-700/50 rounded-2xl border border-gray-100 dark:border-slate-600">
              <div className="w-12 h-12 bg-secondary/10 flex items-center justify-center rounded-full text-secondary">
                <FaCalendarAlt className="text-xl" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">
                  Last Login
                </p>
                <p className="font-semibold text-gray-800 dark:text-white">
                  {user?.metadata?.lastSignInTime
                    ? new Date(user.metadata.lastSignInTime).toLocaleDateString(
                        "en-US",
                        { day: "numeric", month: "long", year: "numeric" }
                      )
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-10 pt-6 border-t border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Account Status:{" "}
              <span className="text-green-500 font-bold bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
                Active
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-ghost text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 gap-2 transition-all"
            >
              <FaSignOutAlt /> Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
