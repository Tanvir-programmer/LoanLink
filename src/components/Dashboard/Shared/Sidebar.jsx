import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router";
import {
  FaUser,
  FaFileInvoiceDollar,
  FaPlusCircle,
  FaUsers,
  FaHome,
  FaBars,
  FaTimes,
  FaChevronRight,
} from "react-icons/fa";
import {
  MdManageAccounts,
  MdOutlinePendingActions,
  MdSettingsApplications,
} from "react-icons/md";
import { FcApprove } from "react-icons/fc";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user?.email) {
        try {
          setLoading(true);
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/user/role/${user.email}`
          );
          if (response.data?.role) setRole(response.data.role);
        } catch (error) {
          console.error("Error fetching role:", error);
          setRole(null);
        } finally {
          setLoading(false);
        }
      } else {
        setRole(null);
        setLoading(false);
      }
    };
    fetchUserRole();
  }, [user?.email]);

  const linkClass = ({ isActive }) =>
    `flex items-center justify-between group px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    }`;

  if (loading) {
    return (
      <div className="w-64 min-h-screen bg-[#0f172a] flex items-center justify-center">
        <span className="loading loading-spinner text-blue-500"></span>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 flex items-center justify-between bg-[#0f172a] px-6 py-4 border-b border-slate-800">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          LoanLink
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar Container - FIXED h-full for big screens */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-[#0f172a] border-r border-slate-800 flex flex-col z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo Section */}
        <div className="p-8 hidden lg:block">
          <NavLink
            to="/"
            className="group flex items-center gap-3 no-underline transition-all duration-300"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
              <div className="absolute inset-0 rounded-xl border border-white/20"></div>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="h-5 w-5 text-white"
              >
                <path
                  d="M12 2v20M17 5H9.5a4.5 4.5 0 100 9h5a4.5 4.5 0 110 9H6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="flex flex-col leading-tight">
              <span className="text-xl font-black tracking-tight text-white lg:text-2xl">
                Loan
                <span className="text-blue-400 group-hover:text-blue-300 transition-colors">
                  Link
                </span>
              </span>
            </div>
          </NavLink>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 mt-4">
            General
          </p>
          <NavLink
            to="/dashboard/profile"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center gap-3">
              <FaUser className="text-lg" /> <span>My Profile</span>
            </div>
            <FaChevronRight className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity" />
          </NavLink>

          {role && (
            <>
              <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 mt-6">
                {role} Menu
              </p>

              {role === "admin" && (
                <div className="space-y-1">
                  <NavLink
                    to="/dashboard/manage-users"
                    className={linkClass}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <FaUsers /> <span>Manage Users</span>
                    </div>
                  </NavLink>
                  <NavLink
                    to="/dashboard/all-loan"
                    className={linkClass}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <FaFileInvoiceDollar /> <span>All Loans</span>
                    </div>
                  </NavLink>
                  <NavLink
                    to="/dashboard/loan-applications"
                    className={linkClass}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <MdSettingsApplications /> <span>Applications</span>
                    </div>
                  </NavLink>
                </div>
              )}

              {role === "manager" && (
                <div className="space-y-1">
                  <NavLink
                    to="/dashboard/add-loan"
                    className={linkClass}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <FaPlusCircle /> <span>Add Loan</span>
                    </div>
                  </NavLink>
                  <NavLink
                    to="/dashboard/manage-loans"
                    className={linkClass}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <MdManageAccounts /> <span>Manage My Loans</span>
                    </div>
                  </NavLink>
                  <NavLink
                    to="/dashboard/pending-loans"
                    className={linkClass}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <MdOutlinePendingActions /> <span>Pending</span>
                    </div>
                  </NavLink>
                  <NavLink
                    to="/dashboard/approved-loans"
                    className={linkClass}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <FcApprove /> <span>Approved History</span>
                    </div>
                  </NavLink>
                </div>
              )}

              {role === "borrower" && (
                <NavLink
                  to="/dashboard/my-loans"
                  className={linkClass}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <FaFileInvoiceDollar /> <span>My Applied Loans</span>
                  </div>
                </NavLink>
              )}
            </>
          )}

          <div className="pt-6">
            <hr className="border-slate-800" />
            <NavLink
              to="/"
              className={`${linkClass({ isActive: false })} mt-4`}
            >
              <div className="flex items-center gap-3 text-slate-400 hover:text-white">
                <FaHome /> <span>Back to Home</span>
              </div>
            </NavLink>
          </div>
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-2 py-3 rounded-xl bg-slate-800/50">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
              {user?.displayName?.charAt(0) ||
                user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold text-white truncate">
                {user?.displayName || "User"}
              </p>
              <p className="text-[10px] text-slate-500 truncate capitalize">
                {role}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
