import MainLayout from "@/components/layout/MainLayout";
import About from "@/components/pages/about/About";
import AllProduct from "@/components/pages/allProduct/allProduct/AllProduct";
import Cart from "@/components/pages/cart/Cart";
import CategoryProduct from "@/components/pages/categoryProduct/CategoryProduct";
import CheckoutForm from "@/components/pages/checkoutForm/CheckoutForm";
import ConfirmOrder from "@/components/pages/confirmOrder/ConfirmOrder";

import CreateProduct from "@/components/pages/createProduct/CreateProduct";
import Home from "@/components/pages/home/home/Home";
import ManageProduct from "@/components/pages/manageProduct/ManageProduct";
import NotFound from "@/components/pages/notFound/NotFound";
import PaymentPage from "@/components/pages/payment/PaymentPage";
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
        path: "category",
        element: <CategoryProduct></CategoryProduct>,
      },
      {
        path: "checkout",
        element: <CheckoutForm></CheckoutForm>,
      },
      {
        path: "order-confirmation",
        element: <ConfirmOrder></ConfirmOrder>,
      },
      {
        path: "cart",
        element: <Cart></Cart>,
      },
      {
        path: "payment",
        element: <PaymentPage></PaymentPage>,
      },
      {
        path: "manage-product",
        element: <ManageProduct></ManageProduct>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);
export default router;
