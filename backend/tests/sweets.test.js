import { jest } from "@jest/globals";
import request from "supertest";
import app from "../src/app.js";
import pool from "../src/db.js";

jest.setTimeout(30000); // Allow 30s for Neon DB latency

let adminToken = "";
let sweetId = null;

describe("Sweets API", () => {
  const adminUser = {
    name: "AdminUser",
    email: "adminuser@example.com",
    password: "admin123",
  };

  beforeAll(async () => {
    await pool.connect();

    // Ensure clean test state
    await pool.query("DELETE FROM users WHERE email = $1", [adminUser.email]);
    await pool.query("DELETE FROM sweets");

    // Register and promote admin user
    await request(app).post("/api/auth/register").send(adminUser);
    await pool.query("UPDATE users SET role='admin' WHERE email=$1", [adminUser.email]);

    // Login and store token
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: adminUser.email, password: adminUser.password });

    adminToken = loginRes.body.token;
  });

  it("should add a new sweet (admin only)", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Rasgulla",
        category: "Dessert",
        price: 40,
        quantity: 10,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("sweet");
    sweetId = res.body.sweet.id;
  });

  it("should get all sweets", async () => {
    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should purchase a sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Purchase successful");
  });

  it("should restock a sweet (admin only)", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ qty: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Restocked successfully");
  });

  afterAll(async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await pool.end();
      console.log("✅ PostgreSQL connection closed after Sweets tests.");
    } catch (err) {
      console.error("⚠️ Error closing DB pool:", err.message);
    }
  });
});
