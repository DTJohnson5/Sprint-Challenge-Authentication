const dBase = require("../database/dbConfig.js");
const test = require("supertest");
const server = require("../api/server.js");

describe("POST /register", () => {
  beforeEach(async () => {
    await dBase("users").truncate();
  });

  it("Should register the member to the database", async () => {
    const newFather = await test(server)
      .post("/api/auth/register")
      .send({ username: "Stygian", password: "Just4Me!" });
    expect(newFather.body.username).toMatch(/Stygian/);
  });

  it("Should return a 201 status", async () => {
    const response = await test(server)
      .post("/api/auth/register")
      .send({ username: "Stygian", password: "Just4Me!" });
    expect(response.status).toBe(201);
  });
});

describe("GET /jokes", () => {
  beforeEach(async () => {
    await dBase("users").truncate();
  });

  it("Should allow authorized users to view JSON-formatted jokes in the database", async () => {
    const response = await test(server)
      .post("/api/auth/register")
      .send({ username: "Stygian", password: "Just4Me!" });
  });

  it("Should show some bad jokes", async () => {
    const response = await test(server)
      .post("/api/auth/register")
      .send({ username: "Stygian", password: "Just4Me!" });

    const loginReply = await request(server)
      .post("/api/auth/login")
      .send({ username: "Stygian", password: "Just4Me!" })
      .expect("Content-Type", /json/);

    const dadJokes = await request(server)
      .get("/api/jokes")
      .auth("Stygian", "Just4Me!")
      .set("Authorization", loginReply.body.token)
      .expect("Content-Type", /json/);

    expect(dadJokes.body[0]).toEqual({
      id: "r3s1st4NC3",
      joke:
        "My wife is really mad at the fact that I have no sense of direction. So I packed up my stuff and right."
    });
  });
});
