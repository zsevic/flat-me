export const initialState = {
  isPushNotificationActivated: false,
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

    default:
      return state;
  }
};
