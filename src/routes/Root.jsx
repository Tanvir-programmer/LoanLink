import { createBrowserRouter } from "react-router";
import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import About from "../components/About";

import Login from "../pages/Login";
import Register from "../pages/Register";
import AllLoan from "../components/allLoans/AllLoan";
import LoanDetails from "../components/LoanDetails/LoanDetails";
import PrivateRoute from "./PrivateRoute";
import ContactUs from "../components/ContactUs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
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
            <LoanDetails></LoanDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
