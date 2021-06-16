import request from "utils/request";

export const getApartmentList = async (filters) => {
  try {
    const apartmentList = await request.get("/apartments", {
      params: filters,
    });

    return apartmentList.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
