export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const HOMEPAGE_META_DESCRIPTION =
  "FlatMe prikuplja sve aktuelne oglase za kupovinu i iznajmljivanje stanova u Beogradu sa različitih veb-sajtova i pretražuje ih za Vas. Prvi saznajte kada se novi stan nađe na tržištu.";
export const HOMEPAGE_TITLE = "FlatMe";
export const APP_TITLE = "FlatMe | Pronađi stan";
export const POLICY_PRIVACY_PAGE_TITLE = "FlatMe | Politika privatnosti";
export const TERMS_AND_CONDITIONS_PAGE_TITLE = "FlatMe | Uslovi korišćenja";
export const DOMAIN_URL = "https://www.flat-me.com";

export const EMAIL_NOTIFICATIONS_SUCCESS_MESSAGE =
  "Proverite mejl (uključujući i deo sa promocijama) za detalje oko potvrde sačuvane pretrage.";
export const VERIFICATION_SUCCESS_MESSAGE =
  "Jednom dnevno ćete primati obaveštenja o novim stanovima na osnovu sačuvane pretrage.";

export const APARTMENT_CARD_LOCALE = "sr";
export const PAGE_SIZE = 12;
export const NO_RESULTS_TEXT = "Nema rezultata";

export const SEARCH_TAB = "1";
export const APARTMENT_LIST_TAB = "2";

export const RENT_MIN_PRICE = 0;
export const RENT_MAX_PRICE = 2000;
export const RENT_SELECTED_MIN_PRICE = 300;
export const RENT_SELECTED_MAX_PRICE = 1300;

export const SALE_MIN_PRICE = 0;
export const SALE_MAX_PRICE = 500_000;
export const SALE_SELECTED_MIN_PRICE = 65_000;
export const SALE_SELECTED_MAX_PRICE = 165_000;
export const RENT_OR_SALE_INITIAL_MIN_PRICE = RENT_SELECTED_MIN_PRICE;
export const RENT_OR_SALE_INITIAL_MAX_PRICE = RENT_SELECTED_MAX_PRICE;

export const SALE_PRICE_STEP = 5000;
export const RENT_PRICE_STEP = 50;

export const VERIFICATION_PAGE_NOTIFICATION_DURATION = 5;

export const INITIAL_FILTERS = {
  price: [RENT_OR_SALE_INITIAL_MIN_PRICE, RENT_OR_SALE_INITIAL_MAX_PRICE],
  structures: [],
};

export const firebaseConfig = {
  apiKey: "AIzaSyC-I6PYtZwd9iiBlceEKqzHIPexlT-X4iA",
  authDomain: "flat-me-2b34d.firebaseapp.com",
  projectId: "flat-me-2b34d",
  storageBucket: "flat-me-2b34d.appspot.com",
  messagingSenderId: "238414106033",
  appId: "1:238414106033:web:e38eca44a89cfe3d0ec190",
  measurementId: "G-1F2ED6J80T",
};

export const EMAIL_NOTIFICATIONS_MODAL_TITLE = "Uključi email obaveštenja";
export const PUSH_NOTIFICATIONS_ACTIVATION_MODAL_TITLE = "Uključi obaveštenja";
export const PUSH_NOTIFICATIONS_UPDATE_MODAL_TITLE =
  "Promeni sačuvanu pretragu";
export const APARTMENT_LIST_LOADER_TEXT = "Prikupljaju se rezultati...";

export const activationType = "activation";
export const deactivationType = "deactivation";

export const CHECK_CIRCLE_FILLED =
  "/assets/images/icons/check-circle-filled.svg";
export const LOGO_URL = "/assets/logo.png";
export const LOGO_ENCODED =
  "data:image/png;base64,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";
export const THEME_COLOR = "#3366CC";

export const PROVIDER_LOGO_URLS = {
  cetiriZida: "https://www.4zida.rs/assets/images/logos/deo-is-grupe-gray.png",
  cityExpert: "https://cityexpert.rs/images/cxlogo/cityexpert-logo-header.svg",
  haloOglasi:
    "https://www.halooglasi.com/Content/assets/frontend/layout/img/halo-oglasi-nek-aplikacija-icon.png",
  sasoMange:
    "https://sasomange.rs/assets/static/images/favicon/favicon-128.png",
};

export const APP_RELATIVE_URL = "/app";
export const CTA_TEXT = "Pronađi stan";

export const GOOGLE_ANALYTICS_TRACKING_ID = "G-3EHB5PVZYW";
