import request from "utils/request";

export const verifyFilter = async (token) =>
  request.post(`/filters/verify/${token}`);
