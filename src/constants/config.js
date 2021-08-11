export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const INITIAL_PAGE_NUMBER = 1;
export const INITIAL_PAGE_SIZE = 10;
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
