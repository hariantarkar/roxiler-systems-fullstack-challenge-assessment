import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import StoreCard from "../components/StoreCard.jsx";
import { getStoresForUser } from "../api/userApi.js";

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({ name: "", address: "" });

  const loadStores = async (f = filters) => {
    const res = await getStoresForUser(f);
    setStores(res.data.data);
  };

  useEffect(() => {
    loadStores();
  }, []);

  const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  return (
    <DashboardLayout>
      <h4 className="mb-4">Browse Stores</h4>

      <div className="row g-2 mb-4">
        <div className="col-md-4">
          <input className="form-control" name="name" placeholder="Search by store name" value={filters.name} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <input className="form-control" name="address" placeholder="Search by address" value={filters.address} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <button className="btn btn-outline-primary w-100" onClick={() => loadStores(filters)}>Search</button>
        </div>
      </div>

      <div className="row">
        {stores.map((store) => (
          <StoreCard key={store.sid} store={store} onRated={loadStores} />
        ))}
        {stores.length === 0 && <p className="text-muted">No stores found</p>}
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
