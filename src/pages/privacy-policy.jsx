import Head from "next/head";
import { rgba } from "polished";
import React from "react";
import { Box, Container, Heading, Text, ThemeProvider } from "theme-ui";
import CommonHead from "components/CommonHead";
import {
  DOMAIN_URL,
  HOMEPAGE_META_DESCRIPTION,
  POLICY_PRIVACY_PAGE_TITLE,
} from "constants/config";
import { Link } from "landing/components/link";
import { Layout } from "landing/components/layout";
import { SectionHeading } from "landing/components/section-heading";
import { theme } from "landing/theme";

const styles = {
  section: {
    pt: "60px",
    pb: "70px",
  },
  heading: {
    color: "#000",
    mt: 40,
    mb: [30, 10, 30],
    h2: {
      fontSize: [22, 28, "36px"],
      lineHeight: 1.4,
      letterSpacing: "heading",
      color: "#000",
    },
    p: {
      lineHeight: [2, 2],
      mt: [20, 0],
      letterSpacing: "heading",
      color: rgba("#000", 0.6),
    },
    textAlign: "center",
  },
  content: {
    maxWidth: "555px",
    margin: "0 auto",
  },
  subtitle: {
    color: "heading",
    fontWeight: 300,
    fontSize: ["18px", "24px"],
    lineHeight: [1.25, 1.5],
    letterSpacing: "heading",
    mt: "1rem",
  },
  subdescription: {
    color: "heading",
    fontSize: ["14px", "16px"],
    lineHeight: [1.85, 2.2],
    mt: "1rem",
  },
};

