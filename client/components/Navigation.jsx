import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { resetNotification } from "../reducers/notificationReducer";
import { logoutUser } from "../reducers/userReducer";

import {
  Flex,
  StyledButton,
  StyledLink,
  StyledDiv,
  CenterContainer,
} from "../styles";

const Navigation = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(resetNotification());
    dispatch(logoutUser());
  };

  const user = useSelector((state) => state.user);
  return (
    <Flex bcgColor="#e9fce9">
      <CenterContainer>
        <StyledLink to="/">home</StyledLink>
        <StyledLink to="/users">users</StyledLink>
      </CenterContainer>
      <CenterContainer>
        <StyledDiv>{user.name} logged in</StyledDiv>
        <StyledButton onClick={logout}>log out</StyledButton>
      </CenterContainer>
    </Flex>
  );
};

export default Navigation;
