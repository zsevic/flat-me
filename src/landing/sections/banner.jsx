import React from "react";
import Image from "next/image";
import { Box, Container, Heading, Text } from "theme-ui";
import { HOMEPAGE_META_DESCRIPTION } from "constants/config";
import { InstallableButton } from "landing/components/button/installable";

const styles = {
  contentWrapper: {
    display: [null, null, null, "grid", "grid"],
    gridTemplateColumns: "repeat(2, 1fr)",
    alignItems: "center",
    justifyContent: "center",
    minHeight: [null, null, null, null, null, "100vh"],
    pt: [100, null, null, 120, 130, 120, 0],
  },
  content: {
    maxWidth: [507, null, null, 324, 450],
  },
  title: {
    fontWeight: "bold",
    fontSize: ["30px", null, null, null, "42px", "40px", "60px"],
    lineHeight: 1.33,
    letterSpacing: "-1px",
    color: "textSecondary",
  },
  text: {
    fontSize: ["14px", "14px", "14px", "16px", "16px", "18px"],
    lineHeight: [1.85, 1.85, 1.85, 1.85, 1.85, 2.33],
    color: "textSecondary",
    mt: ["14px", "19px"],
  },
  button: {
    display: ["flex"],
    mt: [15, 25, 25, 25, 25],
  },
  illustration: {
    display: ["block", "block"],
    mt: ["30px", "30px", 0],
    mb: ["60px", "60px", 0],
    img: {
      maxWidth: ["100%", "100%", "100%", "100%", "90%", "90%", "100%"],
    },
  },
};

export const Banner = () => {
  return (
    <Box id="home" as="section" variant="section.banner">
      <Container>
        <Box sx={styles.contentWrapper}>
          <Box sx={styles.content}>
            <Heading sx={styles.title}>
              Jednostavan način da pronađete idealan stan
            </Heading>
            <Text
              as="p"
              sx={styles.text}
              dangerouslySetInnerHTML={{
                __html: `${HOMEPAGE_META_DESCRIPTION.replace(
                  "-",
                  "&#8209;"
                )} Neograničeno korišćenje aplikacije za samo 599 dinara.`,
              }}
            />
            <InstallableButton sx={styles.button} buttonId="main" />
          </Box>
          <Box sx={styles.illustration}>
            <Image
              src="/assets/banner.jpg"
              alt="banner"
              layout="responsive"
              width={515}
              height={343}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
