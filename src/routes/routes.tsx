import MainLayout from "@/components/layout/MainLayout";
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
    ],
  },
]);
export default router;
