import request from "utils/request";

export const subscribeByEmail = async (email) =>
  request.post("/subscriptions", { email });
