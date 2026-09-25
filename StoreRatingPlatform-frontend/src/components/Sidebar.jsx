import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./Sidebar.css";

const navItemsByRole = {
  admin: [
    { label: "Dashboard", path: "/admin/dashboard", icon: "bi-speedometer2" },
    { label: "Users", path: "/admin/users", icon: "bi-people" },
    { label: "Stores", path: "/admin/stores", icon: "bi-shop" },
    { label: "Pending Approvals", path: "/admin/pending", icon: "bi-hourglass-split" },
    { label: "Change Password", path: "/change-password", icon: "bi-key" },
  ],
  normal_user: [
    { label: "Browse Stores", path: "/user/dashboard", icon: "bi-shop" },
    { label: "Change Password", path: "/change-password", icon: "bi-key" },
  ],
  store_owner: [
    { label: "Dashboard", path: "/owner/dashboard", icon: "bi-speedometer2" },
    { label: "Change Password", path: "/change-password", icon: "bi-key" },
  ],
};

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navItems = navItemsByRole[user?.role] || [];

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  return (
    <>
      {isOpen && <div className="sidebar-backdrop d-md-none" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <h5 className="mb-0 text-white">Store Rating</h5>
          <small className="text-secondary">Platform</small>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
              onClick={onClose}
            >
              <i className={`bi ${item.icon} me-2`}></i>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <small className="text-secondary d-block">Logged in as</small>
          <span className="text-white fw-bold d-block">{user?.name}</span>
          <small className="text-secondary text-capitalize d-block mb-2">
            {user?.role?.replace("_", " ")}
          </small>
          <button className="btn btn-sm btn-outline-danger w-100" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-1"></i> Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;