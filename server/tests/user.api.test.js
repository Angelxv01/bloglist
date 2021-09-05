const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const supertest = require("supertest");

const app = require("../../app");
const User = require("../models/user");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcryptjs.hash("pass", 10);
  const user = new User({ username: "root", passwordHash });

  await user.save();
}, 100000);

describe("API GET /", () => {
  test("get all", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

describe("API POST /", () => {
  test("post valid", async () => {
    const user = {
      username: "Jessy",
      name: "Jessica",
      password: "yeziga",
    };
    await api
      .post("/api/users")
      .send(user)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("invalid unique username", async () => {
    const initial = await helper.usersInDb();
    const user = {
      username: "root",
      password: "well",
    };

    const result = await api
      .post("/api/users")
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const final = await helper.usersInDb();

    expect(result.body.error).toContain("`username` to be unique");
    expect(final).toHaveLength(initial.length);
  });

  test("invalid short username", async () => {
    const user = {
      username: "Hi",
      password: "alright",
    };

    const initial = await helper.usersInDb();

    const result = await api
      .post("/api/users")
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const final = await helper.usersInDb();

    expect(result.body.error).toContain(
      "is shorter than the minimum allowed length (3)"
    );
    expect(final).toHaveLength(initial.length);
  });

  test("invalid short username", async () => {
    const user = {
      username: "Hi",
      password: "hh",
    };

    const initial = await helper.usersInDb();

    const result = await api
      .post("/api/users")
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const final = await helper.usersInDb();

    expect(result.body.error).toEqual("malformed data");
    expect(final).toHaveLength(initial.length);
  });
});

afterAll(() => mongoose.connection.close());
