import request from "utils/request";

export const getApartmentList = async (filters) => {
  try {
    const apartmentList = await request.get("/apartments", {
      params: filters,
    });

    if (apartmentList.data.data.length > 3) {
      apartmentList.data.data.length = 3;
    }
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

export const getApartmentStatus = async (id) => {
  const apartmentStatus = await request.get(`/apartments/${id}`);

  return apartmentStatus.data;
};
