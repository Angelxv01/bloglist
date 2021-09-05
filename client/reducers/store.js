import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import notificationReducer from "./notificationReducer";
import blogReducer from "./blogReducer";
import userReducer from "./userReducer";
import usersReducer from "./usersReducer";

const reducer = combineReducers({
  notification: notificationReducer,
  blog: blogReducer,
  user: userReducer,
  users: usersReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;
