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
  price: PropTypes.number.isRequired,
  rentOrSale: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  structure: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
});

export const apartmentListPropType = PropTypes.arrayOf(apartmentPropType);

export const filtersPropType = PropTypes.shape({
  minPrice: PropTypes.number.isRequired,
  maxPrice: PropTypes.number.isRequired,
  municipalities: PropTypes.arrayOf(PropTypes.string).isRequired,
  rentOrSale: PropTypes.string.isRequired,
  structures: PropTypes.arrayOf(stringOrNumberPropType).isRequired,
});

export const verificationPagePropTypes = {
  errorMessage: PropTypes.string.isRequired,
  successMessage: PropTypes.string.isRequired,
  successMessageDescription: PropTypes.string.isRequired,
  verify: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
