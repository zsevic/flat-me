import NextLink from "next/link";
import PropTypes from "prop-types";
import React from "react";
import { Link as A } from "theme-ui";

export function Link({ path, label, children, ...rest }) {
  return (
    <NextLink href={path}>
      <A {...rest}>{children || label}</A>
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

Link.propTypes = linkPropTypes;
Link.defaultProps = defaultProps;
