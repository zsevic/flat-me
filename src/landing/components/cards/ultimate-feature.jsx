import { useAppContext } from "context";
import PropTypes from "prop-types";
import React from "react";
import { Box, Image, Heading, Text } from "theme-ui";

const styles = {
  feature: {
    textAlign: ["center", "center", "center", "center", "left"],
    maxWidth: [230, 230, 230, 230, "none"],
    margin: "0 auto",
    figure: {
      backgroundColor: "white",
      boxShadow: "0px 8px 24px rgba(53, 95, 158, 0.1)",
      height: "90px",
      margin: [
        "0 auto 30px",
        "0 auto 30px",
        "0 auto 30px",
        "0 auto 30px",
        "0 0 40px",
      ],
      width: "90px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
    },
    h4: {
      fontSize: "18px",
      lineHeight: 1.28,
      color: "heading",
      marginBottom: "20px",
    },
    p: {
      fontSize: 16,
      lineHeight: [1.6, 1.6, 1.6, 1.88],
      color: "muted",
    },
  },
};

export const UltimateFeature = ({ data, ...props }) => {
  const { state } = useAppContext();

  return (
    <Box sx={styles.feature} {...props}>
      <figure>
        <Image src={data?.icon} alt={data?.title} />
      </figure>
      <Box>
        <Heading as="h4">
          {(state.isPushNotificationSupported && data?.alternativeTitle) ||
            data?.title}
        </Heading>
        <Text
          as="p"
          dangerouslySetInnerHTML={{
            __html:
              (state.isPushNotificationSupported &&
                data?.alternativeDescription) ||
              data?.description,
          }}
        />
      </Box>
    </Box>
  );
};

UltimateFeature.propTypes = {
  data: PropTypes.object.isRequired,
};
