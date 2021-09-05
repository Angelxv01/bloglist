import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { StyledButton, Grid, StyledInput } from "../styles";
import { addBlog } from "../reducers/blogReducer";
import { loadUsers } from "../reducers/usersReducer";

const AddBlogPost = ({ toggle }) => {
  const emptyState = { title: "", author: "", url: "" };
  const [blog, setBlog] = useState(emptyState);
  const dispatch = useDispatch();

  const createBlog = () => {
    dispatch(addBlog(blog));
    dispatch(loadUsers());
    setBlog(emptyState);
    toggle.current.toggleVisibility();
  };

  return (
    <div>
      <Grid rows={1}>
        <StyledInput>
          title
          <input
            id="title"
            type="text"
            value={blog.title}
            onChange={({ target }) => setBlog({ ...blog, title: target.value })}
          />
        </StyledInput>
        <StyledInput>
          author
          <input
            id="author"
            type="text"
            value={blog.author}
            onChange={({ target }) =>
              setBlog({ ...blog, author: target.value })
            }
          />
        </StyledInput>
        <StyledInput>
          url
          <input
            id="url"
            type="text"
            value={blog.url}
            onChange={({ target }) => setBlog({ ...blog, url: target.value })}
          />
        </StyledInput>
      </Grid>
      <StyledButton onClick={createBlog}>Create</StyledButton>
    </div>
  );
};

AddBlogPost.propTypes = {
  toggle: PropTypes.oneOfType([
    PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    PropTypes.shape({ current: PropTypes.object }),
  ]),
};

AddBlogPost.defaultProps = {
  toggle: { current: {} },
};

export default AddBlogPost;
