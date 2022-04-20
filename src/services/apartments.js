import request from "utils/request";

export const getApartmentList = async (filters) => {
  try {
    const apartmentList = await request.get("/apartments", {
      params: filters,
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

export const getFoundApartmentList = async (token) => {
  try {
    const apartmentList = await request.get("/apartments/found", {
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

export const getApartmentStatus = async (id) => {
  const apartmentStatus = await request.get(`/apartments/${id}`);

  return apartmentStatus.data;
};
