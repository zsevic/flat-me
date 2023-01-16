import latinize from "latinize";
import { floorsLocaleMap } from "constants/floors";
import { priceFormatter } from 'components/FiltersForm/utils';

const isPlaceIncluded = (apartment) => {
  if (!apartment.address || !apartment.place) return false;
  const apartmentAddressLatinized = latinize(apartment.address.toLowerCase());
  const apartmentMunicipalityLatinized = latinize(
    apartment.municipality.toLowerCase()
  );
  const apartmentPlaceLatinized = latinize(apartment.place.toLowerCase());

  return (
    apartmentPlaceLatinized !== apartmentAddressLatinized &&
    !apartmentAddressLatinized.startsWith(apartmentPlaceLatinized) &&
    apartmentPlaceLatinized !== apartmentMunicipalityLatinized
  );
};

export const getAddressValue = (apartment) => {
  let addressValue = apartment.address;
  if (isPlaceIncluded(apartment)) {
    addressValue += `, ${apartment.place}`;
  }

  return addressValue;
};

export const handleFloor = (floor) =>
  floorsLocaleMap[floor] || `na ${floor}. spratu`;

export const Price = ({ apartment }) => apartment.currentPrice &&
  Number(apartment.currentPrice) !==
    Number(apartment.price) ? (
    <>
      <del>{apartment.price}</del>{" "}
      {priceFormatter(apartment.currentPrice)}
      {apartment.rentOrSale === "sale"
        ? ` (${Math.floor(
            apartment.currentPrice / apartment.size
          )}€/m²)`
        : ""}
    </>
  ) : (
    <>
      {priceFormatter(apartment.price)}
      {apartment.rentOrSale === "sale"
        ? ` (${Math.floor(
            apartment.price / apartment.size
          )}€/m²)`
        : ""}
    </>
  )