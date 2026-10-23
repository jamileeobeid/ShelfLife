import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import "./Layout.css";

function Layout() {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
