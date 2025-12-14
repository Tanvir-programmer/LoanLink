import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";

const ManagerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // 1. Show a loading spinner during API calls and data fetching (Requirement: Additional)
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );
  }

  // 2. Check if user exists and if the role is 'manager'
  // Note: 'user.role' comes from the manual state update we fixed in your Registration/Login
  if (user && user.role === "manager") {
    return children;
  }

  // 3. If not a manager, redirect to login or home
  // We send them to login but save the 'from' location so they can return if they log in as manager
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ManagerRoute;
