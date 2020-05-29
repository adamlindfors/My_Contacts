import axios from "axios";
import { ADD_LABEL, GET_LABELS, SET_LABEL, DELETE_LABEL } from "./types";

export const setLabel = (label) => (dispatch) => {
  dispatch({
    type: SET_LABEL,
    payload: label,
  });
};

export const deleteLabel = (label, subID) => (dispatch) => {
  axios
    .delete("/contacts/deletelabel", { params: { label, subID } })
    .then((res) =>
      dispatch({
        type: DELETE_LABEL,
        payload: label,
      })
    );
};

export const addLabel = (label, subID) => (dispatch) => {
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

export const getLabels = (subID) => (dispatch) => {
  axios
    .get("/contacts/getLabels", { params: { subID } })
    .then((res) => {
      dispatch({
        type: GET_LABELS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
