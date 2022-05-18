import {
  defaultNotificationsBlockedErrorMessage,
  notificationsBlockedErrorMessage,
} from "constants/error-messages";

export const getErrorMessageForBlockedNotifications = (error) => {
  if (
    error.code === "messaging/permission-blocked" &&
    error.name === "FirebaseError"
  ) {
    return notificationsBlockedErrorMessage;
  }

  console.error(error);
  return defaultNotificationsBlockedErrorMessage;
};
