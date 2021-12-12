import latinize from "latinize";

const isMunicipalityIncluded = (apartment) =>
  !apartment.place ||
  latinize(apartment.place) !== latinize(apartment.municipality);

const isPlaceIncluded = (apartment) =>
  apartment.place &&
  apartment.address &&
  latinize(apartment.place.toLowerCase()) !==
    latinize(apartment.address.toLowerCase());

export const getAddressValue = (apartment) => {
  let addressValue = apartment.address;
  if (isPlaceIncluded(apartment)) {
    addressValue += `, ${apartment.place}`;
  }
  if (isMunicipalityIncluded(apartment)) {
    addressValue += `, ${apartment.municipality}`;
  }

  return addressValue;
};
