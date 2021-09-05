import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { commentBlog, likeBlog, deleteBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

import { StyledButton, StyledInput, Title, Flex } from "../styles";

const BlogPost = ({ blog }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const addComment = () => {
    dispatch(commentBlog(blog.id, comment));
    setComment("");
  };

  const remove = () => {
    try {
      dispatch(deleteBlog(blog.id));
    } catch (err) {
      dispatch(
        setNotification({ message: err.response.data.error, type: "error" }, 5)
      );
    }

    history.push("/");
  };

  const putLike = () => {
    const data = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    };
    dispatch(likeBlog(blog.id, data));
  };

  if (!blog) {
    return null;
  }

  const Comments = () => {
    let counter = 0;
    return (
      <div>
        <ul>
          {blog.comments.map((obj) => {
            counter += 1;
            return <li key={counter}>{obj}</li>;
          })}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <Flex bcgColor="white">
        <Title size={2} color="#0F3325">
          {blog.title}
        </Title>
        {user.username === blog.user.username && (
          <StyledButton onClick={remove}>delete</StyledButton>
        )}
      </Flex>
      <div>
        <a href={blog.url}>link</a>
      </div>
      <div>
        {blog.likes} likes
        <StyledButton secondary onClick={putLike}>
          Like
        </StyledButton>
      </div>
      <div>
        <StyledInput>
          <input
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </StyledInput>
        <StyledButton onClick={addComment}>add comment</StyledButton>
      </div>
      <div>
        <Title size={1} color="#0F3325" capitalize>
          comments
        </Title>
        {blog.comments ? <Comments /> : "no comments yet"}
      </div>
      <div>added by {blog.user.name}</div>
    </div>
  );
};

BlogPost.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
    user: PropTypes.shape({
      username: PropTypes.string,
      id: PropTypes.string,
      name: PropTypes.string,
    }),
    comments: PropTypes.string,
  }),
};

BlogPost.defaultProps = {
  blog: {},
};

export default BlogPost;
