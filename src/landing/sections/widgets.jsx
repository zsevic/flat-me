import React from "react";
import { Box, Container, Text } from "theme-ui";
import { CHECK_CIRCLE_FILLED } from "constants/config";
import { SectionHeading } from "landing/components/section-heading";
import { Image } from "landing/components/image";
import { InstallableButton } from "landing/components/button/installable";

const styles = {
  contentWrapper: {
    gap: [0, 0, 0, 0, 10, 100],
    display: ["block", "block", "grid"],
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
  },
  leftContent: {
    marginBottom: "1rem",
  },
  heading: {
    textAlign: "left",
    mb: ["20px"],
    mt: [0, 0, 0, 0, "-70px"],
    h2: {
      fontSize: ["24px", "24px", "24px", "28px", "32px", "40px"],
      lineHeight: [1.45, 1.5],
      letterSpacing: "-1.5px",
    },
  },
  listItem: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 2.81,
    display: "flex",
    alignItems: "center",
    img: {
      mr: "10px",
    },
  },
  joinNow: {
    marginTop: "1rem",
    marginLeft: "auto",
  },
  explore: {
    mt: ["20px", "20px", "20px", "20px", "40px"],
  },
};

export const Widgets = () => {
  return (
    <Box as="section" id="widgets" variant="section.widgets">
      <Container>
        <Box sx={styles.contentWrapper}>
          <Box sx={styles.leftContent}>
            <Image src="/assets/images/widgets3.png" alt="widgets" />
          </Box>
          <Box sx={styles.rightContent}>
            <SectionHeading
              sx={styles.heading}
              title={<>Jedinstvena aplikacija</>}
              description="Veliki broj filtera Vam omogućava da suzite pretragu na tačno one stanove koji Vam odgovaraju."
            />
            <Text sx={styles.listItem} as="p">
              <Image src={CHECK_CIRCLE_FILLED} alt="check icon" />
              Pretraga različitih platformi
            </Text>
            <Text sx={styles.listItem} as="p">
              <Image src={CHECK_CIRCLE_FILLED} alt="check icon" />
              Praćenje promena cena
            </Text>
            <Text sx={styles.listItem} as="p">
              <Image src={CHECK_CIRCLE_FILLED} alt="check icon" />
              Neograničeno korišćenje aplikacije za samo 599 dinara
            </Text>
            <InstallableButton sx={styles.joinNow} buttonId="notifications" />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
