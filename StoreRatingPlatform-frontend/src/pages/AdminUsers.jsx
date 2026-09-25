import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import UsersTable from "../components/UsersTable.jsx";
import Spinner from "../components/Spinner.jsx";
import { getUsers } from "../api/adminApi.js";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ name: "", email: "", role: "" });
  const [loading, setLoading] = useState(true);

  const loadUsers = async (f = filters) => {
    const res = await getUsers(f);
    setUsers(res.data.data);
  };

  useEffect(() => {
    loadUsers().finally(() => setLoading(false));
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
      <h4 className="mb-4">Users</h4>
      <UsersTable users={users} filters={filters} setFilters={setFilters} onSearch={loadUsers} onUserAdded={loadUsers} />
    </DashboardLayout>
  );
};

export default AdminUsers;