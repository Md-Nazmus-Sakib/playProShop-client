import { Outlet } from "react-router-dom";
import Footer from "../pages/shared/footer/Footer";

import Navbar from "../pages/shared/navbar/Navbar";

const MainLayout = () => {
  return (
    <div className="mx-auto container">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
