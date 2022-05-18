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
  smalltitle: {
    color: "heading",
    fontWeight: 200,
    fontSize: ["16px", "22px"],
    lineHeight: [1.25, 1.5],
    letterSpacing: "heading",
    mt: "1rem",
    textDecoration: "underline",
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
              Ovo obaveštenje se daje u skladu sa Zakonom o zaštiti podataka o
              ličnosti (&quot;Sl. glasnik RS&quot;, br. 87/2018, u daljem
              tekstu: Zakon), u koji zakon su implementirane odredbe direktive
              Evropske unije GDPR (General Data Protection Regulation), radi
              Vašeg upoznavanja sa uslovima prikupljanja i dalje obrade podataka
              o ličnosti od strane rukovaoca – FlatMe platforme, registrovane na
              internet domenu{" "}
              <Link
                path="https://www.flat-me.com"
                label="https://www.flat-me.com"
              />
              , u cilju prikupljanja javno dostupnih podataka o objavljenim
              oglasima za prodaju ili izdavanje nekretnina i omogućavanja
              pretrage istih od strane korisnika (u daljem tekstu: FlatMe
              platforma ili Platforma). FlatMe se obavezuje da, u skladu sa
              zakonom, poštuje i zaštiti privatnost ličnih podataka svakog
              pojedinačnog posetioca, odnosno korisnika Platforme (u daljem
              tekstu: Korisnik).
            </Text>
            <Text as="p" sx={styles.subdescription}>
              Obaveštenje o politici privatnosti i uslovima obrade podataka o
              ličnosti sadrži informacije o vrsti ličnih podataka koji se
              obrađuju, pravnom osnovu i svrsi obrade ličnih podataka, načinu
              prikupljanja i obrade podataka, pravima lica na koja se podaci
              odnose, o rukovaocu, obrađivačima, primaocima ličnih podataka i
              trećim licima, vremenskom periodu čuvanja podataka o ličnosti i
              izmenama i dopunama ove politike privatnosti.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              Poštovani korisnici, molimo Vas da, pre korišćenja naših usluga,
              pažljivo pročitate ove uslove prikupljanja i obrade podataka o
              ličnosti. Svaka poseta internet stranici{" "}
              <Link
                path="https://www.flat-me.com"
                label="https://www.flat-me.com"
              />
              , prijavljivanje na FlatMe obaveštenja, pretraga sajta, kao i
              direktno dostavljanje podataka od strane korisnika, znači da ste
              ove uslove pročitali i da se sa njima slažete u celosti. U slučaju
              da su navedeni uslovi za Vas neprihvatljivi, molimo Vas da ne
              koristite ovu internet stranicu.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              Politika privatnosti je sastavni deo Uslova korišćenja FlatMe
              platforme koji su objavljeni na adresi:{" "}
              <Link
                path="https://www.flat-me.com/terms-and-conditions"
                label="https://www.flat-me.com/terms-and-conditions"
              />
               . Na ovaj tekst, kao i na njegove moguće izmene i dopune
              primenjuju se relevantni zakonski propisi Republike Srbije. Izmene
              i dopune Politike privatnosti stupaju na snagu odmah,
              objavljivanjem na ovoj stranici.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              Datum poslednjeg ažuriranja: 18.5.2022.
            </Text>
            <Heading sx={styles.subtitle}>Podaci koji se prikupljaju</Heading>
            <Text as="p" sx={styles.subdescription}>
              FlatMe platforma prikuplja samo nužne i osnovne podatke o
              korisnicima, uz strogo poštovanje njihove privatnosti. Podaci koji
              se prikupljaju obuhvataju podatke koji se automatski prikupljaju
              prilikom Vaše posete sajtu, kao i podatke koje Korisnik sam
              direktno unese prilikom prijave na FlatMe obaveštenja, a koje
              odgovaraju izabranim kriterijumima i/ili podaci koje unese
              prilikom kontaktiranja Platforme na bilo koji drugi način. Podaci
              koji se prikupljaju i obrađuju na navedene načine svakako
              obuhvataju adresu elektronske pošte Korisnika, dok mogu obuhvatati
              i druge informacije o podatke o lokaciji, vremenu pristupa
              internet stranici, vrsti pretraživača, operativnom sistemu Vašeg
              računara, tokenu i drugo.
            </Text>
            <Heading sx={styles.subtitle}>
              Pravni osnov obrade podataka o ličnosti
            </Heading>
            <Text as="p" sx={styles.subdescription}>
              Shodno Zakonu o zaštiti podataka o ličnosti, podatak o ličnosti je
              svaki podatak koji se odnosi na fizičko lice čiji je identitet
              određen ili odrediv, neposredno ili posredno, posebno na osnovu
              oznake identiteta, kao što je ime i identifikacioni broj, podataka
              o lokaciji, identifikatora u elektronskim komunikacionim mrežama
              ili jednog, odnosno više obeležja njegovog fizičkog, fiziološkog,
              genetskog, mentalnog, ekonomskog, kulturnog i društvenog
              identiteta, dok je lice na koje se podaci odnose fizičko lice čiji
              se podaci o ličnosti obrađuju.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              Pod obradom podataka o ličnosti se podrazumeva svaka radnja ili
              skup radnji koje se vrše automatizovano ili neautomatizovano sa
              podacima o ličnosti ili njihovim skupovima, kao što su
              prikupljanje, beleženje, razvrstavanje, grupisanje, odnosno
              strukturisanje, pohranjivanje, upodobljavanje ili menjanje,
              otkrivanje, uvid, upotreba, otkrivanje prenosom, odnosno
              dostavljanjem, umnožavanje, širenje ili na drugi način činjenje
              dostupnim, upoređivanje, ograničavanje, brisanje ili uništavanje.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              U skladu sa članom 12. Zakona o zaštiti podataka o ličnosti,
              obradu Vaših podataka o ličnosti FlatMe platforma može zasnivati
              na sledećim pravnim osnovima:
            </Text>
            <Text as="p" sx={styles.subdescription}>
              - Dali ste pristanak na obradu svojih podataka o ličnosti za jednu
              ili više posebno određenih svrha. Posećivanjem naše internet
              stranice, kreiranjem naloga na istoj, prijavljivanjem na FlatMe
              obaveštenja, odnosno davanjem odobrenja za prijem obaveštenja ili
              ponovnim uključivanjem obaveštenja, kao i direktnim pružanjem
              svojih podataka o ličnosti, dajete svoj pristanak rukovaocu da
              prikupi i obradi Vaše podatke o ličnosti;
            </Text>
            <Text as="p" sx={styles.subdescription}>
              - Poštovanje pravnih obaveza rukovaoca;
            </Text>
            <Text as="p" sx={styles.subdescription}>
              - Zaštita životno važnih interesa lica na koje se podaci odnose
              ili drugog fizičkog lica;
            </Text>
            <Text as="p" sx={styles.subdescription}>
              - Obrada je neophodna u cilju obavljanja poslova u javnom interesu
              ili izvršenja zakonom propisanih ovlašćenja rukovaoca;
            </Text>
            <Text as="p" sx={styles.subdescription}>
              - Obrada je neophodna u cilju ostvarivanja legitimnih interesa
              rukovaoca ili treće strane, osim ako su nad tim interesima
              pretežniji interesi ili osnovna prava i slobode lica na koje se
              podaci odnose koji zahtevaju zaštitu podataka o ličnosti, a
              posebno ako je lice na koje se podaci odnose maloletno lice.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              FlatMe platforma, kao rukovalac, predočava korisnicima našeg sajta
              da sve podatke o ličnosti obrađuje zakonito, pošteno i
              transparentno u odnosu na lice na koje se podaci odnose, u skladu
              sa Zakonom o zaštiti podataka o ličnosti i drugim relevantnim
              zakonima i prikuplja podatke u svrhe koje su konkretno određene,
              izričite, opravdane i zakonite i dalje se ne mogu obrađivati na
              način koji nije u skladu sa tim svrhama. Podaci o ličnosti koji se
              prikupljaju i obrađuju moraju biti primereni, bitni i ograničeni
              na ono što je neophodno u odnosu na svrhu obrade, kao i tačni i,
              ako je to neophodno, ažurirani. Uzimajući u obzir svrhu obrade,
              preduzećemo sve razumne mere kojima se obezbeđuje da se netačni
              podaci o ličnosti bez odlaganja izbrišu ili isprave. Prikupljeni
              podaci o ličnosti se čuvaju u obliku koji omogućava identifikaciju
              lica samo u roku koji je neophodan za ostvarivanje svrhe obrade i
              obrađuju se na način koji obezbeđuje odgovarajuću zaštitu podataka
              o ličnosti, uključujući i zaštitu od neovlašćene i nezakonite
              obrade, kao i od slučajnog gubitka, uništenja ili oštećenja
              primenom odgovarajućih tehničkih, organizacionih i kadrovskih
              mera.
            </Text>
            <Heading sx={styles.subtitle}>Svrha obrade podataka</Heading>
            <Text as="p" sx={styles.subdescription}>
              U skladu sa legitimnim interesima FlatMe platforme, rukovalac
              prikuplja i obrađuje podatke o ličnosti sa minimalnim uticajem na
              privatnost korisnika, na način uravnotežen i usklađen sa
              interesima, pravima i slobodama korisnika, a sve u cilju:
            </Text>
            <Text as="p" sx={styles.subdescription}>
              - Odgovaranja na upit ili zahtev korisnika i pružanja najbolje
              moguće usluge, odnosno korisničke podrške;
            </Text>
            <Text as="p" sx={styles.subdescription}>
              - Pružanja obaveštenja o nekretninama koja odgovaraju Vašim
              interesovanjima i zadatim kriterijumima;
            </Text>
            <Text as="p" sx={styles.subdescription}>
              - Filtriranja sadržaja internet stranice koji je prilagođen Vašim
              interesovanjima, u cilju olakšavanja pretrage i pružanja
              personalizovane ponude;
            </Text>
            <Text as="p" sx={styles.subdescription}>
              - Pohranjivanja bilo kojeg popisa liste želja, koje korisnici
              internet stranice mogu kreirati;
            </Text>
            <Text as="p" sx={styles.subdescription}>
              - Obaveštavanja korisnika o promenama odredaba, uslova i pravila
              poslovanja i/ili drugih administrativnih podataka;
            </Text>
            <Text as="p" sx={styles.subdescription}>
              - Otkrivanja i/ili sprečavanja zloupotrebe ili prevare.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              Ukoliko se naknadno pojavi potreba za obradom podataka o ličnosti
              u svrhu koja je različita od one za koju su podaci prikupljeni,
              FlatMe će Korisnicima, pre započinjanja dalje obrade, pružiti
              informacije o toj drugoj svrsi, kao i sve ostale informacije u
              skladu sa sa važećom zakonskom regulativom.
            </Text>
            <Heading sx={styles.subtitle}>
              Način prikupljanja podataka o ličnosti
            </Heading>
            <Text as="p" sx={styles.subdescription}>
              Rukovalac automatski prikuplja određene podatke o ličnosti
              prilikom posete korisnika internet stranici i bez Vaše aktivnosti,
              kao i prilikom pretraživanja naše internet stranice. Prilikom
              pristupanja internet adresi{" "}
              <Link
                path="https://www.flat-me.com"
                label="https://www.flat-me.com"
              />{" "}
              prikupljamo pojedine podatke koji mogu uključiti podatke o hard
              disku ili softveru Vašeg računara (vrsta pretraživača, operativni
              sistem Vašeg računara, domen, vreme pristupa, lokacija), koji
              podaci obezbeđuju nesmetano uspostavljanje veze, procenu
              bezbednosti i stabilnosti sistema, te omogućavaju da svakom
              posetiocu pružimo prilagođen korisnički pristup internet stranici.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              Sve gorenavedene podatke FlatMe prikuplja u cilju boljeg
              razumevanja korisničkog ponašanja i pružanja bolje korisničke
              usluge, korišćenjem analitičkog softvera trećih lica, konkretno:
              Google Analytics. Podaci prikupljeni od strane Google Analytics-a
              nisu ni na koji način povezani sa ličnim podacima Korisnika.{" "}
            </Text>
            <Heading sx={styles.smalltitle}>
              FlatMe obaveštenja i poruke
            </Heading>
            <Text as="p" sx={styles.subdescription}>
              Ukoliko želite da redovno budete informisani o novostima u vezi
              FlatMe aplikacije, odnosno o novim nekretninama koje se pojave na
              tržištu i koje odgovaraju Vašim interesovanjima, neophodno je da
              unesete svoju adresu elektronske pošte na stranici FlatMe
              obaveštenja. Popunjavanjem upita na navedenoj stranici, pružate
              nam Vaše podatke o ličnosti, te dajete svoju saglasnost za
              korišćenje, čuvanje, analiziranje istih podataka od strane
              rukovaoca, u skladu sa Zakonom o zaštiti podataka o ličnosti i
              drugim relevantnim zakonima.{" "}
            </Text>
            <Text as="p" sx={styles.subdescription}>
              Takođe, možete odlučiti da nam date svoje podatke i direktnim
              kontaktiranjem FlatMe platforme putem elektronske pošte, tom
              prilikom dajete svoju saglasnost da rukovalac može koristiti i
              obrađivati tako pružene podatke o ličnosti.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              FlatMe platforma korisnicima može povremeno slati poruke u cilju
              obaveštavanja istih o tehničkim, poslovnim ili zakonskim promenama
              i/ili novostima koje se odnose na rad FlatMe platforme.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              U svakoj e-mail poruci koju Korisnik dobije od FlatMe platforme se
              nalazi i veza za direktno otkazivanje daljeg prijema istih.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              Ukoliko dozvolite prijem obaveštenja, generisaće se token koji
              jedinstveno određuje Vaš internet pregledač, koji token se čuva i
              koristi u svrhe slanja obaveštenja tačno određenom korisniku za
              čiji pregledač je token generisan, a sve u cilju olakšavanja
              pretrage i pružanja personalizovane usluge. U svakom trenutku
              možete blokirati dalji prijem obaveštenja, kada Vaš token postaje
              nevalidan, dok će se prilikom ponovnog uključivanja obaveštenja
              generisati novi token. U slučaju da korisnik isključi prijem
              obaveštenja u okviru aplikacije, isti više neće primati
              obaveštenja, ali će prethodno generisani token ostati validan, te
              će se prilikom ponovnog uključivanja obaveštenja, koristiti već
              postojeći token.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              Podatke o ličnosti rukovalac, obrađivač, primalac podataka,
              odnosno treće lice, prikupljaju i obrađuju, na gore navedene
              načine, u skladu sa svojim legitimnim interesom, shodno članu 12.
              stavu 1. tački 6) Zakona o zaštiti podataka o ličnosti.
            </Text>
            <Heading sx={styles.smalltitle}>Veza sa drugim portalima</Heading>
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
            <Heading sx={styles.subtitle}>
              Obrađivači i primaoci podataka o ličnosti i treća lica
            </Heading>
            <Text as="p" sx={styles.subdescription}>
              U cilju efikasnijeg i sigurnijeg prikupljanja i obrade podataka o
              ličnosti, FlatMe platforma, kao rukovalac, može odrediti jednog
              ili više obrađivača, koji u potpunosti garantuju primenu
              odgovarajućih tehničkih, organizacionih i kadrovskih mera, na
              način koji obezbeđuje da se obrada podataka o ličnosti vrši u
              skladu sa odredbama Zakona o zaštiti podataka o ličnosti i da se
              obezbeđuje zaštita prava lica na koje se podaci odnose.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              Rukovalac, na osnovu ugovora ili drugog pravno obavezujućeg akta
              koji je zaključen u pismenom obliku, angažuje obrađivače,
              isključivo u cilju prikupljanja i obrade Vaših podataka o
              ličnosti. Obrađivači su dužni da se pridržavaju strogih
              sigurnosnih postupaka prilikom obrade navedenih podataka, koji
              postupci se odnose na predmet, trajanje, prirodu i svrhu obrade,
              vrstu podataka o ličnosti i vrstu lica o kojima se podaci
              obrađuju, sve u skladu sa uputstvima FlatMe platforme, ugovorom
              ili drugim aktom i Zakonom o zaštiti podataka o ličnosti.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              Obrađivač podataka o ličnosti može poveriti obradu drugom
              obrađivaču samo ako ga rukovalac za to ovlasti na osnovu opšteg
              ili posebnog pismenog ovlašćenja.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              Rukovalac može preneti podatke o ličnosti nadležnim državnim
              organima, pravnim savetnicima, eksternim konsultantima, poslovnim
              partnerima, sve u skladu sa relevantnim odredbama Zakona o zaštiti
              podataka o ličnosti.
            </Text>
            <Heading sx={styles.subtitle}>
              Vremenski rok čuvanja podataka o ličnosti
            </Heading>
            <Text as="p" sx={styles.subdescription}>
              Podaci o ličnosti koje dostavite prilikom posete internet
              stranici, kao i oni podaci za čiju obradu naknadno date svoju
              saglasnost, čuvaju se onoliko dugo koliko je potrebno da bi se
              ispunila svrha obrade ili da bi se ispoštovale odredbe Zakona o
              zaštiti podataka o ličnosti i drugih relevantnih zakona.
            </Text>
            <Text
              as="p"
              sx={styles.subdescription}
              dangerouslySetInnerHTML={{
                __html: `Podatke koje Korisnik ostavi prilikom prijave na obaveštenja o novim nekretninama koje se pojave na tržištu, a koje odgovaraju njegovim izabranim kriterijumima i/ili podaci koje unese prilikom prijave na obaveštenja o novostima u vezi FlatMe platforme se čuvaju dok isti ne zatraži da se izbrišu putem “Odjavi me” veze u e-mail poruci koju primi od FlatMe platforme ili slanjem zahteva na e-mail adresu: <a href="mailto:info@flat-me.com">info@flat-me.com</a>.`,
              }}
            />
            <Text as="p" sx={styles.subdescription}>
              Prikupljeni podaci u vezi podnošenja upita ili zahteva, čuvaju se
              za ono vreme koje je potrebno da bi se udovoljilo Vašem zahtevu
              ili upitu.{" "}
            </Text>
            <Text as="p" sx={styles.subdescription}>
              Po isteku perioda čuvanja, podatke o ličnosti ćemo obrisati ili
              iste učiniti anonimnim, na takav način da se pomenuti podaci ne
              mogu dovesti u vezu sa određenim pojedincem. Takođe, obaveštavamo
              Vas da saglasnost za obradu podataka o ličnosti, koju ste izričito
              dali, možete opozvati u svakom trenutku. Navedeni opoziv pristanka
              ne utiče na dopuštenost obrade podataka o ličnosti, koja je vršena
              na osnovu pristanka pre opoziva.
            </Text>
            <Heading sx={styles.subtitle}>Maloletnici</Heading>
            <Text as="p" sx={styles.subdescription}>
              Maloletno lice koje je mlađe od 15 godina, ne sme da koristi našu
              internet stranicu, koja internet stranica nije dizajnirana na
              način da privuče bilo koje lice koje je mlađe od 15 godina. Za
              obradu podataka o ličnosti maloletnika mlađeg od 15 godina,
              neophodno je da pristanak za obradu da roditelj koji vrši
              roditeljsko pravo, odnosno drugi zakonski zastupnik maloletnog
              lica, u skladu sa Zakonom o zaštiti podataka o ličnosti i drugim
              relevantnim zakonima.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              U cilju utvrđivanja da li je pristanak dao roditelj koji vrši
              roditeljsko pravo, odnosno drugi zakonski zastupnik maloletnog
              lica, rukovalac će preduzeti sve razumne mere, uzimajući u obzir
              dostupne tehnologije.
            </Text>

            <Heading sx={styles.subtitle}>
              Prava lica na koje se podaci o ličnosti odnose
            </Heading>
            <Heading sx={styles.smalltitle}>
              Transparentnost i načini ostvarivanja prava
            </Heading>
            <Text as="p" sx={styles.subdescription}>
              Rukovalac je dužan da preduzme odgovarajuće mere da bi licu na
              koje se podaci odnose pružio sve informacije koje su predviđene
              Zakonom o zaštiti podataka o ličnosti, odnosno informacije u vezi
              sa ostvarivanjem prava lica, na sažet, transparentan, razumljiv i
              lako dostupan način, korišćenjem jasnih i jednostavnih reči, a
              posebno ako se radi o informaciji koja je namenjena maloletnom
              licu. Te informacije pružaju se u pismenom ili drugom obliku,
              uključujući i elektronski oblik, ako je to pogodno. Ako lice na
              koje se podaci odnose to zahteva, informacije se mogu pružiti
              usmeno, pod uslovom da je identitet lica nesumnjivo utvrđen.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              Rukovalac je dužan da licu na koje se podaci odnose, pruži pomoć u
              ostvarivanju njegovih prava na pristup podacima, ispravku, dopunu
              i brisanje podataka o ličnosti, ograničenje obrade, obaveštavanje
              povodom ispravke, brisanja, ograničavanja obrade i povrede
              podataka, zatim prava na prenosivost podataka, prigovor,
              automatizovano donošenje pojedinačnih odluka i profilisanje, osim
              ako rukovalac predoči da nije u mogućnosti da identifikuje lice.
            </Text>
            <Text as="p" sx={styles.subdescription}>
              Ako rukovalac opravdano sumnja u identitet lica koje je podnelo
              zahtev u vezi sa ostvarivanjem svojih prava, rukovalac može da
              zahteva dostavljanje dodatnih informacija neophodnih za potvrdu
              identiteta lica.
            </Text>
            <Heading sx={styles.smalltitle}>Pravo na informisanje</Heading>
            <Text as="p" sx={styles.subdescription}>
              Rukovalac je dužan da, u trenutku prikupljanja podataka o
              ličnosti, licu na koje se podaci odnose, pruži informacije o
              identitetu i kontakt podacima rukovaoca, kontakt podacima lica za
              zaštitu podataka o ličnosti, ukoliko je ono određeno, o svrsi
              nameravane obrade i pravnom osnovu za obradu, o postojanju
              legitimnog interesa rukovaoca ili treće strane, o primaocu,
              odnosno grupi primalaca podataka o ličnosti, kao i informacije
              koje su vezane za iznošenje podataka o ličnosti u drugu državu ili
              međunarodnu organizaciju.{" "}
            </Text>
            <Heading sx={styles.smalltitle}>Pravo pristupa</Heading>
            <Text as="p" sx={styles.subdescription}>
              Lice na koje se podaci odnose ima pravo da od rukovaoca zahteva
              informaciju o tome da li obrađuje njegove podatke o ličnosti,
              pristup tim podacima, kao i sledeće informacije:
            </Text>
            <Text as="p" sx={styles.subdescription}>
              - o svrsi obrade;
            </Text>
            <Text as="p" sx={styles.subdescription}>
              - o vrstama podataka o ličnosti koji se obrađuju;
            </Text>
            <Text as="p" sx={styles.subdescription}>
              - o primaocu ili vrstama primalaca kojima su podaci o ličnosti
              otkriveni ili će im biti otkriveni, a posebno primaocima u drugim
              državama ili međunarodnim organizacijama;
            </Text>
            <Text as="p" sx={styles.subdescription}>
              - o predviđenom roku čuvanja podataka o ličnosti, ili ako to nije
              moguće, o kriterijumima za određivanje tog roka;
            </Text>
            <Text as="p" sx={styles.subdescription}>
              - o postojanju prava da se od rukovaoca zahteva ispravka ili
              brisanje njegovih podataka o ličnosti, prava na ograničenje obrade
              i prava na prigovor na obradu;
            </Text>
            <Text as="p" sx={styles.subdescription}>
              - o pravu da se podnese pritužba Povereniku;
            </Text>
            <Text as="p" sx={styles.subdescription}>
              - dostupne informacije o izvoru podataka o ličnosti, ako podaci o
              ličnosti nisu prikupljeni od lica na koje se odnose;
            </Text>
            <Text as="p" sx={styles.subdescription}>
              - o postojanju postupka automatizovanog donošenja odluke,
              uključujući profilisanje i, najmanje u tim slučajevima,
              svrsishodne informacije o logici koja se pri tome koristi, kao i o
              značaju i očekivanim posledicama te obrade po lice na koje se
              podaci odnose;
            </Text>
            <Text as="p" sx={styles.subdescription}>
              - o odgovarajućim merama zaštite koje se odnose na prenos
              podataka, ukoliko se podaci o ličnosti prenose u drugu državu ili
              međunarodnu organizaciju.
            </Text>
            <Heading sx={styles.smalltitle}>Pravo na ispravku i dopunu</Heading>
            <Text as="p" sx={styles.subdescription}>
              Lice na koje se podaci odnose ima pravo da se njegovi netačni
              podaci o ličnosti bez nepotrebnog odlaganja isprave. U zavisnosti
              od svrhe obrade, lice na koje se podaci odnose ima pravo da svoje
              nepotpune podatke o ličnosti dopuni, što uključuje i davanje
              dodatne izjave.{" "}
            </Text>

            <Heading sx={styles.smalltitle}>
              Pravo na brisanje podataka o ličnosti
            </Heading>
            <Text as="p" sx={styles.subdescription}>
              Lice na koje se podaci odnose, ima pravo da podnese zahtev da se
              njegovi podaci o ličnosti izbrišu od strane rukovaoca ukoliko:
              navedeni podaci više nisu neophodni za ostvarivanje svrhe zbog
              koje su prikupljeni ili na drugi način obrađivani; lice na koje se
              podaci odnose je opozvalo pristanak na osnovu kojeg se vršila
              obrada, a nema drugog pravnog osnova za obradu; su podaci o
              ličnosti nezakonito obrađivani, lice na koje se podaci odnose je
              podnelo prigovor za obradu; podaci o ličnosti moraju biti
              izbrisani u cilju izvršenja zakonskih obaveza rukovaoca, kao i u
              drugim slučajevima određenim Zakonom o zaštiti podataka o
              ličnosti.{" "}
            </Text>
            <Text as="p" sx={styles.subdescription}>
              Rukovalac će, po zahtevu lica na koje se podaci odnose, postupiti
              u skladu sa relevantnim zakonskim odredbama.{" "}
            </Text>

            <Heading sx={styles.smalltitle}>
              Pravo na ograničenje obrade
            </Heading>
            <Text as="p" sx={styles.subdescription}>
              U posebnim okolnostima, koje su propisane Zakonom o zaštiti
              podataka o ličnosti, imate pravo na ograničenje obrade Vaših
              ličnih podataka. Svoja prava koja su vezana za ograničenje obrade
              možete ostvariti i obraćanjem Povereniku za informacije od javnog
              značaja i zaštitu podataka o ličnosti (u daljem tekstu:
              Poverenik).
            </Text>

            <Heading sx={styles.smalltitle}>
              Pravo na prenosivost podataka
            </Heading>
            <Text as="p" sx={styles.subdescription}>
              Lice na koje se podaci odnose ima pravo da njegove podatke o
              ličnosti, koje je prethodno dostavilo rukovaocu, primi od njega u
              strukturisanom, uobičajeno korišćenom i elektronski čitljivom
              obliku i ima pravo da ove podatke prenese drugom rukovaocu bez
              ometanja od strane rukovaoca kojem su ti podaci bili dostavljeni,
              ukoliko se obrada zasniva na pristanku, po osnovu ugovora ili se
              obrada vrši automatizovano, kao i pravo da njegovi podaci o
              ličnosti budu neposredno preneti drugom rukovaocu od strane
              rukovaoca kojem su ovi podaci prethodno dostavljeni, ako je to
              tehnički izvodljivo.
            </Text>

            <Heading sx={styles.smalltitle}>Pravo na prigovor</Heading>
            <Text as="p" sx={styles.subdescription}>
              Lice na koje se podaci odnose ima pravo da u svakom trenutku
              podnese rukovaocu prigovor na obradu svojih podataka o ličnosti,
              koja obrada se vrši u skladu sa javnim interesom ili izvršenjem
              zakonom propisanih ovlašćenja rukovaoca ili u cilju ostvarivanja
              legitimnih interesa rukovaoca, uključujući i profilisanje, ukoliko
              lice na koje se podaci odnose smatra da je podnošenje prigovora
              opravdano u odnosu na posebnu situaciju u kojoj se nalazi.
            </Text>

            <Heading sx={styles.smalltitle}>
              Automatizovano donošenje pojedinačnih odluka i profilisanje
            </Heading>
            <Text as="p" sx={styles.subdescription}>
              Lice na koje se podaci odnose ima pravo da se na njega ne
              primenjuje odluka doneta isključivo na osnovu automatizovane
              obrade, uključujući i profilisanje, ako se tom odlukom proizvode
              pravne posledice po to lice ili ta odluka značajno utiče na njegov
              položaj.
            </Text>

            <Heading sx={styles.smalltitle}>
              Pravo na povlačenje pristanka
            </Heading>
            <Text as="p" sx={styles.subdescription}>
              U svakom trenutku imate pravo da povučete pristanak za obradu
              podataka o ličnosti. Povlačenje saglasnosti neće uticati na
              zakonitost obrade za period pre povlačenja pristanka.
            </Text>

            <Heading sx={styles.smalltitle}>
              Pravo na pritužbu i sudsku zaštitu
            </Heading>
            <Text as="p" sx={styles.subdescription}>
              Lice na koje se podaci odnose ima pravo da podnese pritužbu
              Povereniku ako smatra da je obrada podataka o njegovoj ličnosti
              izvršena suprotno odredbama Zakona o zaštiti podataka o ličnosti,
              kao i pravo na sudsku zaštitu ako smatra da mu je, suprotno istom
              zakonu, od strane rukovaoca ili obrađivača radnjom obrade njegovih
              podataka o ličnosti povređeno pravo propisano zakonom. Podnošenje
              tužbe sudu ne utiče na pravo ovog lica da pokrene druge postupke
              upravne ili sudske zaštite.
            </Text>

            <Heading sx={styles.smalltitle}>
              Način ostvarivanja Vaših prava
            </Heading>
            <Text as="p" sx={styles.subdescription}>
              Sva prava možete ostvariti upućivanjem upita ili zahteva
              rukovaocu, putem elektronske pošte, ili na drugi prigodan način,
              kojom prilikom je neophodno da se identifikujete, u cilju
              postupanja po Vašem zahtevu. FlatMe platforma će postupiti po
              osnovu Vašeg zahteva, u skladu sa rokovima i uslovima, koji su
              propisani Zakonom o zaštiti podataka o ličnosti i drugim
              relevantnim zakonima.
            </Text>

            <Heading sx={styles.subtitle}>
              Izmene i dopune politike privatnosti
            </Heading>
            <Text as="p" sx={styles.subdescription}>
              Politika privatnosti FlatMe platforme može biti promenjena u cilju
              usklađivanja sa pozitivnopravnim propisima, pri čemu će izmene
              biti odmah dostupne na sledećoj adresi{" "}
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
