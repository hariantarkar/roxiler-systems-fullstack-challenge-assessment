import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import OwnerDashboard from "./pages/OwnerDashboard.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import Home from "./pages/Home.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";
import AdminStores from "./pages/AdminStores.jsx";
import AdminPending from "./pages/AdminPending.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }/>
      <Route path="/admin/users" element={
        <ProtectedRoute allowedRoles={["admin"]}>
        <AdminUsers /></ProtectedRoute>} />
      <Route path="/admin/stores" element={
        <ProtectedRoute allowedRoles={["admin"]}>
        <AdminStores /></ProtectedRoute>} />
      <Route path="/admin/pending" element={
        <ProtectedRoute allowedRoles={["admin"]}>
        <AdminPending /></ProtectedRoute>} />

      <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute allowedRoles={["normal_user"]}>
            <UserDashboard />
          </ProtectedRoute>
        }/>

      <Route
        path="/owner/dashboard"
        element={
          <ProtectedRoute allowedRoles={["store_owner"]}>
            <OwnerDashboard />
          </ProtectedRoute>
        }/>
      <Route
      path="/change-password"
      element={
       <ProtectedRoute allowedRoles={["admin", "normal_user", "store_owner"]}>
        <ChangePassword />
      </ProtectedRoute>
     }/>
     </Routes>
    
  );
};

export default App;
