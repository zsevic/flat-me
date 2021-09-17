import PropTypes from "prop-types";
import React, { useEffect } from "react";
import "tailwindcss/tailwind.css";
import "antd/dist/antd.css";
import "../styles/globals.css";
import "fontsource-dm-sans";
import { registerServiceWorker } from "services/service-worker-registration";

React.useLayoutEffect = React.useEffect;

function App({ Component, pageProps }) {
  useEffect(() => registerServiceWorker(), []);

  return <Component {...pageProps} />;
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default App;
