import React from "react";
import { Box, Container } from "theme-ui";
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
    title: "Nove informacije u Vašem inboksu",
    description: `Kako se ne bi desilo da propustite idealan stan jer ste ga kasno videli u oglasima, FlatMe Vam šalje email sa svim novim stanovima koji odgovaraju Vašim kriterijumima nakon što se pojave na tržištu.`,
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
    description: `Briga o korisnicima i njihovom pozitivnom utisku o aplikaciji nam je prioritet. Za sve komentare, pohvale, kritike i sugestije nas možete kontaktirati na <a href="mailto:info@flat-me.com">info@flat-me.com</a>.`,
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
