import React from "react";
import { Box, Container } from "theme-ui";
import { EMAIL_ADDRESS } from "constants/config";
import { SectionHeading } from "landing/components/section-heading";
import { UltimateFeature } from "landing/components/cards/ultimate-feature";

const data = [
  {
    id: 1,
    icon: "/assets/images/icons/bulb-2.png",
    title: "Objedinjena pretraga",
    description: `Bilo da tražite stan za iznajmljivanje ili kupovinu u Beogradu, FlatMe aplikacija će za Vas pretražiti sve dostupne oglase na vodećim platformama za prodaju i izdavanje stanova na svim lokacijama u gradu.`,
  },
  {
    id: 2,
    icon: "/assets/images/icons/diamond.png",
    title: "Praćenje cena",
    description: `Budite u toku sa promenama cena za stan koji Vas interesuje. FlatMe Vam prikazuje trenutnu uz prethodnu cenu stana ukoliko se razlikuju i omogućava Vam da ih uporedite.`,
  },
  {
    id: 3,
    icon: "/assets/images/icons/time-saver.png",
    title: "Ušteda vremena",
    description: `Vreme koje biste proveli tražeći stan sada možete iskoristiti za druge aktivnosti dok FlatMe za Vas pronalazi savršeni stan.`,
  },
  {
    id: 4,
    icon: "/assets/images/icons/help.png",
    title: "Korisnička podrška",
    description: `Briga o korisnicima i njihovom pozitivnom utisku o aplikaciji nam je prioritet. Za sve komentare, pohvale, kritike i sugestije nas možete kontaktirati na <a href="mailto:${EMAIL_ADDRESS}">${EMAIL_ADDRESS}</a>.`,
  },
];

const styles = {
  heading: {
    marginBottom: 80,
  },
  features: {
    gap: 60,
    display: ["grid"],
    gridTemplateColumns: ["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"],
    ".feature-item": {
      display: ["block", "block", "block", "block", "flex"],
      px: ["15px", 0],
      maxWidth: ["none"],
      figure: {
        minWidth: "90px",
        m: [
          "0 auto 30px",
          "0 auto 30px",
          "0 auto 30px",
          "0 auto 30px",
          "0 26px 0 0",
        ],
      },
    },
  },
};

export const UsefulFeatures = () => {
  return (
    <Box as="section" id="useful-features" variant="section.usefulFeatures">
      <Container>
        <SectionHeading
          sx={styles.heading}
          title={<>Šta dobijam aplikacijom FlatMe?</>}
          description="Svesni činjenice da je mali broj ljudi imao sreće da pronađe savršen stan u kratkom vremenskom periodu, razvili smo FlatMe aplikaciju koja proces pretrage stanova u Beogradu čini jednostavnijim i lakšim."
        />
        <Box sx={styles.features}>
          {data?.map((item) => (
            <UltimateFeature
              key={item.id}
              data={item}
              className="feature-item"
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};
