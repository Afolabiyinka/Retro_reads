import { Outlet } from "react-router-dom";
import NavBar from "./nav/NavBar";
import Footer from "./nav/footer";

const Layout = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
