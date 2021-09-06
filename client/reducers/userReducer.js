import loginService from "../services/login";
import blogsService from "../services/blogs";

import { loadState, saveState, removeState } from "../services/localstorage";
import { setNotification } from "./notificationReducer";

const reducer = (state = null, action) => {
  switch (action.type) {
    case "LOAD_USER":
      return action.data || null;
    case "LOGIN_USER":
      return action.data;
    case "LOGOUT_USER":
      return null;
    default:
      return state;
  }
};

export const loadUser = () => (dispatch) => {
  const user = loadState("loggedUser");
  if (user) {
    blogsService.setToken(user.token);
  }
  dispatch({ type: "LOAD_USER", data: user });
};

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const user = await loginService.login(credentials);
    blogsService.setToken(user.token);
    dispatch({ type: "LOGIN_USER", data: user });
    saveState("loggedUser", user);
  } catch (err) {
    dispatch(
      setNotification({ message: err.response.data.error, type: "error" }, 5)
    );
  }
};

export const logoutUser = () => (dispatch) => {
  removeState("loggedUser");
  blogsService.setToken(null);
  dispatch({ type: "LOGOUT_USER" });
};

export default reducer;
