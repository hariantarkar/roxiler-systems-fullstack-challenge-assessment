import { useState } from "react";
import { addUser } from "../api/adminApi.js";

const AddUserForm = ({ onAdded, onClose }) => {
  const [form, setForm] = useState({ name: "", email: "", address: "", password: "", role: "normal_user" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await addUser(form);
      onAdded();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add user.");
    }
  };

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <form onSubmit={handleSubmit} className="row g-2">
          <div className="col-md-6">
            <input className="form-control" name="name" placeholder="Name (20-60 chars)" value={form.name} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <input className="form-control" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <input className="form-control" name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <input className="form-control" name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <select className="form-select" name="role" value={form.role} onChange={handleChange}>
              <option value="normal_user">Normal User</option>
              <option value="admin">Admin</option>
              <option value="store_owner">Store Owner</option>
            </select>
          </div>
          <div className="col-12 d-flex gap-2">
            <button type="submit" className="btn btn-primary btn-sm">Save User</button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;