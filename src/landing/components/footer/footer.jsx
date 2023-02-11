import { rgba } from "polished";
import React from "react";
import { Box, Text, Container } from "theme-ui";
import { Link } from "landing/components/link";
import { footerNav } from "./footer.data";

const styles = {
  footerTopInner: {
    gap: [50, null, null, null, 17, 50],
    mb: [50],
    display: ["grid"],
    gridTemplateColumns: [
      "repeat(2, 1fr)",
      null,
      null,
      "repeat(3, 1fr)",
      "repeat(5, 1fr)",
    ],
  },
  footerInner: {
    borderTop: `1px solid #D9E0E7`,
    display: ["block", null, "flex"],
    alignItems: "center",
    justifyContent: "space-between",
    padding: "35px 0 40px",
    "@media only screen and (max-width: 400px)": {
      pb: 10,
    },
  },
  copyright: {
    display: ["flex"],
    alignItems: "center",
    flexDirection: ["column", null, null, null, "row"],
    span: {
      fontSize: "14px",
      lineHeight: 1.29,
      color: rgba("#0F2137", 0.6),
      mt: ["18px", "18px", "7px"],
    },
  },
  footerNav: {
    listStyle: "none",
    margin: ["15px 0 0", "15px 0 0", "0"],
    padding: 0,
    display: ["flex"],
    flexWrap: ["wrap", null, null, "unset"],
    justifyContent: ["center", null, "flex-start"],
    "li + li": {
      ml: ["18px", "18px", "20px"],
      "@media only screen and (max-width: 400px)": {
        mb: "10px",
      },
    },
    a: {
      color: "textSecondary",
    },
  },
};

export const Footer = () => {
  return (
    <Box as="footer">
      <Container>
        <Box sx={styles.footerInner}>
          <Box sx={styles.copyright}>
            <Text as="span">&copy; {new Date().getFullYear()} FlatMe</Text>
          </Box>

          <Text as="span">
            Vizuelni elementi mobilnih uređaja kreirani uz pomoć{" "}
            <a
              href="https://deviceframes.com/templates/google-pixel-6"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Pixel 6 mockups
            </a>
          </Text>

          <Box as="ul" sx={styles.footerNav}>
            {footerNav.map(({ path, label }) => (
              <li key={`footer-li-${label}`}>
                <Link
                  path={path}
                  key={`footer-link-${label}`}
                  label={label}
                  variant="footer"
                />
              </li>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
