import React from "react";
import PropTypes from "prop-types";
import { Title } from "../styles";

const User = ({ user }) => {
  if (!user) {
    return null;
  }
  return (
    <div>
      <Title color="#0F3325">{user.name}</Title>
      <Title color="#0F3325" size={1} capitalize>
        Added blogs
      </Title>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    blogs: PropTypes.arrayOf({
      id: PropTypes.string,
      title: PropTypes.string,
    }),
  }),
};

User.defaultProps = {
  user: {},
};

export default User;
