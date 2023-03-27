import { publicRequest } from "../requestMethods";

export const paymentNormal = async (paymentInformations, token) => {
  try {
    const res = await publicRequest.post("/payment", paymentInformations, {
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
export const paymentThreeDs = async (paymentInformations, token) => {
  try {
    const res = await publicRequest.post(
      "/payment/threeds",
      paymentInformations,
      {
        headers: {
          token: token,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
