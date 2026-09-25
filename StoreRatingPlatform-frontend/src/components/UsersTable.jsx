import { useState } from "react";
import AddUserForm from "./AddUserForm.jsx";

const UsersTable = ({ users, filters, setFilters, onSearch, onUserAdded }) => {
  const [showForm, setShowForm] = useState(false);

  const handleFilterChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  const handleSort = (column) => {
    const nextOrder = filters.sortBy === column && filters.order === "asc" ? "desc" : "asc";
    setFilters({ ...filters, sortBy: column, order: nextOrder });
    onSearch({ ...filters, sortBy: column, order: nextOrder });
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Users</h5>
          <button className="btn btn-primary btn-sm" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Close" : "+ Add User"}
          </button>
        </div>

        {showForm && <AddUserForm onAdded={onUserAdded} onClose={() => setShowForm(false)} />}

        <div className="row g-2 mb-3">
          <div className="col-md-3">
            <input className="form-control form-control-sm" name="name" placeholder="Filter by name" value={filters.name} onChange={handleFilterChange} />
          </div>
          <div className="col-md-3">
            <input className="form-control form-control-sm" name="email" placeholder="Filter by email" value={filters.email} onChange={handleFilterChange} />
          </div>
          <div className="col-md-3">
            <select className="form-select form-select-sm" name="role" value={filters.role} onChange={handleFilterChange}>
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="normal_user">Normal User</option>
              <option value="store_owner">Store Owner</option>
            </select>
          </div>
          <div className="col-md-3">
            <button className="btn btn-outline-primary btn-sm w-100" onClick={() => onSearch(filters)}>Search</button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-sm table-hover align-middle">
            <thead>
              <tr>
                <th role="button" onClick={() => handleSort("name")}>Name</th>
                <th role="button" onClick={() => handleSort("email")}>Email</th>
                <th role="button" onClick={() => handleSort("address")}>Address</th>
                <th role="button" onClick={() => handleSort("role")}>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.uid}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.address}</td>
                  <td className="text-capitalize">{u.role.replace("_", " ")}</td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr><td colSpan="4" className="text-center text-muted">No users found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;