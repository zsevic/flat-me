import React from "react";
import { priceFormatter } from "components/FiltersForm/utils";
import { apartmentPropType } from "utils/prop-types";

export const Price = ({ apartment }) =>
  apartment.currentPrice &&
  Number(apartment.currentPrice) !== Number(apartment.price) ? (
    <>
      <del>{apartment.price}</del> {priceFormatter(apartment.currentPrice)}
      {apartment.rentOrSale === "sale"
        ? ` (${Math.floor(apartment.currentPrice / apartment.size)}€/m²)`
        : ""}
    </>
  ) : (
    <>
      {priceFormatter(apartment.price)}
      {apartment.rentOrSale === "sale"
        ? ` (${Math.floor(apartment.price / apartment.size)}€/m²)`
        : ""}
    </>
  );

Price.propTypes = {
  apartment: apartmentPropType.isRequired,
};
