import { useState } from "react";
import AddStoreForm from "./AddStoreForm.jsx";
import EditStoreForm from "./EditStoreForm.jsx";

const StoresTable = ({ stores, filters, setFilters, onSearch, onStoreAdded }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStore, setEditingStore] = useState(null);

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
          <h5 className="mb-0">Stores</h5>
          <button className="btn btn-primary btn-sm" onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? "Close" : "+ Add Store"}
          </button>
        </div>

        {showAddForm && <AddStoreForm onAdded={onStoreAdded} onClose={() => setShowAddForm(false)} />}

        {editingStore && (
          <EditStoreForm store={editingStore} onUpdated={onStoreAdded} onClose={() => setEditingStore(null)} />
        )}

        <div className="row g-2 mb-3">
          <div className="col-md-4">
            <input className="form-control form-control-sm" name="name" placeholder="Filter by name" value={filters.name} onChange={handleFilterChange} />
          </div>
          <div className="col-md-4">
            <input className="form-control form-control-sm" name="address" placeholder="Filter by address" value={filters.address} onChange={handleFilterChange} />
          </div>
          <div className="col-md-4">
            <button className="btn btn-outline-primary btn-sm w-100" onClick={() => onSearch(filters)}>Search</button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-sm table-hover align-middle">
            <thead>
              <tr>
                <th role="button" onClick={() => handleSort("name")}>Name</th>
                <th>Email</th>
                <th role="button" onClick={() => handleSort("address")}>Address</th>
                <th>Owner</th>
                <th role="button" onClick={() => handleSort("overallRating")}>Rating</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {stores.map((s) => (
                <tr key={s.sid}>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.address}</td>
                  <td>{s.owner_uid ? <span className="badge bg-success-subtle text-success">Assigned</span> : <span className="badge bg-secondary-subtle text-secondary">No owner</span>}</td>
                  <td>{s.overallRating ?? "No ratings yet"}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary" onClick={() => setEditingStore(s)}>Edit</button>
                  </td>
                </tr>
              ))}
              {stores.length === 0 && (
                <tr><td colSpan="6" className="text-center text-muted">No stores found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StoresTable;