import request from "utils/request";

export const getFoundApartmentList = async (token) => {
  try {
    const apartmentList = await request.get("/found-apartments", {
      params: {
        token,
      },
    });

    return apartmentList.data;
  } catch (error) {
    console.error(error);
    return {
      data: [],
      pageInfo: {
        hasNextPage: false,
      },
    };
  }
};
