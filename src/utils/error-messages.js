import {
  defaultNotificationsErrorMessage,
  notificationsBlockedErrorMessage,
  tooManyRequestsErrorMessage,
  unsupportedBrowserErrorMessage,
} from "constants/error-messages";
import { TOO_MANY_REQUESTS_STATUS_CODE } from "constants/status-codes";

export const getErrorMessageForPushNotifications = (error) => {
  if (
    error.code === "messaging/permission-blocked" &&
    error.name === "FirebaseError"
  ) {
    return notificationsBlockedErrorMessage;
  }

  if (
    error.code === "messaging/unsupported-browser" &&
    error.name === "FirebaseError"
  ) {
    return unsupportedBrowserErrorMessage;
  }

  const errorMessages = {
    [TOO_MANY_REQUESTS_STATUS_CODE]: tooManyRequestsErrorMessage,
    422: "Pretraga sa izabranim filterima je već uključena",
  };
  console.error(error);
  return (
    errorMessages[error?.response?.status] || defaultNotificationsErrorMessage
  );
};
