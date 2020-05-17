import axios from "axios";
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  CONTACTS_LOADING,
  LOGOUT_CONTACTS,
  FAVORITE_CONTACT,
  SEARCH_CONTACT,
  ADD_LABEL,
} from "./types";

export const getContacts = (subID) => (dispatch) => {
  dispatch(setContactsLoading());
  axios
    .get("/contacts/allContacts/", { params: { subID } })
    .then((res) =>
      dispatch({
        type: GET_CONTACTS,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

export const deleteContact = (id, subID) => (dispatch) => {
  axios
    .delete("/contacts/" + id, { params: { subID } })
    .then((res) =>
      dispatch({
        type: DELETE_CONTACT,
        payload: id,
      })
    )
    .catch((err) => console.log(err));
};

export const toggleFavorite = (id, subID) => (dispatch) => {
  console.log("Before axios");
  console.log(id);
  console.log(subID);
  axios
    .post("/contacts/togglefavorite/" + id, { subID })
    .then((res) =>
      dispatch({
        type: FAVORITE_CONTACT,
        payload: id,
      })
    )
    .catch((err) => console.log(err));
};

export const addContact = (contact, subID) => (dispatch) => {
  console.log(subID);
  axios
    .post("/contacts/add", contact, { params: { subID } })
    .then((res) =>
      dispatch({
        type: ADD_CONTACT,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

export const setContactsLoading = () => {
  return {
    type: CONTACTS_LOADING,
  };
};

export const logoutContacts = () => (dispatch) => {
  dispatch({
    type: LOGOUT_CONTACTS,
  });
};

export const searchContact = (search) => (dispatch) => {
  dispatch({
    type: SEARCH_CONTACT,
    payload: search,
  });
};

export const addLabel = (label, subID) => (dispatch) => {
  console.log(label);
  axios
    .post("/contacts/addLabel", { label }, { params: { subID } })
    .then((res) =>
      dispatch({
        type: ADD_LABEL,
        payload: label,
      })
    )
    .catch((err) => console.log(err));
};
