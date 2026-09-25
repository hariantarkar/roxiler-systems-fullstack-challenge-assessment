import axiosInstance from "./axiosInstance.js";

export const getDashboardStats = () => axiosInstance.get("/admin/dashboard");
export const getUsers = (params) => axiosInstance.get("/admin/users", { params });
export const addUser = (data) => axiosInstance.post("/admin/users", data);
export const getStores = (params) => axiosInstance.get("/admin/stores", { params });
export const addStore = (data) => axiosInstance.post("/admin/stores", data);

export const getPendingUsers = () => axiosInstance.get("/admin/users/pending");
export const approveUser = (uid) => axiosInstance.put(`/admin/users/${uid}/approve`);
export const updateStore = (sid, data) => axiosInstance.put(`/admin/stores/${sid}`, data);