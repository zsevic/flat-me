import { useAppContext } from "context";
import PropTypes from "prop-types";
import React from "react";
import { Box, Heading, Text } from "theme-ui";

const styles = {
  heading: {
    textAlign: "center",
    maxWidth: 580,
    margin: "0 auto 60px",
  },
  title: {
    color: "heading",
    fontWeight: 500,
    fontSize: ["24px", "30px"],
    lineHeight: [1.25, 1.5],
    letterSpacing: "heading",
  },
  description: {
    color: "heading",
    fontSize: ["14px", "16px"],
    lineHeight: [1.85, 2.2],
    mt: "10px",
  },
};

export const SectionHeading = ({ title, ...props }) => {
  const { state } = useAppContext();

  return (
    <Box sx={styles.heading} {...props}>
      <Heading sx={styles.title}>{title}</Heading>
      <Text as="p" sx={styles.description}>
        {(state.isPushNotificationSupported && props?.alternativeDescription) ||
          props.description}
      </Text>
    </Box>
  );
};

SectionHeading.propTypes = {
  title: PropTypes.object.isRequired,
  description: PropTypes.string,
  alternativeDescription: PropTypes.string,
};

SectionHeading.defaultProps = {
  description: null,
  alternativeDescription: null,
};
