import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((previousValue) => !previousValue);
  };

  return (
    <div
      className={`dashboard-layout ${
        sidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      <div className="dashboard-sidebar-wrapper">
        <Sidebar />
      </div>

      <div className="dashboard-main">
        <Topbar onMenuClick={toggleSidebar} />

        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;