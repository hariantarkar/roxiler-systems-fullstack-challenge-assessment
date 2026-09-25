import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
      <div className="mobile-topbar">
        <button className="btn btn-sm btn-outline-light me-3" onClick={() => setIsSidebarOpen(true)}>
          <i className="bi bi-list"></i>
        </button>
        <span>Store Rating Platform</span>
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="main-content">{children}</main>
    </div>
  );
};

export default DashboardLayout;