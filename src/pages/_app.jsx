import PropTypes from "prop-types";
import React, { useEffect } from "react";
import ReactGA from "react-ga";
import "tailwindcss/tailwind.css";
import "antd/dist/antd.css";
import "../styles/globals.css";
import { GOOGLE_ANALYTICS_TRACKING_ID } from "constants/config";
import { registerServiceWorker } from "services/service-worker-registration";

React.useLayoutEffect = React.useEffect;

if (process.env.NODE_ENV !== "development") {
  ReactGA.initialize(GOOGLE_ANALYTICS_TRACKING_ID);
}

function App({ Component, pageProps }) {
  useEffect(() => registerServiceWorker(), []);

  return <Component {...pageProps} />;
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default App;
