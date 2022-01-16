import React from "react";
import { Box, Button, Container, Text } from "theme-ui";
import { SectionHeading } from "landing/components/section-heading";
import { Image } from "landing/components/image";

const styles = {
  contentWrapper: {
    gap: [0, 0, 0, 0, 10, 100],
    display: ["block", "block", "grid"],
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
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
            <Image src="/assets/images/widgets.png" alt="widgets" />
          </Box>
          <Box sx={styles.rightContent}>
            <SectionHeading
              sx={styles.heading}
              title={<>Jedinstvena aplikacija</>}
              description="FlatMe Vam javlja kad pronađe stan po Vašoj meri slanjem mejla u Vaše prijemno sanduče."
            />
            <Text sx={styles.listItem} as="p">
              <Image
                src="/assets/images/icons/check-circle-filled.png"
                alt="check icon"
              />
              Pretraga različitih platformi
            </Text>
            <Text sx={styles.listItem} as="p">
              <Image
                src="/assets/images/icons/check-circle-filled.png"
                alt="check icon"
              />
              Automatizovana obaveštenja
            </Text>
            <Button sx={styles.joinNow} variant="primaryMd">
              Pronađi stan
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
