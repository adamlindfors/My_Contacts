import { USER_LOGIN, USER_LOGOUT, SET_AUTH } from "./types";

export const userLogin = () => (dispatch) => {
  dispatch({
    type: USER_LOGIN,
  });
};

export const userLogout = () => (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });
};

export const setAuth = (auth) => (dispatch) => {
  dispatch({
    type: SET_AUTH,
    payload: auth,
  });
};
