import { BackTop } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";

export const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <main
        sx={{
          variant: "layout.main",
        }}
      >
        {children}
      </main>
      <Footer />
      <BackTop />
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};
