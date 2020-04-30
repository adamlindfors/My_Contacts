import axios from "axios";
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  CONTACTS_LOADING,
} from "./types";

export const getContacts = (idToken) => (dispatch) => {
  dispatch(setContactsLoading());
  axios
    .get("/contacts/", { params: { idToken: idToken } })
    .then((res) =>
      dispatch({
        type: GET_CONTACTS,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

export const deleteContact = (id, idToken) => (dispatch) => {
  axios
    .delete("/contacts/" + id, { params: { idToken: idToken } })
    .then((res) =>
      dispatch({
        type: DELETE_CONTACT,
        payload: id,
      })
    )
    .catch((err) => console.log(err));
};

export const addContact = (contact, idToken) => (dispatch) => {
  axios
    .post("/contacts/add", contact, { params: { idToken: idToken } })
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
