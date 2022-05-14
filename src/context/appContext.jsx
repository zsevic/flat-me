import PropTypes from "prop-types";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { getItem, setItem } from "utils/local-storage";
import { appReducer, initialState } from "./appReducer";
import { INITIALIZE_STORE } from "./constants";

const appContext = createContext(initialState);

export function AppWrapper({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  useEffect(() => {
    const stateItem = getItem("state");
    if (stateItem && JSON.parse(stateItem)) {
      dispatch({
        type: INITIALIZE_STORE,
        payload: JSON.parse(stateItem),
      });
    }
  }, []);

  useEffect(() => {
    if (state !== initialState) {
      setItem("state", JSON.stringify(state));
    }
  }, [state]);

  return (
    <appContext.Provider value={contextValue}>{children}</appContext.Provider>
  );
}

AppWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

export function useAppContext() {
  return useContext(appContext);
}
