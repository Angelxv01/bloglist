import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import AddBlogPost from "./AddBlogpost";

test("should add correct data", () => {
  const handleCreate = jest.fn();

  const component = render(<AddBlogPost handleCreate={handleCreate} />);

  const title = component.container.querySelector("#title");
  const author = component.container.querySelector("#author");
  const url = component.container.querySelector("#url");

  fireEvent.change(title, {
    target: { value: "test blog title" },
  });

  fireEvent.change(author, {
    target: { value: "Angel" },
  });

  fireEvent.change(url, {
    target: { value: "dummy url" },
  });

  const form = component.container.querySelector("form");
  fireEvent.submit(form);

  expect(handleCreate.mock.calls).toHaveLength(1);
  const [[newTitle, newAuthor, newUrl]] = handleCreate.mock.calls;
  expect(newTitle).toBe("test blog title");
  expect(newAuthor).toBe("Angel");
  expect(newUrl).toBe("dummy url");
});
