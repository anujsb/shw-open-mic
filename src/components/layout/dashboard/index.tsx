import React, { useState } from "react";
import SideBar from "~/components/Sidebar";
import Navbar from "~/components/Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  return (
    <div className="flex h-screen bg-white">
      <SideBar isCollapsed={!sidebarOpen} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-100">
          <div className="mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
