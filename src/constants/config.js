export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const HOMEPAGE_META_DESCRIPTION =
  "FlatMe omogućava brz pronalazak dostupnih stanova za iznajmljivanje ili kupovinu koji u potpunosti odgovaraju zadatim kriterijumima. Uštedite vreme, energiju i novac.";
export const HOMEPAGE_TITLE = "FlatMe";
export const TERMS_AND_CONDITIONS_PAGE_TITLE = "FlatMe | Uslovi korišćenja";
export const DOMAIN_URL = "https://www.flat-me.com";

export const PAGE_SIZE = 12;
export const NO_RESULTS_TEXT = "Nema rezultata";

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

export const TRACK_FILTERS_MODAL_TITLE = "Uključi obaveštenja";
export const APARTMENT_LIST_LOADER_TEXT = "Prikupljaju se rezultati...";

export const LOGO_URL = "/assets/logo.png";
export const THEME_COLOR = "#3366CC";

export const PROVIDER_LOGO_URLS = {
  cetiriZida: "https://www.4zida.rs/assets/images/logos/deo-is-grupe-gray.png",
  cityExpert: "https://cityexpert.rs/images/cxlogo/cityexpert-logo-header.svg",
  haloOglasi:
    "https://www.halooglasi.com/Content/assets/frontend/layout/img/halo-oglasi-nek-aplikacija-icon.png",
};
