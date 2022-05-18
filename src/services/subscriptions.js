import request from "utils/request";

export const subscribeByEmail = async (email) =>
  request.post("/subscriptions", { email });

export const subscribeForPushNotifications = async (subscription) => {
  const response = await request.post(
    "/subscriptions/notifications/subscribe",
    subscription
  );

  return response.data;
};

export const unsubscribeFromPushNotifications = async (subscription) =>
  request.post("/subscriptions/notifications/unsubscribe", subscription);
