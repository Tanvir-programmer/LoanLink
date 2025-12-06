import { createBrowserRouter } from "react-router";
import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import About from "../components/About";
import Contact from "../components/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";

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
        element: <Contact></Contact>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
]);
