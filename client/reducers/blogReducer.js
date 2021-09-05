import blogsService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;
    case "UPDATE_BLOG":
      return state.map((blog) =>
        blog.id === action.data.id ? action.data : blog
      );
    case "REMOVE_BLOG":
      return state.filter((blog) => blog.id !== action.data);
    case "NEW_BLOG":
      return [...state, action.data];
    default:
      return state;
  }
};

export const initBlogs = () => async (dispatch) => {
  const res = await blogsService.getAll();
  dispatch({ type: "INIT_BLOGS", data: res });
};

export const likeBlog = (id, blogToUpdate) => async (dispatch) => {
  const res = await blogsService.update(id, blogToUpdate);
  dispatch({ type: "UPDATE_BLOG", data: res });
};

export const deleteBlog = (id) => async (dispatch) => {
  await blogsService.remove(id);
  dispatch({ type: "REMOVE_BLOG", data: id });
};

export const addBlog = (blog) => async (dispatch) => {
  const res = await blogsService.create(blog);
  dispatch({ type: "NEW_BLOG", data: res });
  dispatch(
    setNotification(
      {
        message: `a new blog ${res.title} by ${res.author} added`,
        type: "success",
      },
      5
    )
  );
};

export const commentBlog = (id, comment) => async (dispatch) => {
  const res = await blogsService.comment(id, comment);
  dispatch({ type: "UPDATE_BLOG", data: res });
};

export default reducer;
