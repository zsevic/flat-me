import PropTypes from "prop-types";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { setItem, STATE_KEY } from "utils/local-storage";
import { appReducer, initialState } from "./reducer";

const appContext = createContext(initialState);

export function AppWrapper({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  useEffect(() => {
    if (state !== initialState) {
      setItem(STATE_KEY, JSON.stringify(state));
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
