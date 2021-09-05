const reducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data;
    case "RESET_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

let timeoutId;
export const setNotification = (text, seconds) => (dispatch) => {
  clearTimeout(timeoutId);
  dispatch({
    type: "SET_NOTIFICATION",
    data: text,
  });

  timeoutId = setTimeout(
    () => dispatch({ type: "RESET_NOTIFICATION" }),
    seconds * 1000
  );
};

export const resetNotification = () => (dispatch) =>
  dispatch({ type: "RESET_NOTIFICATION" });

export default reducer;
