import { USER_LOGIN, USER_LOGOUT, SET_AUTH } from "../actions/types";

const initialState = {
  token: {},
  Authenticated: null,
  user: null,
  email: null,
  subID: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
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
    default:
      return state;
  }
}
