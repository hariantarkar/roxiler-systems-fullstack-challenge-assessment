import { useState } from "react";
import { addStore } from "../api/adminApi.js";

const AddStoreForm = ({ onAdded, onClose }) => {
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await addStore(form);
      onAdded();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add store.");
    }
  };

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <form onSubmit={handleSubmit} className="row g-2">
          <div className="col-md-4">
            <input className="form-control" name="name" placeholder="Store Name (20-60 chars)" value={form.name} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <input className="form-control" name="email" type="email" placeholder="Store Email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <input className="form-control" name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
          </div>
          <div className="col-12 d-flex gap-2">
            <button type="submit" className="btn btn-primary btn-sm">Save Store</button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStoreForm;
