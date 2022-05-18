import PropTypes from "prop-types";

const stringOrNumberPropType = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
]);

const apartmentPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  apartmentId: PropTypes.string,
  availableFrom: PropTypes.string,
  coverPhotoUrl: PropTypes.string,
  advertiserLogoUrl: PropTypes.string,
  floor: stringOrNumberPropType,
  heatingType: PropTypes.string,
  isFurnished: PropTypes.bool,
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  municipality: PropTypes.string,
  providerName: PropTypes.string,
  place: PropTypes.string,
  postedAt: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  rentOrSale: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  structure: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  url: PropTypes.string.isRequired,
});

export const apartmentListPropType = PropTypes.arrayOf(apartmentPropType);

export const filtersPropType = PropTypes.shape({
  minPrice: PropTypes.number,
  maxPrice: PropTypes.number,
  municipalities: PropTypes.arrayOf(PropTypes.string),
  rentOrSale: PropTypes.string,
  structures: PropTypes.arrayOf(stringOrNumberPropType),
});

export const verificationPagePropTypes = {
  errorMessage: PropTypes.string.isRequired,
  successMessage: PropTypes.string.isRequired,
  successMessageDescription: PropTypes.string.isRequired,
  verify: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
