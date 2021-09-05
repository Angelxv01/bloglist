import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  color: #000;
  font-size: 1.125rem;
  text-transform: none;
  text-decoration: none;
  padding-right: 0.25em;
  font-weight: bold;
  text-transform: capitalize;
  &:hover {
    color: #3aa346;
    text-decoration: underline;
  }
  &:active {
    color: #3aa346;
    text-decoration: underline;
  }
`;

export const StyledDiv = styled.div`
  display: inline-block;
  padding: 0.25em 0.5em;
  margin: 0 0.5em;
`;

export const StyledButton = styled.button`
  background-color: ${(props) => (props.secondary ? "white" : "#3aa346")};
  color: ${(props) => (props.secondary ? "#656255" : "white")};
  font-weight: bold;
  padding: 0.25em 0.5em;
  border: 0.125em ${(props) => (props.secondary ? "#656255" : "#3aa346")} solid;
  border-radius: 0.25em;
  font-size: 1rem;
  margin: 0.1em 0;
  text-transform: capitalize;
  cursor: pointer;

  &:hover {
    background-color: white;
    border-color: ${(props) => props.secondary && "#3aa346"};
    color: #3aa346;
  }
`;

export const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.bcgColor || "#000"};
  padding: 0.5em 0.75em;
  border-radius: 0.25em;
`;

export const CenterContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: ${(props) => 1 + props.size * 0.4}rem;
  color: ${(props) => props.color || "#3aa346"};
  text-transform: ${(props) => props.capitalize && "capitalize"};
`;

export const Grid = styled.form`
  display: grid;
  grid-template-columns: repeat(${(props) => props.rows}, 1fr);
  grid-auto-rows: minmax(24px, auto);
`;

export const StyledInput = styled.div`
  display: flex;
  flex-direction: row;
  width: 40%;
  justify-content: space-between;
  align-items: center;
  margin: 0.25em 0;
  text-transform: capitalize;

  & > input {
    border: #3aa346 solid 0.125em;
    border-radius: 0.25em;
    font-size: 1rem;
    padding: 0.25em;
  }
`;

export const Entry = styled(Link)`
  color: #303030;
  display: block;
  padding: 0.5em;
  border-radius: 0.25em;
  font-size: 1.25rem;
  text-transform: none;
  text-decoration: none;
  &:hover {
    box-shadow: 0 1px 2px rgba(58, 163, 70, 0.2);
  }
`;
