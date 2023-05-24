import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RequireAuth, AuthProvider } from "react-auth-kit";
import App from "./App";
import { ErrorPage, Home, ExpiryDates, Administration } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home user="user" />,
      },
      {
        path: "/expiry-dates",
        element: [
          <RequireAuth key="/expiry-dates" loginPath="/">
            <ExpiryDates />
          </RequireAuth>,
        ],
      },
      {
        path: "/admin",
        element: [
          <RequireAuth key="/admin" loginPath="/">
            <Administration />
          </RequireAuth>,
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider authType="cookie" authName="_auth" cookieSecure={false}>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
