export const initialState = {
  isPushNotificationActivated: false,
  isNotificationActivationDisabled: true,
};

export const AppReducer = (state, action) => {
  switch (action.type) {
    case "initStored": {
      return action.payload;
    }

    case "pushNotificationActivate": {
      return {
        ...state,
        isPushNotificationActivated: true,
      };
    }

    case "notificationActivationUpdate": {
      return {
        ...state,
        isNotificationActivationDisabled: action.payload.isDisabled,
      };
    }

    default:
      return state;
  }
};
