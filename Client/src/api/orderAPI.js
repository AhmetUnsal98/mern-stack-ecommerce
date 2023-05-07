import { publicRequest } from "../requestMethods";

export const createOrder = async (order) => {
  try {
    const res = await publicRequest.post("/createOrder", order, {
      headers: {
        token: token,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
