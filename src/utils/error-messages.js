import {
  defaultNotificationsBlockedErrorMessage,
  notificationsBlockedErrorMessage,
  tooManyRequestsErrorMessage,
} from "constants/error-messages";
import { TOO_MANY_REQUESTS_STATUS_CODE } from "constants/status-codes";

export const getErrorMessageForBlockedNotifications = (error) => {
  const errorMessages = {
    [TOO_MANY_REQUESTS_STATUS_CODE]: tooManyRequestsErrorMessage,
  };
  if (
    error.code === "messaging/permission-blocked" &&
    error.name === "FirebaseError"
  ) {
    return notificationsBlockedErrorMessage;
  }

  console.error(error);
  return (
    errorMessages[error?.response?.status] ||
    defaultNotificationsBlockedErrorMessage
  );
};
