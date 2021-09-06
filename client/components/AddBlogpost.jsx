import React, { useState } from "react";
import PropTypes from "prop-types";
import { StyledButton, Grid, StyledInput } from "../styles";

const AddBlogPost = ({ addNewBlog }) => {
  const emptyState = { title: "", author: "", url: "" };
  const [blog, setBlog] = useState(emptyState);

  const createBlog = () => {
    addNewBlog(blog);
    setBlog(emptyState);
  };

  return (
    <form onSubmit={createBlog}>
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
        <StyledButton type="submit">Create</StyledButton>
      </Grid>
    </form>
  );
};

AddBlogPost.propTypes = {
  addNewBlog: PropTypes.func,
};

AddBlogPost.defaultProps = {
  addNewBlog: () => {},
};

export default AddBlogPost;
