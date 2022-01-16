import NextLink from "next/link";
import PropTypes from "prop-types";
import React from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { Link as A } from "theme-ui";

const styles = {
  learnMore: {
    color: "link",
    cursor: "pointer",
    fontWeight: 500,
    display: "inline-flex",
    alignItems: "center",
    svg: {
      transition: "margin-left 0.3s ease-in-out 0s",
      ml: "3px",
    },
    ":hover": {
      svg: {
        ml: "8px",
      },
    },
  },
};

export function Link({ path, label, children, ...rest }) {
  return (
    <NextLink href={path}>
      <A {...rest}>{children || label}</A>
    </NextLink>
  );
}

export function LearnMore({ path, label, children, ...rest }) {
  return (
    <NextLink href={path}>
      <A sx={styles.learnMore} {...rest}>
        {label} <HiOutlineChevronRight />
      </A>
    </NextLink>
  );
}

const linkPropTypes = {
  path: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.array,
};

const defaultProps = {
  children: undefined,
};

LearnMore.propTypes = linkPropTypes;
Link.propTypes = linkPropTypes;

LearnMore.defaultProps = defaultProps;
Link.defaultProps = defaultProps;
