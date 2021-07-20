import request from "utils/request";

export const deactivateFilter = async (token) =>
  request.post(`/filters/deactivate/${token}`);

export const saveFilter = async (filter) => request.post("/filters", filter);

export const verifyFilter = async (token) =>
  request.post(`/filters/verify/${token}`);