const PrivacyPolicyPage = () => (
  <ThemeProvider theme={theme}>
    <CommonHead />
    <Head>
      <meta name="description" content={HOMEPAGE_META_DESCRIPTION} />
      <meta property="og:description" content={HOMEPAGE_META_DESCRIPTION} />
      <meta
        property="og:image"
        content={`${DOMAIN_URL}/assets/logo-main.png`}
      />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta
        property="og:image"
        content={`${DOMAIN_URL}/assets/logo-whatsapp.png`}
      />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="400" />
      <meta property="og:image:height" content="400" />

      <meta property="og:title" content={POLICY_PRIVACY_PAGE_TITLE} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN_URL}/policy-privacy`} />

      <link rel="canonical" href={`${DOMAIN_URL}/policy-privacy`} />
      <title>{POLICY_PRIVACY_PAGE_TITLE}</title>
    </Head>
    <Layout>
      <Box as="section" sx={styles.section}>
        <Container>
          <Box sx={styles.content}>
            <SectionHeading
              sx={styles.heading}
              title={<>Politika privatnosti</>}
            />
            <Heading sx={styles.subtitle}>
              Upotreba i zaštita podataka o ličnosti
            </Heading>
            <Text as="p" sx={styles.subdescription}>
              U skladu sa Zakonom o zaštiti podataka o ličnosti (&quot;Sl.
              glasnik RS&quot;, br. 87/2018, u daljem tekstu: Zakon), FlatMe (u
              daljem tekstu: FlatMe platforma ili Platforma) se obavezuje da
              poštuje i zaštiti privatnost ličnih podataka svojih korisnika.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              Korišćenjem FlatMe platforme i/ili bilo kog njenog dela svaki
              pojedinačni posetilac i/ili korisnik (u daljem tekstu: Korisnik)
              potvrđuje da je upoznat sa Politikom privatnosti, da je pročitao i
              razumeo istu i pristao na njenu primenu. Ukoliko niste saglasni sa
              bilo kojom njenim delom, molimo Vas da se uzdržite od daljeg
              korišćenja Platforme.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              Politika privatnosti je sastavni deo Uslova korišćenja FlatMe
              platforme koji su objavljeni na adresi:{" "}
              <Link
                path="https://www.flat-me.com/terms-and-conditions"
                label="https://www.flat-me.com/terms-and-conditions"
              />
              . Na ovaj tekst, kao i na njegove moguće izmene i dopune
              primenjuju se propisi Republike Srbije. Izmene i dopune Politike
              privatnosti stupaju na snagu odmah, objavljivanjem na ovoj
              stranici.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              Datum poslednjeg ažuriranja: 6.2.2022.
            </Text>
            <Heading sx={styles.subtitle}>Podaci koji se prikupljaju</Heading>
            <Text as="p" sx={styles.subdescription}>
              FlatMe platforma prikuplja samo nužne i osnovne podatke o
              korisnicima uz strogo poštovanje njihove privatnosti. Podaci koji
              se prikupljaju obuhvataju podatke koje Korisnik sam direktno unese
              prilikom prijave na obaveštenja o novim nekretninama nakon što se
              iste pojave na tržištu, a koje odgovaraju izabranim kriterijumima
              i/ili podaci koje unese prilikom prijave na obaveštenja o
              novostima u vezi FlatMe platforme. Podaci koji se u oba slučaja
              čuvaju obuhvataju e-mail adresu Korisnika.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              U cilju boljeg razumevanja korisničkog ponašanja i pružanja bolje
              korisničke usluge, FlatMe platforma koristi i analitički softver
              trećih lica, konkretno: Google Analytics. Podaci prikupljeni od
              strane Google Analytics-a nisu ni na koji način povezani sa ličnim
              podacima Korisnika.
            </Text>
            <Heading sx={styles.subtitle}>Svrha obrade podataka</Heading>
            <Text as="p" sx={styles.subdescription}>
              Prikupljanje i obrada podataka na FlatMe platformi se vrši u svrhe
              nesmetanog funkcionisanja i olakšavanja korišćenja Platforme i
              njenih pogodnosti u skladu sa zakonskim regulativama koje važe na
              teritoriji Republike Srbije.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              Ukoliko se naknadno pojavi potreba za obradom podataka o ličnosti
              u svrhu koja je različita od one za koju su podaci prikupljeni,
              FlatMe će Korisnicima, pre započinjanja dalje obrade, pružiti
              informacije o toj drugoj svrsi, kao i sve ostale informacije u
              skladu sa sa važećim zakonskim regulativama.
            </Text>
            <Heading sx={styles.subtitle}>Pristup podacima</Heading>
            <Text as="p" sx={styles.subdescription}>
              U zavisnosti od konkretne svrhe, pristup pojedinim podacima o
              Korisniku mogu imati zaposleni FlatMe platforme, partnerske
              kompanije i saradnici od poverenja koji pomažu u unapređenju
              usluga koje FlatMe nudi svojim korisnicima.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              Izuzetno, podaci o ličnosti se mogu dostavljati nadležnim državnim
              organima po zakonskoj obavezi i u meri u kojoj je to neophodno.
            </Text>
            <Heading sx={styles.subtitle}>Bezbednost podataka</Heading>
            <Text as="p" sx={styles.subdescription}>
              U postupku prikupljanja, čuvanja i obrade podataka primenjuju se
              neophodni standardi u zaštiti podataka, a u cilju njihove
              bezbednosti. Primenjuju se sve neophodne organizacione, tehničke i
              kadrovske mere zaštite u skladu sa zahtevima važećeg Zakona o
              zaštiti podataka o ličnosti, uključujući, ali ne ograničavajući se
              na: tehničke mere zaštite, mere zaštite koje se odnose na fizički
              pristup mestu gde su skladišteni podaci korisnika, mere zaštite
              informacione bezbednosti korisničkih podataka u skladu sa važećom
              regulativom, i ostale mere koje su primerene obradi i neophodne da
              bi se obezbedila zaštita konkretnih podataka o ličnosti.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              Svi strane koje imaju pristup podacima su dužne da preduzmu
              odgovarajuće tehničke, organizacione i kadrovske mere u svrhu
              zaštite i bezbednosti.
            </Text>
            <Heading sx={styles.subtitle}>Period čuvanja podataka</Heading>
            <Text as="p" sx={styles.subdescription}>
              Korisnički podaci se čuvaju tokom vremena koje je potrebno za
              ostvarenje konkretne svrhe ili do trenutka opoziva datog pristanka
              za čuvanje i obradu. Podaci se nakon toga brišu osim u izuzetnim
              slučajevima kada su neophodni radi izvršenja naše zakonske obaveze
              ili kada mogu da dovedu do sprečavanja istrage, otkrivanja ili
              gonjenja u postupcima krivičnih dela, kao i do sprečavanja
              ostvarivanja potraživanja u građanskim sporovima.
            </Text>
            <Text
              as="p"
              sx={styles.subdescription}
              dangerouslySetInnerHTML={{
                __html: `Podatke koje Korisnik ostavi prilikom prijave na obaveštenja o novim nekretninama koje se pojave na tržištu, a koje odgovaraju njegovim izabranim kriterijumima i/ili podaci koje unese prilikom prijave na obaveštenja o novostima u vezi FlatMe platforme se čuvaju dok isti ne zatraži da se izbrišu putem “Odjavi me” veze u e-mail poruci koju primi od FlatMe platforme ili slanjem zahteva na e-mail adresu: <a href="mailto:info@flat-me.com">info@flat-me.com</a>.`,
              }}
            />
            <Heading sx={styles.subtitle}>
              Prava u vezi sa podacima koji se prikupljaju
            </Heading>
            <Text as="p" sx={styles.subdescription}>
              U svakom trenutku, Korisnik ima pravo na uvid u sve svoje lične
              podatke koji se čuvaju o njemu, kao i pravo da zatraži da mu se
              dostave svi lični podaci koji se čuvaju u skladu sa važećim
              propisima Republike Srbije.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              U svakom trenutku, Korisnik ima pravo da izmeni svoje podatke koji
              su netačni, da povuče saglasnost koju je prethodno dao za čuvanje
              i obradu tih podataka, da podnese zahtev za brisanje svojih ličnih
              podataka.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              Svoj pristanak za obradu podataka Korisnik može opozvati u bilo
              kom trenutku nakon čega se prestaje sa daljom obradom njegovih
              ličnih podataka i isti se brišu. Izuzetak su slučajevi kada
              brisanje podataka može dovesti do sprečavanja istrage, otkrivanja
              ili gonjenja u postupcima krivičnih dela, kao i do sprečavanja
              ostvarivanja potraživanja u građanskim sporovima o čemu ćete biti
              obavešteni.
            </Text>
            <Heading sx={styles.subtitle}>Poruke i obaveštenja</Heading>
            <Text as="p" sx={styles.subdescription}>
              Cilj slanja poruka i obaveštenja je omogućavanje što lakšeg
              korišćenja FlatMe platforme i što efikasniji način pronalaženja
              nekretnine koja odgovara zadatim kriterijumima. Poruke koje se
              šalju služe:
            </Text>
            <Text as="p" sx={styles.subdescription}>
              - Da se Korisnik obavesti o novim nekretninama koje su se pojavile
              na tržištu, a koje odgovaraju zadatim kriterijumima.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              - Da se Korisnik obavesti o tehničkim, poslovnim ili zakonskim
              promenama i/ili novostima koje se odnose na rad FlatMe platforme.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              U svakoj e-mail poruci koju Korisnik dobije od FlatMe platforme se
              nalazi i veza za direktno otkazivanje daljeg prijema istih.
            </Text>
            <Heading sx={styles.subtitle}>Veza sa drugim portalima</Heading>
            <Text as="p" sx={styles.subdescription}>
              FlatMe sadrži veze prema trećim internet stranicama. Ukoliko
              Korisnik izabere da poseti takvu stranu klikom na vezu biće
              preusmeren na istu. Činjenica da je FlatMe povezan sa internet
              stranom drugog veb-sajta ne predstavlja odobrenje njegove politike
              o zaštiti informacija i privatnosti.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              FlatMe ne preuzima kontrolu nad internet stranama trećih lica niti
              je upoznat sa uslovima korišćenja i obradom ličnih podataka tih
              internet strana. Korisnici se savetuju da pre korišćenja
              gorepomenutih strana obavezno pročitaju njihove pravilnike i
              uslove.
            </Text>
            <Heading sx={styles.subtitle}>Izmene Politike privatnosti</Heading>
            <Text as="p" sx={styles.subdescription}>
              Politika privatnosti FlatMe platforme može biti promenjena pri
              čemu će izmene biti odmah dostupne na sledećoj adresi{" "}
              <Link
                path="https://www.flat-me.com/privacy-policy"
                label="https://www.flat-me.com/privacy-policy"
              />
              . O svakoj značajnoj izmeni FlatMe će Korisnike obavestiti putem
              e-mail poruke i/ili zvaničnog obaveštenja putem FlatMe platforme.
              Politika privatnosti stupa na snagu danom objavljivanja čime
              prestaju da važe odredbe prethodne politike zaštite privatnosti.
            </Text>
            <Heading sx={styles.subtitle}>Kontakt</Heading>
            <Text
              as="p"
              sx={styles.subdescription}
              dangerouslySetInnerHTML={{
                __html: `Za sva pitanja u vezi sa ovom Politikom privatnosti, zaštiti privatnosti na FlatMe platformi
                i načinu prikupljanja, obrade i korišćenja ličnih podataka Korisnika Platforme, možete nas
                kontaktirati na: <a href="mailto:info@flat-me.com">info@flat-me.com</a>.`,
              }}
            />
          </Box>
        </Container>
      </Box>
    </Layout>
  </ThemeProvider>
);

export default PrivacyPolicyPage;
