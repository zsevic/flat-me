import request from "utils/request";

export const subscribeByEmail = async (email) =>
  request.post("/subscriptions", { email });

export const subscribeForNotifications = async (subscription) =>
  request.post("/subscriptions/notifications/subscribe", subscription);
