import React, { Fragment } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { Box, Container, Link } from "theme-ui";
import { APP_RELATIVE_URL, CTA_TEXT } from "constants/config";
import { SectionHeading } from "landing/components/section-heading";
import { Feature } from "landing/components/cards/feature";
import { trackEvent } from "utils/analytics";

const getNumberOfApartmentsInLastHour = () => {
  const numbersOfApartmentsInLastHour = ["5", "6", "6", "6", "6"];
  return numbersOfApartmentsInLastHour[
    Math.floor(Math.random() * numbersOfApartmentsInLastHour.length)
  ];
};

const data = [
  {
    id: 1,
    color: "#28D1DC",
    value: "8000+",
    title: "stanova za iznajmljivanje u ponudi",
  },
  {
    id: 2,
    color: "#FF753A",
    value: "10000+",
    title: "stanova za kupovinu u ponudi",
  },
  {
    id: 3,
    color: "#FA578E",
    value: "100+",
    title: "novih stanova svakog dana",
  },
  {
    id: 4,
    color: "#28DCB2",
    value: getNumberOfApartmentsInLastHour(),
    title: "novih stanova u poslednjih sat vremena",
  },
];

const styles = {
  contentWrapper: {
    gap: [30, 30, 30, 30, 40, 60, 70, 120],
    display: ["flex", "flex", "grid"],
    flexDirection: ["column-reverse", "column-reverse", "unset"],
    gridTemplateColumns: [
      "1.2fr 0.8fr",
      "1.2fr 0.8fr",
      "1.2fr 0.8fr",
      "1.1fr 0.9fr",
      "1.1fr 0.9fr",
      "1.1fr 0.9fr",
      "1.2fr 0.8fr",
    ],
    alignItems: "center",
  },
  leftContent: {
    gap: [20, 20, 20, 20, 30, 45],
    display: ["grid", "grid"],
    gridTemplateColumns: "repeat(2, 1fr)",
    alignItems: "flex-start",
    "> div": {
      ":first-of-type": {
        mt: ["65px"],
      },
      ":last-of-type": {
        mt: ["-65px"],
      },
    },
  },
  rightContent: {
    // ml: ['120px'],
  },
  heading: {
    textAlign: "left",
    mb: ["20px"],
    mt: [0, 0, "-70px"],
    h2: {
      fontSize: ["28px", "28px", "28px", "28px", "36px", "40px"],
      lineHeight: [1.25, 1.5],
      letterSpacing: "-1.5px",
      br: {
        display: ["none", "none", "none", "block"],
      },
    },
    p: {
      mt: ["15px", "10px"],
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
  explore: {
    mt: ["20px", "20px", "20px", "20px", "20px"],
  },
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

export const Features = () => {
  return (
    <Box as="section" variant="section.features">
      <Container>
        <Box sx={styles.contentWrapper}>
          <Box sx={styles.leftContent}>
            {data?.map((item) => (
              <Feature key={item?.id} feature={item} />
            ))}
          </Box>
          <Box sx={styles.rightContent}>
            <SectionHeading
              sx={styles.heading}
              title={
                <Fragment>
                  Automatizovana pretraga stanova koja će Vam olakšati
                  pronalazak novog doma
                </Fragment>
              }
              description="Traženje stana za kupovinu ili iznajmljivanje ne mora da bude mukotrpno iskustvo. Umesto da svakodnevno trošite po nekoliko sati na proveravanje novih oglasa na različitim platformama, aktivirajte FlatMe obaveštenja i mi ćemo to raditi za Vas, a rezultate pretrage ćemo Vam slati direktno u Vaše prijemno sanduče."
              alternativeDescription="Traženje stana za kupovinu ili iznajmljivanje ne mora da bude mukotrpno iskustvo. Umesto da svakodnevno trošite po nekoliko sati na proveravanje novih oglasa na različitim platformama, aktivirajte FlatMe obaveštenja i mi ćemo to raditi za Vas, a rezultate pretrage ćemo Vam slati direktno na Vaš uređaj."
            />
            <Box
              sx={styles.explore}
              onClick={() =>
                trackEvent("find-apartment", "find-apartment-statistics")
              }
            >
              <Link href={APP_RELATIVE_URL} sx={styles.learnMore}>
                {CTA_TEXT} <HiOutlineChevronRight />
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
