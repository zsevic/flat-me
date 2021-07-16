import request from "utils/request";

export const saveFilter = async (filter) => request.post("/filters", filter);

export const verifyFilter = async (token) =>
  request.post(`/filters/verify/${token}`);
