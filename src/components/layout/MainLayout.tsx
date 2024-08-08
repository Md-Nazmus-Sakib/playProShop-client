import { Outlet } from "react-router-dom";
import Footer from "../pages/shared/footer/Footer";

import Navbar from "../pages/shared/navbar/Navbar";

const MainLayout = () => {
  return (
    <div className="mx-auto max-w-[1440px]">
      <div className="sticky top-0 z-50">
        <Navbar></Navbar>
      </div>
      <div className="min-h-screen">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
