import { Outlet } from "react-router-dom";
import NavBar from "./nav/NavBar";

const Layout = () => {
  return (
    <div className="flex justify-center">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Layout;
