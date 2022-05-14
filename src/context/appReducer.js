import {
  ACTIVATE_PUSH_NOTIFICATIONS,
  APPEND_APARTMENT_LIST,
  APPEND_FOUND_APARTMENT_LIST,
  INITIALIZE_STORE,
  INITIAL_SEARCH,
  SET_ACCESS_TOKEN,
  SET_APARTMENT_LIST,
  SET_FILTERS,
  SET_FOUND_APARTMENT_LIST,
} from "./constants";

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

export const appReducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE_STORE: {
      return action.payload;
    }

    case ACTIVATE_PUSH_NOTIFICATIONS: {
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

    case SET_ACCESS_TOKEN: {
      return {
        ...state,
        accessToken: action.payload.accessToken,
      };
    }

    case APPEND_APARTMENT_LIST: {
      return {
        ...state,
        apartmentList: [
          ...state.apartmentList,
          ...action.payload.apartmentList,
        ],
      };
    }

    case SET_APARTMENT_LIST: {
      return {
        ...state,
        apartmentList: action.payload.apartmentList,
      };
    }

    case APPEND_FOUND_APARTMENT_LIST: {
      return {
        ...state,
        foundApartmentList: [
          ...state.foundApartmentList,
          ...action.payload.foundApartmentList,
        ],
      };
    }

    case SET_FOUND_APARTMENT_LIST: {
      return {
        ...state,
        foundApartmentList: action.payload.foundApartmentList,
      };
    }

    case SET_FILTERS: {
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

    case INITIAL_SEARCH: {
      return {
        ...state,
        isInitialSearchDone: true,
      };
    }

    default:
      return state;
  }
};
