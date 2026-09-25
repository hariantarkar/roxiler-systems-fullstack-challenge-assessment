import { useEffect, useState } from "react";
import { updateStore, getUsers } from "../api/adminApi.js";

const EditStoreForm = ({ store, onUpdated, onClose }) => {
  const [form, setForm] = useState({
    name: store.name,
    email: store.email || "",
    address: store.address,
    ownerUid: store.owner_uid || "",
  });
  const [owners, setOwners] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getUsers({ role: "store_owner" }).then((res) => setOwners(res.data.data));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await updateStore(store.sid, form);
      onUpdated();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update store.");
    }
  };

  return (
    <div className="card shadow-sm mb-3 border-primary">
      <div className="card-body">
        <h6 className="mb-3">Editing: {store.name}</h6>
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <form onSubmit={handleSubmit} className="row g-2">
          <div className="col-md-4">
            <input className="form-control" name="name" placeholder="Store Name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <input className="form-control" name="email" type="email" placeholder="Store Email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <input className="form-control" name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <select className="form-select" name="ownerUid" value={form.ownerUid} onChange={handleChange}>
              <option value="">No owner</option>
              {owners.map((o) => (
                <option key={o.uid} value={o.uid}>{o.name} ({o.email})</option>
              ))}
            </select>
          </div>
          <div className="col-12 d-flex gap-2">
            <button type="submit" className="btn btn-primary btn-sm">Save Changes</button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStoreForm;
