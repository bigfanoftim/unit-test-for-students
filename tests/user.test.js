const request = require("supertest");

const { createApp } = require("../../app");
const { AppDataSource } = require("../models/data-source");

describe("Sign Up", () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await AppDataSource.initialize();
    await AppDataSource.query(`TRUNCATE users`);
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  test("FAILED: invalid email", async () => {
    await request(app)
      .post("/users/signup")
      .send({ email: "wrongEmail", password: "password001@" })
      .expect(400)
      .expect({ message: "invalid email!" });
  });

  test("SUCCESS: created user", async () => {
    await request(app)
      .post("/users/signup")
      .send({ email: "wecode001@gmail.com", password: "password001@" })
      .expect(201);
  });

  test("FAILED: duplicated email", async () => {
    await request(app)
      .post("/users/signup")
      .send({ email: "wecode001@gmail.com", password: "password001@" })
      .expect(409)
      .expect({ message: "duplicated email" });
  });
});
