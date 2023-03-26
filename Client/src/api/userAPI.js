import { loginFailure, loginStart, loginSuccess } from "../redux/userRedux";
import { publicRequest } from "../requestMethods";
//Login Register Api Calls !
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
    console.error(error);
  }
};
export const loginGuest = async (dispatch, { email }) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/login/guest", {
      email: email,
    });
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
    console.log(error);
  }
};
export const register = async (dispatch, user) => {
  try {
    const res = await publicRequest.post("/register", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
    console.log(error);
  }
};
