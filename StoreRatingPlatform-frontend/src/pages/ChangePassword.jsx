import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import { updatePassword } from "../api/authApi.js";

const ChangePassword = () => {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await updatePassword(form);
      setMessage("Password updated successfully.");
      setForm({ oldPassword: "", newPassword: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update password.");
    }
  };

  return (
    <DashboardLayout>
      <h4 className="mb-4">Change Password</h4>
      <div className="card shadow-sm" style={{ maxWidth: 420 }}>
        <div className="card-body">
          {error && <div className="alert alert-danger py-2">{error}</div>}
          {message && <div className="alert alert-success py-2">{message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Old Password</label>
              <input type="password" className="form-control" name="oldPassword" value={form.oldPassword} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input type="password" className="form-control" name="newPassword" value={form.newPassword} onChange={handleChange} minLength={8} maxLength={16} required />
              <div className="form-text">8-16 characters, one uppercase letter, one special character</div>
            </div>
            <button type="submit" className="btn btn-primary w-100">Update Password</button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChangePassword;
