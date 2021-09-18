import {
  RENT_PRICE_STEP,
  SALE_MAX_PRICE,
  SALE_PRICE_STEP,
} from "constants/config";

export function priceFormatter(value) {
  return `${value}€`;
}

export function getPriceStep(maxPriceField) {
  if (maxPriceField === SALE_MAX_PRICE) return SALE_PRICE_STEP;

  return RENT_PRICE_STEP;
}
