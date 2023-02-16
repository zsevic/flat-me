import React from "react";
import { Box, Container } from "theme-ui";
import { APP_RELATIVE_URL, GOOGLE_PLAY_STORE_URL } from "constants/config";
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
    description: `FlatMe Premium aplikacija je dostupna na Google Play prodavnici. Možete je instalirati klikom na link <a href="${GOOGLE_PLAY_STORE_URL}" rel="noopener noreferrer">ovde</a>, nakon čega je potrebno uneti podatke sa svoje kartice.`,
  },
  {
    id: 2,
    title: "Lako za korišćenje",
    icon: "/assets/images/icons/rocket.png",
    description: `Klikom na <a href="${APP_RELATIVE_URL}">Pronađi stan</a> pristupate stranici gde možete izlistati više hiljada trenutno dostupnih stanova za kupovinu i iznajmljivanje u Beogradu.`,
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
    title: "Lako praćenje cena",
    icon: "/assets/images/icons/prices.png",
    description:
      "FlatMe za Vas upoređuje cene stanova i omogućava Vam da budete informisani o trenutnoj i prethodnoj ceni stana ukoliko se razlikuju.",
  },
];

export const UltimateFeatures = () => {
  return (
    <Box as="section" id="ultimate-feature" variant="section.ultimateFeature">
      <Container>
        <SectionHeading
          sx={styles.heading}
          title={<>Na nekoliko klikova od svog novog doma</>}
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
