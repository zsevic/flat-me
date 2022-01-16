import PropTypes from "prop-types";
import React from "react";
import { Image as Img } from "theme-ui";

export const Image = ({ src, ...rest }) => {
  return <Img src={src} {...rest} />;
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
};
