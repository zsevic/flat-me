import Head from "next/head";
import { rgba } from "polished";
import React from "react";
import { Box, Container, Heading, Text, ThemeProvider } from "theme-ui";
import CommonHead from "components/CommonHead";
import {
  DOMAIN_URL,
  HOMEPAGE_META_DESCRIPTION,
  TERMS_AND_CONDITIONS_PAGE_TITLE,
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
    textAlign: "center",
    mt: "1rem",
  },
  subdescription: {
    color: "heading",
    fontSize: ["14px", "16px"],
    lineHeight: [1.85, 2.2],
    mt: "1rem",
  },
};

const TermsAndConditionsPage = () => (
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

      <meta property="og:title" content={TERMS_AND_CONDITIONS_PAGE_TITLE} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN_URL}/terms-and-conditions`} />

      <link rel="canonical" href={`${DOMAIN_URL}/terms-and-conditions`} />
      <title>{TERMS_AND_CONDITIONS_PAGE_TITLE}</title>
    </Head>
    <Layout>
      <Box as="section" sx={styles.section}>
        <Container>
          <Box sx={styles.content}>
            <SectionHeading
              sx={styles.heading}
              title={<>Uslovi korišćenja</>}
            />
            <Heading sx={styles.subtitle}>
              PRIHVATANJE USLOVA KORIŠĆENJA
            </Heading>
            <Text as="p" sx={styles.subdescription}>
              Flat-me.com (u daljem tekstu: FlatMe platforma ili Platforma) je
              internet stranica namenjena prikupljanju i objavljivanju oglasa iz
              oblasti nekretnina. Korišćenjem FlatMe platforme i/ili bilo kog
              njenog dela svaki pojedinačni posetilac i/ili korisnik (u daljem
              tekstu: Korisnik) potvrđuje da je upoznat i saglasan sa odredbama
              i uslovima navedenim u daljem tekstu. Uslovi korišćenja su
              obavezujući.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              FlatMe zadržava pravo promene Uslova korišćenja pri čemu iste
              stupaju na snagu odmah, objavljivanjem na ovoj stranici. FlatMe
              platforma nije odgovorna, niti garantuje da su informacije na njoj
              uvek aktuelne, ispravne i/ili potpune.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              Datum poslednjeg ažuriranja: 28.11.2021.
            </Text>
            <Heading sx={styles.subtitle}>OPŠTI USLOVI KORIŠĆENJA</Heading>
            <Text as="p" sx={styles.subdescription}>
              FlatMe platforma je namenjena prikupljanju i objavljivanju oglasa
              iz oblasti nekretnina. FlatMe nije agencija za izdavanje i/ili
              prodaju nekretnina. FlatMe nema svojstvo, obaveze, ni odgovornosti
              posrednika, niti platforma služi posredovanju između dva ili više
              Korisnika u njihovim međusobnim transakcijama i trgovini.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              FlatMe omogućava širokom krugu posetilaca i korisnika da pronađu i
              pregledaju sve nekretnine na izabranoj teritoriji koji odgovaraju
              zadatim parametrima, kao i da ostavljanjem svoje e-mail adrese
              dobijaju obaveštenja o svim novoobjavljenim nekretninama koje
              odgovaraju prethodno izabranim parametrima.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              Korisnik može biti fizičko ili pravno lice. Korisnik snosi
              isključivu odgovornost i dužan je da obezbedi da korišćenje FlatMe
              platforme bude u skladu sa relevantnim propisima i odredbama ovih
              Uslova korišćenja. FlatMe zadržava pravo da privremeno ili trajno
              onemogući pristup Platformi u slučaju sumnje da Korisnik ne
              ispunjava navedene uslove.
            </Text>
            <Heading sx={styles.subtitle}>VEZA SA DRUGIM VEB PORTALIMA</Heading>
            <Text as="p" sx={styles.subdescription}>
              FlatMe sadrži veze prema drugim internet stranicama. FlatMe nema
              kontrolu nad tim stranicama i nije odgovoran za njihov sadržaj,
              uključujući bez ograničenja vezu prema nekoj drugoj stranici, ili
              izmene i ažuriranje takve stranice.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              FlatMe nije odgovoran za istinitost, tačnost i verodostojnost
              informacija na povezanim stranicama, a naročito o svojstvu,
              karakteristikama i stanju oglašene nekretnine. Odgovornost za
              sadržaj poruke na povezanoj stranici je na licu od koga je takav
              sadržaj potekao.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              FlatMe ne učestvuje u prodaji ili iznajmljivanju nekretnina koji
              se oglašavaju na njoj, niti u bilo kojoj transakciji koja se
              obavlja između korisnika stranice. FlatMe ne garantuje za bilo
              koju nekretninu prikazanu na strani flat-me.com, uključujući
              vlasništvo nad istom i spremnost korisnika da izvrši transakciju.
            </Text>
            <Heading sx={styles.subtitle}>IZUZEĆE OD ODGOVORNOSTI</Heading>
            <Text as="p" sx={styles.subdescription}>
              Informacije, softver, proizvodi i usluge koje stranica sadrži ili
              koje su dostupne kroz korišćenje stranice mogu da sadrže
              netačnosti ili tipografske greške. Unesene informacije menjaju se
              periodično. FlatMe može unapređivati i/ili menjati internet
              stranicu u bilo kojem trenutku.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              Sadržaj objavljen na ovoj stranici ne može biti temelj za
              donošenje ličnih, pravnih ili finansijskih odluka. Korisnik
              izričito izjavljuje da razume i prihvata da FlatMe ne snosi
              nikakvu odgovornost za bilo kakvu štetu, uključujući, ali ne i
              isključivo štete nastale usled gubitka profita, poslovne prilike,
              korišćenja podataka ili drugih nematerijalnih gubitaka (čak i ako
              je bio obavešten o mogućnosti nastanka takvih šteta ili je trebalo
              da zna da takva mogućnost postoji), koje proističu iz korišćenja
              ili nemogućnosti pristupa i korišćenja FlatMe platforme iz bilo
              kog razloga.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              FlatMe ni u kojem slučaju ne može biti odgovoran za neposrednu,
              posrednu, slučajnu, posledičnu ili neku drugu štetu koja proizlazi
              ili je na bilo koji način povezana s korišćenjem platforme ili
              njenim radom. Navedeno se primenjuje u najvećem mogućem obimu koji
              zakoni dozvoljavaju.
            </Text>
            <Heading sx={styles.subtitle}>
              NEZAKONITO ILI ZABRANJENO KORIŠĆENJE
            </Heading>
            <Text as="p" sx={styles.subdescription}>
              Uslov za korišćenje FlatMe stranice je Vaše jemstvo da istu nećete
              upotrebljavati u svrhe koje su nezakonite ili zabranjene navedenim
              pravilima ili uslovima. Nije dopušteno koristiti ovu stranicu na
              način koji bi stranicu oštetio ili je onesposobio, preopteretio
              ili ometao druge korisnike da se njome služe. Nije dopušteno da
              uzimate ili pokušate da dobijete materijale ili informacije na
              način koji nije omogućen ili ponuđen preko stranice.
            </Text>
            <Heading sx={styles.subtitle}>
              LIČNI PODACI I ZAŠTITA PRIVATNOSTI
            </Heading>
            <Text as="p" sx={styles.subdescription}>
              FlatMe od Korisnika može zahtevati da, za potrebe korišćenja
              FlatMe platforme, dostavi određene lične podatke čije
              prikupljanje, korišćenje, obrada i čuvanje je u skladu sa važećim
              propisima Republike Srbije i podležu Politici zaštite privatnosti
              koja predstavlja sastavni deo ovih Uslova korišćenja. Korišćenje
              FlatMe platforme ili bilo kog njenog dela podrazumeva da je
              Korisnik pročitao, razumeo i složio se sa uslovima Politike
              zaštite privatnosti.
            </Text>
            <Heading sx={styles.subtitle}>
              PREKID / OGRANIČENJE PRISTUPA
            </Heading>
            <Text as="p" sx={styles.subdescription}>
              FlatMe zadržava diskreciono pravo da zabrani pristup Korisniku
              koji na bilo koji način krši ove uslove korišćenja ili ometa rad
              portala u bilo koje vreme i bez prethodnog obaveštenja, kao i
              pravo da protiv Korisnika preduzme odgovarajuće mere.
            </Text>
            <Heading sx={styles.subtitle}>IZMENE USLOVA KORIŠĆENJA</Heading>
            <Text as="p" sx={styles.subdescription}>
              FlatMe zadržava pravo da po sopstvenom nahođenju i bez prethodno
              datog obveštenja, izvrši reviziju, ažurira, izmeni, dopuni ili
              izbriše određene odredbe ovih Uslova korišćenja. Ukoliko FlatMe
              izmeni Uslove korišćenja, izmena će biti dostupna na Internet
              stranici{" "}
              <Link
                path="https://www.flat-me.com/terms-and-conditions"
                label="https://www.flat-me.com/terms-and-conditions."
              />
            </Text>
            <Heading sx={styles.subtitle}>PITANJA I SUGESTIJE</Heading>
            <Text as="p" sx={styles.subdescription}>
              Ukoliko imate bilo kakvih pitanja ili sugestija, možete nas
              kontaktirati na: info@flat-me.com.
            </Text>
          </Box>
        </Container>
      </Box>
    </Layout>
  </ThemeProvider>
);

export default TermsAndConditionsPage;
