import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import PendingApprovals from "../components/PendingApprovals.jsx";
import Spinner from "../components/Spinner.jsx";
import { getPendingUsers } from "../api/adminApi.js";

const AdminPending = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadPendingUsers = async () => {
    try {
      const res = await getPendingUsers();
      setPendingUsers(res.data.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load pending approvals.");
    }
  };

  useEffect(() => {
    loadPendingUsers().finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <Spinner />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h4 className="mb-4">Pending Approvals</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      <PendingApprovals pendingUsers={pendingUsers} onApproved={loadPendingUsers} />
    </DashboardLayout>
  );
};

export default AdminPending;