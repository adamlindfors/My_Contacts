import axios from "axios";
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  CONTACTS_LOADING,
  LOGOUT_CONTACTS,
} from "./types";

export const getContacts = (subID) => (dispatch) => {
  dispatch(setContactsLoading());
  axios
    .get("/contacts/", { params: { subID } })
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

export const addContact = (contact, subID) => (dispatch) => {
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
