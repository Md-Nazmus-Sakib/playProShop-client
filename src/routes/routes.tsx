import MainLayout from "@/components/layout/MainLayout";
import About from "@/components/pages/about/About";
import AllProduct from "@/components/pages/allProduct/allProduct/AllProduct";
import Cart from "@/components/pages/cart/Cart";
import CheckoutForm from "@/components/pages/checkoutForm/CheckoutForm";

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
      {
        path: "checkout",
        element: <CheckoutForm></CheckoutForm>,
      },
      {
        path: "cart",
        element: <Cart></Cart>,
      },
    ],
  },
]);
export default router;
