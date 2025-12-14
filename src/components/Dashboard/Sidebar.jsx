import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router";
import {
  FaUser,
  FaFileInvoiceDollar,
  FaPlusCircle,
  FaUsers,
  FaHome,
} from "react-icons/fa";
import { MdManageAccounts, MdOutlinePendingActions } from "react-icons/md";
import { FcApprove } from "react-icons/fc";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext"; // Ensure path is correct

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user?.email) {
        try {
          setLoading(true); // Ensure loading starts when a new email is detected

          // 1. Updated the URL to match your backend route: /user/role/:email
          // 2. Used the VITE_API_URL variable for better flexibility
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/user/role/${user.email}`
          );

          // Since the backend returns { role: "borrower" },
          // response.data.role will correctly extract just the string.
          if (response.data && response.data.role) {
            setRole(response.data.role);
          }
        } catch (error) {
          console.error("Error fetching role:", error);
          setRole(null); // Reset role on error
        } finally {
          setLoading(false);
        }
      } else {
        // If there is no user email (logged out), reset the role and loading
        setRole(null);
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user?.email]);

  // Show a small loader inside sidebar if role is still fetching
  if (loading) {
    return (
      <div className="w-64 min-h-screen bg-slate-900 text-white p-5 flex flex-col items-center">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white p-5">
      <h2 className="text-2xl font-bold mb-8 text-primary">
        <NavLink to="/">LoanLink</NavLink>
      </h2>

      <nav className="flex flex-col gap-4">
        {/* Common for all logged-in users */}
        <NavLink to="/dashboard/profile" className="flex items-center gap-2">
          <FaUser /> My Profile
        </NavLink>

        {/* Admin Links */}
        {role === "admin" && (
          <>
            <NavLink
              to="/dashboard/manage-users"
              className="flex items-center gap-2"
            >
              <FaUsers /> Manage Users
            </NavLink>
            <NavLink
              to="/dashboard/all-loan"
              className="flex items-center gap-2"
            >
              <FaFileInvoiceDollar /> All Loans
            </NavLink>
            <NavLink
              to="/dashboard/loan-applications"
              className="flex items-center gap-2"
            >
              Loan Applications
            </NavLink>
          </>
        )}

        {/* Manager Links */}
        {role === "manager" && (
          <>
            <NavLink
              to="/dashboard/add-loan"
              className="flex items-center gap-2"
            >
              <FaPlusCircle /> Add Loan
            </NavLink>
            <NavLink
              to="/dashboard/manage-loans"
              className="flex items-center gap-2"
            >
              <MdManageAccounts />
              Manage My Loans
            </NavLink>
            <NavLink
              to="/dashboard/pending-loans"
              className="flex items-center gap-2"
            >
              <MdOutlinePendingActions />
              Pending Applications
            </NavLink>
            <NavLink
              to="/dashboard/approved-loans"
              className="flex items-center gap-2"
            >
              <FcApprove />
              Approved Applications
            </NavLink>
          </>
        )}

        {/* Borrower Links */}
        {role === "borrower" && (
          <>
            <NavLink
              to="/dashboard/my-loans"
              className="flex items-center gap-2"
            >
              <FaFileInvoiceDollar /> My Applied Loans
            </NavLink>
          </>
        )}

        <hr className="my-4 border-slate-700" />
        <NavLink to="/" className="flex items-center gap-2">
          <FaHome /> Back to Home
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
