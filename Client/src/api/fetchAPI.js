import { publicRequest } from "../requestMethods";
//Fetching datas from database api
export const getAllProducts = async () => {
  try {
    const res = await publicRequest.get("/products");
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getProductsByCategory = async (category) => {
  try {
    const res = await publicRequest.get(`/products?category=${category}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getCategories = async () => {
  try {
    const res = await publicRequest.get("/categories");
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getUserOrders = async (id) => {
  try {
    const res = await publicRequest.get("/orders/find/" + id);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
