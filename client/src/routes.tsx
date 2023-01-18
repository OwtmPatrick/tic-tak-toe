import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Navigation } from "./constants/navigation";

import Main from "./views/Main";
import Join from "./views/Join";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={Navigation.JOIN} />
  },
  {
    path: Navigation.JOIN,
    element: <Join />
  },
  {
    path: Navigation.MAIN,
    element: <Main />
  }
]);

export default router;
