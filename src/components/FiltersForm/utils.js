import {
  RENT_PRICE_STEP,
  SALE_MAX_PRICE,
  SALE_PRICE_STEP,
} from "constants/config";
import { getItem, INITIAL_FILTERS_KEY } from "utils/local-storage";
import { placesMap } from "./data";

export function priceFormatter(value) {
  return `${value}€`;
}

export function getInitialFilters() {
  return getItem(INITIAL_FILTERS_KEY);
}

export function getPriceStep(maxPriceField) {
  if (maxPriceField === SALE_MAX_PRICE) return SALE_PRICE_STEP;

  return RENT_PRICE_STEP;
}

export function handleMunicipalities(formValues) {
  const { municipalities } = formValues;
  const [place] = municipalities;
  if (
    municipalities.length === 1 &&
    Object.hasOwnProperty.call(placesMap, place)
  ) {
    Object.assign(formValues, {
      municipalities: placesMap[place],
    });
  }
}
