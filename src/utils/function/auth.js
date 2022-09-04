import {
  loginStarted,
  loginError,
  loginSuccess,
  logout as logoutAction,
} from "../../redux/userSlice";
import { AuthAPI } from "../../apis/AuthAPI";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const login = async (dispatch, user) => {
  dispatch(loginStarted());

  try {
    const res = await AuthAPI.login(user);
    cookies.set("user_token", res.token);
    dispatch(loginSuccess(res));
  } catch (error) {
    dispatch(loginError({ message: error.message }));
  }
};

export const logout = async (dispatch, id) => {
  cookies.remove("user_token");
  await AuthAPI.logout(id);
  dispatch(logoutAction());
};
