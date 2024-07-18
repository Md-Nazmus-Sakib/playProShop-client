import MainLayout from "@/components/layout/MainLayout";
import About from "@/components/pages/about/About";
import AllProduct from "@/components/pages/allProduct/allProduct/AllProduct";

import CreateProduct from "@/components/pages/createProduct/CreateProduct";
import Home from "@/components/pages/home/home/Home";
import SingleProductDetails from "@/components/pages/singleProductDetails/SingleProductDetails";
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
      {
        path: "product",
        element: <AllProduct></AllProduct>,
      },
      {
        path: "product/:id",
        element: <SingleProductDetails></SingleProductDetails>,
      },
    ],
  },
]);
export default router;
