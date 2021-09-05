import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { StyledButton, Grid, StyledInput } from "../styles";
import { loginUser } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";

const LoginForm = () => {
  const empty = { username: "", password: "" };
  const [credentials, setCredentials] = useState(empty);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = () => {
    try {
      dispatch(loginUser(credentials));
    } catch (err) {
      dispatch(
        setNotification({ message: err.response.data.error, type: "error" }, 5)
      );
    }
    setCredentials(empty);
    history.push("/");
  };

  return (
    <div>
      <Grid>
        <StyledInput>
          username
          <input
            id="username"
            value={credentials.username}
            onChange={({ target }) =>
              setCredentials({ ...credentials, username: target.value })
            }
          />
        </StyledInput>
        <StyledInput>
          password
          <input
            id="password"
            type="password"
            value={credentials.password}
            onChange={({ target }) =>
              setCredentials({ ...credentials, password: target.value })
            }
          />
        </StyledInput>
      </Grid>
      <StyledButton onClick={login}>login</StyledButton>
    </div>
  );
};

export default LoginForm;
