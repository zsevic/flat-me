export const initialState = {
  isPushNotificationActivated: false,
  isNotificationActivationDisabled: true,
  apartmentList: [],
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

    case "apartmentListAppend": {
      return {
        ...state,
        apartmentList: [
          ...state.apartmentList,
          ...action.payload.apartmentList,
        ],
      };
    }

    case "apartmentListSet": {
      return {
        ...state,
        apartmentList: action.payload.apartmentList,
      };
    }

    default:
      return state;
  }
};
