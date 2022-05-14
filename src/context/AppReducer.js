export const initialState = {
  isPushNotificationActivated: false,
  isNotificationActivationDisabled: true,
  apartmentList: [],
  foundApartmentList: [],
  accessToken: null,
  filters: {},
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

    case "accessTokenSet": {
      return {
        ...state,
        accessToken: action.payload.accessToken,
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

    case "foundApartmentListAppend": {
      return {
        ...state,
        foundApartmentList: [
          ...state.foundApartmentList,
          ...action.payload.foundApartmentList,
        ],
      };
    }

    case "foundApartmentListSet": {
      return {
        ...state,
        foundApartmentList: action.payload.foundApartmentList,
      };
    }

    case "filtersSet": {
      return {
        ...state,
        filters: action.payload.filters,
      };
    }

    default:
      return state;
  }
};
