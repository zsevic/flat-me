import request from "utils/request";

export const subscribeByEmail = async (email) =>
  request.post("/subscriptions", { email });

export const subscribeForNotifications = async (subscription) => {
  const response = await request.post(
    "/subscriptions/notifications/subscribe",
    subscription
  );

  return response.data;
};
