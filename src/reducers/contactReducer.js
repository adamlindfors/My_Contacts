import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  CONTACTS_LOADING,
  LOGOUT_CONTACTS,
  FAVORITE_CONTACT,
  SEARCH_CONTACT,
  ADD_LABEL,
  GET_LABELS,
  SET_LABEL,
} from "../actions/types";

const initialState = {
  contacts: [],
  loading: false,
  search: "",
  labels: [],
  label: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      };

    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact._id !== action.payload
        ),
      };

    case FAVORITE_CONTACT:
      return {
        ...state,
        //Change state of favorite
      };

    case SEARCH_CONTACT:
      return {
        ...state,
        search: action.payload,
      };

    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
      };

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

    case CONTACTS_LOADING:
      return {
        ...state,
        loading: true,
      };

    case LOGOUT_CONTACTS:
      return {
        state: initialState,
      };

    default:
      return state;
  }
}
