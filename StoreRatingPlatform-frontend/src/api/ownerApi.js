import axiosInstance from "./axiosInstance.js";

export const getOwnerDashboard = () => axiosInstance.get("/owner/dashboard");