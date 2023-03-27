import { userRequest } from "../requestMethods";

export const paymentNormal = async (paymentInformations) => {
  try {
    const res = await userRequest.post("/payment", paymentInformations);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const paymentThreeDs = async (paymentInformations) => {
  try {
    const res = await userRequest.post("/payment/threeds", paymentInformations);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
