import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import StatCard from "../components/StatCard.jsx";
import { getOwnerDashboard } from "../api/ownerApi.js";

const OwnerDashboard = () => {
  const [storeName, setStoreName] = useState("");
  const [averageRating, setAverageRating] = useState(null);
  const [raters, setRaters] = useState([]);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      const res = await getOwnerDashboard();
      const { storeName, averageRating, raters } = res.data.data;
      setStoreName(storeName);
      setAverageRating(averageRating);
      setRaters(raters);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load dashboard.");
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (error) {
    return (
      <DashboardLayout>
        <div className="alert alert-warning">{error}</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h4 className="mb-4">{storeName || "Owner Dashboard"}</h4>

      <div className="row mb-4">
        <StatCard label="Average Rating" value={averageRating ?? "No ratings yet"} />
        <StatCard label="Total Raters" value={raters.length} />
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">Users Who Rated Your Store</h5>
          <div className="table-responsive">
            <table className="table table-sm table-hover align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {raters.map((r) => (
                  <tr key={r.uid}>
                    <td>{r.name}</td>
                    <td>{r.email}</td>
                    <td>{r.rating}</td>
                  </tr>
                ))}
                {raters.length === 0 && (
                  <tr><td colSpan="3" className="text-center text-muted">No ratings yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OwnerDashboard;
