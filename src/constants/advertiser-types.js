export const advertiserTypesMap = {
  owner: "vlasnik",
  agency: "agencija",
  investor: "investitor",
};

export const ADVERTISER_TYPES = Object.entries(advertiserTypesMap).map(
  ([value, locale]) => ({
    value,
    locale,
  })
);
