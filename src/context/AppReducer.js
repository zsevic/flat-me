export const initialState = {
  isInitialSearchDone: false,
  isLoadingApartmentList: false,
  isLoadingFoundApartmentList: true,
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

    case "apartmentListLoadingSet": {
      return {
        ...state,
        isLoadingApartmentList: action.payload.isLoadingApartmentList,
      };
    }

    case "foundApartmentListLoadingSet": {
      return {
        ...state,
        isLoadingFoundApartmentList: action.payload.isLoadingFoundApartmentList,
      };
    }

    case "initialSearchDone": {
      return {
        ...state,
        isInitialSearchDone: true,
      };
    }

    default:
      return state;
  }
};
