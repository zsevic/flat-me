import request from "utils/request";

export const registerUser = async (email) => {
  try {
    await request.post("/users", {
      email,
    });
  } catch (error) {
    console.error(error);
  }
};

export const verifyUser = async (token) => {
  try {
    await request.post(`/users/verify/${token}`);
  } catch (error) {
    console.error(error);
  }
};
