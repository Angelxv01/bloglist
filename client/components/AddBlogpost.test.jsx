import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import AddBlogPost from "./AddBlogpost";

test("should add correct data", () => {
  const handleCreate = jest.fn();

  const component = render(<AddBlogPost addNewBlog={handleCreate} />);

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
  // eslint-disable-next-line no-console
  console.log(handleCreate.mock.calls);
  expect(handleCreate.mock.calls).toHaveLength(1);
  const [[result]] = handleCreate.mock.calls;
  expect(result.title).toBe("test blog title");
  expect(result.author).toBe("Angel");
  expect(result.url).toBe("dummy url");
});
