import { publicRequest } from "../requestMethods";

export const createOrder = async (order) => {
  try {
    const res = await publicRequest.post("/createOrder", order);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
