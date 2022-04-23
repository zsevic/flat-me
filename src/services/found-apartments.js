import request from "utils/request";

export const getFoundApartmentList = async (params) => {
  try {
    const apartmentList = await request.get("/found-apartments", {
      params,
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
