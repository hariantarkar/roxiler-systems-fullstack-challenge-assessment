import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import StoresTable from "../components/StoresTable.jsx";
import Spinner from "../components/Spinner.jsx";
import { getStores } from "../api/adminApi.js";

const AdminStores = () => {
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({ name: "", address: "" });
  const [loading, setLoading] = useState(true);

  const loadStores = async (f = filters) => {
    const res = await getStores(f);
    setStores(res.data.data);
  };

  useEffect(() => {
    loadStores().finally(() => setLoading(false));
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
      <h4 className="mb-4">Stores</h4>
      <StoresTable stores={stores} filters={filters} setFilters={setFilters} onSearch={loadStores} onStoreAdded={loadStores} />
    </DashboardLayout>
  );
};

export default AdminStores;

