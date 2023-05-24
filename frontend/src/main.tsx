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
          <RequireAuth loginPath="/">
            <ExpiryDates />
          </RequireAuth>,
        ],
      },
      {
        path: "/admin",
        element: <Administration />,
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
