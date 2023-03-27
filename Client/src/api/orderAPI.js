import { userRequest } from "../requestMethods";

export const createOrder = async (order) => {
  try {
    const res = await userRequest.post("/createOrder", order);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
