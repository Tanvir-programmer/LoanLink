import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import { router } from "./routes/Root";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
