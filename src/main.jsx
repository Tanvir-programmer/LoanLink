import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import { router } from "./routes/Root";
import AuthProvider from "./context/AuthProvider";
// 1. Import the necessary components from react-query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 2. Create an instance of the Query Client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 3. Wrap everything with the QueryClientProvider */}
    <QueryClientProvider client={queryClient}>
      {" "}
      <AuthProvider>
        <RouterProvider router={router} />{" "}
      </AuthProvider>
    </QueryClientProvider>{" "}
  </React.StrictMode>
);
