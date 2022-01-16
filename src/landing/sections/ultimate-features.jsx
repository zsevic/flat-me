import React from "react";
import { Box, Container } from "theme-ui";
import { SectionHeading } from "landing/components/section-heading";
import { UltimateFeature } from "landing/components/cards/ultimate-feature";

const data = [
  {
    id: 1,
    icon: "/assets/images/icons/bulb.png",
    title: "Lako za instalaciju",
    description: "See where you’re making and spending money in real.",
  },
  {
    id: 2,
    title: "Lako za korišćenje",
    icon: "/assets/images/icons/rocket.png",
    description: "Send money with three clicks by wire, check, or ACH.",
  },
  {
    id: 3,
    title: "Lako filtriranje stanova",
    icon: "/assets/images/icons/dart.png",
    description: "Choose the right tone and fast formality level.",
  },
  {
    id: 4,
    title: "Lak pronalazak stana",
    icon: "/assets/images/icons/trophy.png",
    description: `Keep secure with fluent 2-factor authentication full activity.`,
  },
];

const styles = {
  heading: {
    marginBottom: [60, 60, 60, 80],
  },
  features: {
    gap: ["35px 60px", 60, 60, 40, 30, 60],
    display: ["grid", "grid"],
    gridTemplateColumns: [
      "repeat(1, 1fr)",
      "repeat(1, 1fr)",
      "repeat(1, 1fr)",
      "repeat(2, 1fr)",
      "repeat(4, 1fr)",
    ],
  },
};

export const UltimateFeatures = () => {
  return (
    <Box as="section" id="ultimate-feature" variant="section.ultimateFeature">
      <Container>
        <SectionHeading
          sx={styles.heading}
          title={<>Go Beyond unlimited features</>}
          description="Focus only on the meaning, we take care of the design. As soon as the meeting end you can export in one click into your preferred format."
        />
        <Box sx={styles.features}>
          {data?.map((item) => (
            <UltimateFeature key={item.id} data={item} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};
