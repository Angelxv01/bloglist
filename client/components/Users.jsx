import React from "react";
import PropTypes from "prop-types";
import { StyledLink } from "../styles";

const Users = ({ users }) => (
  <div>
    <h1>Users</h1>
    <table>
      <tbody>
        <tr>
          <td />
          <td>blogs created</td>
        </tr>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <StyledLink to={`/users/${user.id}`}>{user.username}</StyledLink>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

Users.propTypes = {
  users: PropTypes.arrayOf({
    id: PropTypes.string,
    username: PropTypes.string,
    blogs: PropTypes.array,
  }),
};

Users.defaultProps = {
  users: [],
};

export default Users;
