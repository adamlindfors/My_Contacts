import {
  USER_LOGIN,
  USER_LOGOUT,
  SET_AUTH,
  ADD_USER_IMAGE,
  GET_USER_IMAGE,
  USER_IMAGE_LOADING,
} from "./types";
import axios from "axios";

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

export const addUserImage = (image, subID) => (dispatch) => {
  console.log(image);
  //console.log(subID);
  axios
    .post("/contacts/addUserImage", { image }, { params: { subID } })
    .then((res) =>
      dispatch({
        type: ADD_USER_IMAGE,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

export const getUserImage = (subID) => (dispatch) => {
  console.log("Innan axioss");
  axios
    .get("/contacts/getUserImage/", { params: { subID } })
    .then((res) =>
      dispatch({
        type: GET_USER_IMAGE,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

export const setUserImageLoading = () => {
  return {
    type: USER_IMAGE_LOADING,
  };
};
