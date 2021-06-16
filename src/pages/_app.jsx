import PropTypes from "prop-types";
import React from "react";
import "tailwindcss/tailwind.css";
import "antd/dist/antd.css";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default App;
