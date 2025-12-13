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
import MyProfile from "../components/Dashboard/MyProfile";

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
      { path: "/dashboard/profile", element: <MyProfile></MyProfile> },
    ],
  },
]);
