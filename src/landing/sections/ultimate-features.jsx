import React from "react";
import { Box, Container } from "theme-ui";
import { SectionHeading } from "landing/components/section-heading";
import { UltimateFeature } from "landing/components/cards/ultimate-feature";

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

const data = [
  {
    id: 1,
    icon: "/assets/images/icons/bulb.png",
    title: "Lako za instalaciju",
    description:
      "Klikom na dugme za instalaciju dodajete FlatMe aplikaciju na ekran svog mobilnog telefona odakle joj možete pristupiti bilo kada.",
  },
  {
    id: 2,
    title: "Lako za korišćenje",
    icon: "/assets/images/icons/rocket.png",
    description:
      "Klikom na Pronađi stan pristupate stranici gde možete izlistati više hiljada trenutno dostupnih stanova za kupovinu i iznajmljivanje na teritoriji Beograda.",
  },
  {
    id: 3,
    title: "Lako filtriranje stanova",
    icon: "/assets/images/icons/dart.png",
    description:
      "Odabirom vrste pretrage, opsega cene, strukture, spratnosti stana, lokacije i ostalih filtera sužavate pretragu na stanove koji Vam odgovaraju.",
  },
  {
    id: 4,
    title: "Lak pronalazak stana",
    icon: "/assets/images/icons/trophy.png",
    description:
      "FlatMe za Vas pretražuje različite platforme i šalje Vam email sa svim novim stanovima koji se pojave na tržištu, a uklapaju se u Vaše želje i mogućnosti.",
  },
];

export const UltimateFeatures = () => {
  return (
    <Box as="section" id="ultimate-feature" variant="section.ultimateFeature">
      <Container>
        <SectionHeading
          sx={styles.heading}
          title={<>Jednostavan način da pronađete idealan stan</>}
          description="Umorni ste od stresnog i dugotrajnog traženja stana za iznajmljivanje ili kupovinu u Beogradu? Uz FlatMe za manje od 2 minuta dolazite do svih dostupnih oglasa koji odgovaraju Vašim kriterijumima."
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
