import MainLayout from "@/components/layout/MainLayout";
import About from "@/components/pages/about/About";

import CreateProduct from "@/components/pages/createProduct/CreateProduct";
import Home from "@/components/pages/home/home/Home";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About></About>,
      },
      {
        path: "create-product",
        element: <CreateProduct></CreateProduct>,
      },
    ],
  },
]);
export default router;
