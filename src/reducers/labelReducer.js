import {
  ADD_LABEL,
  GET_LABELS,
  SET_LABEL,
  DELETE_LABEL,
} from "../actions/types";

const initialState = {
  labels: [],
  label: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_LABEL:
      return {
        ...state,
        labels: [action.payload, ...state.labels],
      };

    case SET_LABEL:
      return {
        ...state,
        label: action.payload,
      };

    case GET_LABELS:
      return {
        ...state,
        labels: action.payload,
      };

    case DELETE_LABEL:
      return {
        ...state,
        labels: state.labels.filter((label) => label !== action.payload),
      };

    default:
      return state;
  }
}
