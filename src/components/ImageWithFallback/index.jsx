import Image from "next/image";
import PropTypes from "prop-types";
import React, { useState } from "react";

const ImageWithFallback = (props) => {
  const { src, fallbackSrc, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

ImageWithFallback.propTypes = {
  alt: PropTypes.string.isRequired,
  blurDataURL: PropTypes.string.isRequired,
  fallbackSrc: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  key: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

export default ImageWithFallback;
