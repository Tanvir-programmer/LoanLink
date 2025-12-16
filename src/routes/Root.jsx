import { createBrowserRouter } from "react-router";
import Layout from "../layouts/Layout";

import About from "../components/About";
import Home from "../pages/Home/home-components/Home";
import Login from "../pages/login/Login";
import Register from "../pages/Register";
import AllLoan from "../components/allLoans/AllLoan";
import LoanDetails from "../components/LoanDetails/LoanDetails";
import PrivateRoute from "./PrivateRoute";
import ContactUs from "../components/ContactUs";
import LoanApply from "../pages/loanApply/LoanApply";
import ErrorPage from "../components/ErrorPage";
import DashboardLayout from "../layouts/DashBoardLayout";
import MyProfile from "../components/Dashboard/Shared/MyProfile";
import AddLoanForManagers from "../components/Dashboard/Shared/AddLoan/AddLoanForManagers";
import ManageLoans from "../components/Dashboard/Managers/ManageMyLoan/ManageMyLoans";
import UpdateLoans from "../components/Dashboard/Managers/updateLoans/UpdateLoans";
import PendingApplications from "../components/Dashboard/Shared/PendingApplicatons";
import ApprovedApplications from "../components/Dashboard/Shared/ApprovedApplications";

import LoanApplications from "../components/Dashboard/Admin/LoanApplications";
import MyAppliedLoans from "../components/Dashboard/Users/MyAppliedLoans";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <ErrorPage></ErrorPage>,

    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "about",
        element: <About></About>,
      },
      {
        path: "contact",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "allloans",
        element: <AllLoan></AllLoan>,
      },
      {
        path: "loan-details/:id",
        element: (
          <PrivateRoute>
            <LoanDetails></LoanDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "loan-application/:id",
        element: (
          <PrivateRoute>
            <LoanApply></LoanApply>
          </PrivateRoute>
        ),
      },
      {
        path: "loan-application",
        element: (
          <PrivateRoute>
            <LoanApply></LoanApply>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/profile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/add-loan",
        element: (
          <PrivateRoute>
            <AddLoanForManagers></AddLoanForManagers>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-loans",
        element: (
          <PrivateRoute>
            <ManageLoans></ManageLoans>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/update-loan/:id",
        element: (
          <PrivateRoute>
            <UpdateLoans></UpdateLoans>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/pending-loans",
        element: (
          <PrivateRoute>
            <PendingApplications></PendingApplications>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/approved-loans",
        element: (
          <PrivateRoute>
            <ApprovedApplications />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/all-loan",
        element: (
          <PrivateRoute>
            <AllLoan></AllLoan>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/loan-applications",
        element: (
          <PrivateRoute>
            <LoanApplications />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-loans",
        element: (
          <PrivateRoute>
            <MyAppliedLoans />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
