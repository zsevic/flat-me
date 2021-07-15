import request from "utils/request";

export const registerUser = async (email) => request.post("/users", { email });

export const verifyUser = async (token) => {
  try {
    await request.post(`/users/verify/${token}`);
  } catch (error) {
    console.error(error);
  }
};
