import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
function Layout() {
  return (
    <>
      <Navbar />
      <div className="app-container">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
