export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const HOMEPAGE_META_DESCRIPTION =
  "FlatMe omogućava brz pronalazak dostupnih stanova za iznajmljivanje ili kupovinu koji u potpunosti odgovaraju zadatim kriterijumima. Uštedite vreme, energiju i novac.";
export const HOMEPAGE_TITLE = "FlatMe";
export const DOMAIN_URL = "https://www.flat-me.com";

export const INITIAL_PAGE_NUMBER = 1;
export const INITIAL_PAGE_SIZE = 12;
export const NO_RESULTS_TEXT = "Nema rezultata";

export const RENT_MIN_PRICE = 0;
export const RENT_MAX_PRICE = 500;
export const RENT_SELECTED_MIN_PRICE = 200;
export const RENT_SELECTED_MAX_PRICE = 300;

export const SALE_MIN_PRICE = 0;
export const SALE_MAX_PRICE = 200_000;
export const SALE_SELECTED_MIN_PRICE = 40_000;
export const SALE_SELECTED_MAX_PRICE = 80_000;
export const RENT_OR_SALE_INITIAL_MIN_PRICE = RENT_SELECTED_MIN_PRICE;
export const RENT_OR_SALE_INITIAL_MAX_PRICE = RENT_SELECTED_MAX_PRICE;

export const VERIFICATION_PAGE_NOTIFICATION_DURATION = 5;

export const INITIAL_FILTERS = {
  price: [RENT_OR_SALE_INITIAL_MIN_PRICE, RENT_OR_SALE_INITIAL_MAX_PRICE],
  structures: [1.0, 1.5],
};

export const TRACK_FILTERS_MODAL_TITLE = "Uključi obaveštenja";

export const LOGO_URL = "/assets/logo.png";
export const THEME_COLOR = "#5FE0ED";
