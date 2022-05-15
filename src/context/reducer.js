import { INITIAL_FOUND_APARTMENTS_COUNTER } from "constants/config";
import {
  APPEND_APARTMENT_LIST,
  APPEND_FOUND_APARTMENT_LIST,
  DECREASE_FOUND_APARTMENTS_COUNTER,
  INITIALIZE_STORE,
  INITIAL_SEARCH,
  SET_ACCESS_TOKEN,
  SET_APARTMENT_LIST,
  SET_CLICKED_FOUND_APARTMENTS,
  SET_FILTERS,
  SET_FOUND_APARTMENTS_COUNTER,
  SET_FOUND_APARTMENT_LIST,
  SET_LOADING_APARTMENT_LIST,
  SET_LOADING_FOUND_APARTMENT_LIST,
  UPDATE_NOTIFICATION_ACTIVATION_ALLOWANCE,
  UPDATE_PUSH_NOTIFICATIONS,
} from "./constants";

export const initialState = {
  accessToken: null,
  apartmentList: [],
  apartmentListHasNextPage: false,
  apartmentListEndCursor: null,
  clickedFoundApartments: [],
  filters: {},
  foundApartmentList: [],
  foundApartmentsCounter: INITIAL_FOUND_APARTMENTS_COUNTER,
  isInitialSearchDone: false,
  isLoadingApartmentList: false,
  isLoadingFoundApartmentList: true,
  isNotificationActivationDisabled: true,
  isPushNotificationActivated: false,
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case APPEND_APARTMENT_LIST: {
      return {
        ...state,
        apartmentList: [
          ...state.apartmentList,
          ...action.payload.apartmentList,
        ],
        apartmentListHasNextPage: action.payload.apartmentListHasNextPage,
        apartmentListEndCursor: action.payload.apartmentListEndCursor,
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

    case DECREASE_FOUND_APARTMENTS_COUNTER: {
      return {
        ...state,
        foundApartmentsCounter: state.foundApartmentsCounter - 1,
      };
    }

    case INITIAL_SEARCH: {
      return {
        ...state,
        isInitialSearchDone: true,
      };
    }

    case INITIALIZE_STORE: {
      return action.payload;
    }

    case SET_ACCESS_TOKEN: {
      return {
        ...state,
        accessToken: action.payload.accessToken,
      };
    }

    case SET_APARTMENT_LIST: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case SET_FILTERS: {
      return {
        ...state,
        filters: action.payload.filters,
      };
    }

    case SET_FOUND_APARTMENT_LIST: {
      return {
        ...state,
        foundApartmentList: action.payload.foundApartmentList,
      };
    }

    case SET_CLICKED_FOUND_APARTMENTS: {
      return {
        ...state,
        clickedFoundApartments: action.payload.clickedFoundApartments,
      };
    }

    case SET_FOUND_APARTMENTS_COUNTER: {
      return {
        ...state,
        foundApartmentsCounter: action.payload.foundApartmentsCounter,
      };
    }

    case SET_LOADING_APARTMENT_LIST: {
      return {
        ...state,
        isLoadingApartmentList: action.payload.isLoadingApartmentList,
      };
    }

    case SET_LOADING_FOUND_APARTMENT_LIST: {
      return {
        ...state,
        isLoadingFoundApartmentList: action.payload.isLoadingFoundApartmentList,
      };
    }

    case UPDATE_NOTIFICATION_ACTIVATION_ALLOWANCE: {
      return {
        ...state,
        isNotificationActivationDisabled: action.payload.isDisabled,
      };
    }

    case UPDATE_PUSH_NOTIFICATIONS: {
      return {
        ...state,
        isPushNotificationActivated: action.payload.isPushNotificationActivated,
      };
    }

    default:
      return state;
  }
};
