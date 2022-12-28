import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Main from "./views/Main";
import Join from "./views/Join";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/join" />
  },
  {
    path: "/join",
    element: <Join />
  },
  {
    path: "/main",
    element: <Main />
  }
]);

export default router;
