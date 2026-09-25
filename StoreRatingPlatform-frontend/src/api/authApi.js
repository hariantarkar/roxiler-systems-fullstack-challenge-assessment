import axiosInstance from "./axiosInstance.js";

export const updatePassword = (data) => axiosInstance.put("/auth/update-password", data);
