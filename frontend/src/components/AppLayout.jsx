import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const AppLayout = () => (
  <div className="flex bg-gray-50 dark:bg-gray-950 min-h-screen">
    <Sidebar />
    <div className="flex-1 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-6 page-enter">
        <Outlet />
      </main>
      <Footer />
    </div>
  </div>
);

export default AppLayout;