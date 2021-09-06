import "./index.css";

import React, { useEffect, useRef } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LoginForm from "./components/LoginForm";
import AddBlogpost from "./components/AddBlogpost";
import Message from "./components/Message";
import User from "./components/User";
import BlogPost from "./components/BlogPost";
import Users from "./components/Users";
import Navigation from "./components/Navigation";

import Togglable from "./components/Togglable";

import { initBlogs, addBlog } from "./reducers/blogReducer";
import { loadUser } from "./reducers/userReducer";
import { loadUsers } from "./reducers/usersReducer";
import { Entry, Title } from "./styles";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog);
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);

  const matchUser = useRouteMatch("/users/:id");
  const selectedUser = matchUser
    ? users.find((obj) => obj.id === matchUser.params.id)
    : null;

  const matchBlog = useRouteMatch("/blogs/:id");
  const selectedBlog = matchBlog
    ? blogs.find((obj) => obj.id === matchBlog.params.id)
    : null;

  const addBlogpostRef = useRef();

  const addNewBlog = (blog) => {
    addBlogpostRef.current.toggleVisibility();
    dispatch(addBlog(blog));
    dispatch(loadUsers());
  };

  useEffect(() => {
    dispatch(initBlogs());
    dispatch(loadUsers());
    dispatch(loadUser());
  }, []);

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Message />
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <Message />
      <Switch>
        <Route path="/users/:id">
          <User user={selectedUser} />
        </Route>
        <Route path="/blogs/:id">
          <BlogPost blog={selectedBlog} />
        </Route>
        <Route path="/users">
          <Users users={users} />
        </Route>
        <Route path="/">
          <Title size={2} color="#0F3325">
            Blogs
          </Title>
          <Togglable buttonLabel="create" ref={addBlogpostRef}>
            <AddBlogpost addNewBlog={addNewBlog} />
          </Togglable>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Entry to={`/blogs/${blog.id}`} key={blog.id}>
                {blog.title}
              </Entry>
            ))}
        </Route>
      </Switch>
    </div>
  );
};

export default App;
