import { jest } from "@jest/globals";
import request from "supertest";
import app from "../src/app.js";
import pool from "../src/db.js";

jest.setTimeout(20000); // increase timeout for Neon DB

describe("Auth API", () => {
  const userData = {
    name: "TestUser",
    email: "testuser@example.com",
    password: "secret123",
  };

  beforeAll(async () => {
    await pool.connect();
    await pool.query("DELETE FROM users WHERE email = $1", [userData.email]);
  });

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(userData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "User registered successfully");
    expect(res.body.user).toHaveProperty("email", userData.email);
  });

  it("should not register the same user twice", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(userData);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "User already exists");
  });

  it("should login successfully and return a token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: userData.email,
        password: userData.password,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Login successful");
    expect(res.body).toHaveProperty("token");
    expect(res.body.user).toHaveProperty("email", userData.email);
  });

  afterAll(async () => {
    try {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // small delay
    await pool.end(); // close the DB pool
    console.log("✅ PostgreSQL connection closed after tests.");
  } catch (err) {
    console.error("⚠️ Error closing DB pool:", err.message);
  }
  });
});
