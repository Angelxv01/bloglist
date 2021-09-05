const listHelper = require("../utils/list_helper");

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

const listWithMoreBlogs = require("./data/data").blogs;

test("dummy returns 1", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("when list has only more blog, equals the total of those", () => {
    const result = listHelper.totalLikes(listWithMoreBlogs);
    expect(result).toBe(36);
  });
  // test.only('when list has only more blog, equals the total of those', () => {
  //   const result = listHelper.totalLikes(listWithMoreBlogs)
  //   expect(result).toBe(36)
  // })

  // npm test -- -t 'when list has only more blog, equals the total of those'
});

describe("favorite post", () => {
  test("one post", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    const expected = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    };
    expect(result).toEqual(expected);
  });

  test("more posts", () => {
    const result = listHelper.favoriteBlog(listWithMoreBlogs);
    const expected = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    };

    expect(result).toEqual(expected);
  });
});

describe("most blogs", () => {
  test("one post", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    const expected = {
      author: "Edsger W. Dijkstra",
      blogs: 1,
    };
    expect(result).toEqual(expected);
  });

  test("more posts", () => {
    const result = listHelper.mostBlogs(listWithMoreBlogs);
    const expected = {
      author: "Robert C. Martin",
      blogs: 3,
    };

    expect(result).toEqual(expected);
  });
});

describe("most likes", () => {
  test("one post", () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    const expected = {
      author: "Edsger W. Dijkstra",
      likes: 5,
    };
    expect(result).toEqual(expected);
  });

  test("more posts", () => {
    const result = listHelper.mostLikes(listWithMoreBlogs);
    const expected = {
      author: "Edsger W. Dijkstra",
      likes: 17,
    };

    expect(result).toEqual(expected);
  });
});
