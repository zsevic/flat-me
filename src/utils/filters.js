export const getFilters = (values) => {
  const { price, ...filterValues } = values;
  const [minPrice, maxPrice] = price;

  return {
    ...filterValues,
    minPrice,
    maxPrice,
  };
};
