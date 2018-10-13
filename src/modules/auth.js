// import { GoogleLogout } from 'components/googleAuth'

const type = {
  LOGIN: "auth/LOGIN_REQUEST",
  LOGOUT: "auth/Logut"
};

const initialState = {
  token: localStorage.getItem("token"),
  user: localStorage.getItem("user"),
  isAuth: localStorage.getItem("token") !== null
};

export default (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case type.LOGIN:
      if (action.payload === null) {
        return initialState;
      }
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", action.payload.username);
      newState = action.payload;
      return newState;
    case type.LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        token: "",
        id: "",
        isAuth: false
      };
    default:
      return state;
  }
};

export const LOGIN = authData => ({ type: type.LOGIN, payload: authData });
export const LOGOUT = () => ({ type: type.LOGOUT, payload: "" });
