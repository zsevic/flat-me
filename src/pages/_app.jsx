import PropTypes from "prop-types";
import React, { useEffect } from "react";
import ReactGA from "react-ga4";
import "tailwindcss/tailwind.css";
import "antd/dist/antd.css";
import "../styles/globals.css";
import { GOOGLE_ANALYTICS_TRACKING_ID } from "constants/config";
import { AppWrapper } from "context";
import { registerServiceWorker } from "services/service-worker-registration";
import { initializeFirebase } from "utils/push-notifications";

if (process.env.NODE_ENV !== "development") {
  ReactGA.initialize(GOOGLE_ANALYTICS_TRACKING_ID);
}

try {
  initializeFirebase();
} catch (error) {
  console.error("Initializing Firebase failed", error);
}

function App({ Component, pageProps }) {
  useEffect(() => registerServiceWorker(), []);

  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default App;
