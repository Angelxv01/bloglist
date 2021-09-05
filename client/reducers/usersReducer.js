import usersService from "../services/user";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_USERS":
      return action.data;
    default:
      return state;
  }
};

export const loadUsers = () => async (dispatch) => {
  const res = await usersService.getAll();
  dispatch({ type: "LOAD_USERS", data: res });
};

export default reducer;
