import React from "react";
import Sticky from "react-stickynode";
import { Box, Container, Link } from "theme-ui";
import { InstallableButton } from "../button/installable";

const styles = {
  button: {
    display: ["flex"],
  },
  headerWrapper: {
    backgroundColor: "transparent",
    ".is-sticky": {
      header: {
        backgroundColor: "#fff",
        boxShadow: "0 6px 13px rgba(38, 78, 118, 0.1)",
        py: [10],
      },
    },
  },
  header: {
    position: "fixed",
    left: 0,
    right: 0,
    py: [20],
    transition: "all 0.3s ease-in-out 0s",
    "&.is-mobile-menu": {
      backgroundColor: "#fff",
    },
  },
  headerInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "@media only screen and (max-width: 768px)": {
      ".navbar": {
        position: "absolute",
        top: "100%",
        backgroundColor: "#fff",
        width: "100%",
        left: 0,
        p: "20px 30px",
        display: "block",
        boxShadow: "0 6px 13px rgba(38,78,118,0.1)",
        opacity: 0,
        visibility: "hidden",
        transition: "all 0.3s ease-in-out 0s",
        "&.active": {
          opacity: 1,
          visibility: "visible",
        },
        ul: {
          display: "block",
          "li + li": {
            marginTop: 5,
          },
        },
        button: {
          marginTop: 8,
          width: "100%",
        },
      },
    },
  },
  joinNow: {
    padding: ["0 30px", "0 30px", "0 30px", "0 30px"],
  },
};

export const Header = () => {
  return (
    <Box sx={styles.headerWrapper}>
      <Sticky enabled top={0} activeClass="is-sticky" innerZ={10}>
        <Box as="header" sx={styles.header}>
          <Container>
            <Box sx={styles.headerInner}>
              <Link href="/">FlatMe</Link>
              <InstallableButton sx={styles.button} buttonId="header" />
            </Box>
          </Container>
        </Box>
      </Sticky>
    </Box>
  );
};
