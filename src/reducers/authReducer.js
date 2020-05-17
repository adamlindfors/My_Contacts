import {
  USER_LOGIN,
  USER_LOGOUT,
  SET_AUTH,
  ADD_USER_IMAGE,
  GET_USER_IMAGE,
  USER_IMAGE_LOADING,
} from "../actions/types";

const initialState = {
  token: {},
  Authenticated: null,
  user: null,
  email: null,
  subID: null,
  image:
    "https://res.cloudinary.com/myContacts/image/fetch/g_face,c_fill,r_max,w_250,h_250/https://res.cloudinary.com/mycontacts/image/upload/v1589640571/myContacts/g1gk0riburccmbjzxgzr.png",
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        token: localStorage.getItem("okta-token-storage"),
        Authenticated: true,
        user: JSON.parse(localStorage.getItem("okta-token-storage")).idToken
          .claims.name,
        email: JSON.parse(localStorage.getItem("okta-token-storage")).idToken
          .claims.email,
        subID: JSON.parse(localStorage.getItem("okta-token-storage")).idToken
          .claims.sub,
      };
    case USER_LOGOUT:
      return {
        state: initialState,
      };
    case SET_AUTH:
      return {
        ...state,
        Authenticated: action.payload,
      };
    case ADD_USER_IMAGE:
      return {
        ...state,
        image:
          "https://res.cloudinary.com/myContacts/image/fetch/g_face,c_fill,r_max,w_250,h_250/" +
          action.payload,
      };
    case GET_USER_IMAGE:
      return {
        ...state,
        image:
          "https://res.cloudinary.com/myContacts/image/fetch/g_face,c_fill,r_max,w_250,h_250/" +
          action.payload,
      };
    case USER_IMAGE_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
