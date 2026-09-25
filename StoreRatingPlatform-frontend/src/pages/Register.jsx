import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance.js";

const roleLabels = {
  normal_user: "Normal User",
  store_owner: "Store Owner",
  admin: "Admin",
};

const Register = () => {
  const [searchParams] = useSearchParams();
  const role = roleLabels[searchParams.get("role")] ? searchParams.get("role") : "normal_user";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await axiosInstance.post("/auth/register", { name, email, address, password, role });
      setSuccess(res.data.message);
      if (res.data.status) {
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="card auth-card shadow-sm">
      <div className="card-body">
        <h3 className="card-title mb-1 text-center">Register</h3>
        <p className="text-center text-muted mb-4">
          Registering as <strong>{roleLabels[role]}</strong>
        </p>

        {error && <div className="alert alert-danger py-2">{error}</div>}
        {success && <div className="alert alert-success py-2">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} minLength={20} maxLength={60} required />
            <div className="form-text">20-60 characters</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} maxLength={400} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} maxLength={16} required />
            <div className="form-text">8-16 characters, one uppercase letter, one special character</div>
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;