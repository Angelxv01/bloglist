import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
// import { prettyDOM } from '@testing-library/dom'
import Blog from "./Blog";

describe("<Blog />", () => {
  let blog;
  let component;
  beforeEach(() => {
    blog = {
      author: "Angel",
      id: "1",
      likes: 0,
      title: "Fifth test refactor 2",
      url: "fake",
      user: {
        id: "1",
        name: "Angel",
        username: "Angel",
      },
    };
    component = render(
      <Blog blog={blog} putLike={() => {}} removeBlog={() => {}} isCreator />
    );
  });

  test("should render Blog", () => {
    const div = component.container.querySelector(".base");
    expect(div).toHaveTextContent("Fifth test refactor 2 Angel");
  });

  test("should not render additional component", () => {
    const div = component.container.querySelector(".additional");
    expect(div).toHaveStyle("display: none");
  });

  test("render details when show is clicked", () => {
    const showButton = component.container.querySelector(".toggleShow");
    fireEvent.click(showButton);

    const div = component.container.querySelector(".additional");
    expect(div).not.toHaveStyle("display: none");
  });
});

test("should handle double click on like", () => {
  const blog = {
    author: "Angel",
    id: "1",
    likes: 0,
    title: "Fifth test refactor 2",
    url: "fake",
    user: {
      id: "1",
      name: "Angel",
      username: "Angel",
    },
  };

  const mockHandler = jest.fn();

  const component = render(
    <Blog blog={blog} putLike={mockHandler} removeBlog={() => {}} isCreator />
  );

  const button = component.container.querySelector(".like");
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
