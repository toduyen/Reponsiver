import update from "immutability-helper";
import Cookies from "universal-cookie";
import {
  AUTH_AUTHENTICATE_SUCCESS,
  AUTH_GET_USER_INFO_SUCCESS,
  AUTH_GET_USER_INFO_ERROR,
  AUTH_SAVE_LOGGED_USER,
  AUTH_LOGOUT,
} from "actions/action_types";

const cookies = new Cookies();

const initState = {
  isLoggedIn: false,
  jwt: null,
  user: null,
  authorities: [],
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case AUTH_AUTHENTICATE_SUCCESS: {
      return update(state, {
        isLoggedIn: { $set: true },
        jwt: { $set: payload.token || payload.jwt },
      });
    }
    case AUTH_SAVE_LOGGED_USER: {
      const {
        jwt,
        user,
        user: { authorities = [] },
      } = payload;
      cookies.set("jwt", jwt, { secure: false, path: "/" });
      return update(state, {
        jwt: { $set: jwt },
        user: { $set: user },
        authorities: { $set: authorities.map(({ authority }) => authority) },
      });
    }
    case AUTH_LOGOUT: {
      cookies.remove("jwt", { path: "*" });
      cookies.remove("jwt", { path: "/" });
      return { ...initState };
    }
    default:
      return state;
  }
};
