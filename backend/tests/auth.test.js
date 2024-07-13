import { expect } from "@jest/globals";
import app from "./test.setup.js";
import supertest from "supertest";
export let cookie;
describe("POST /api/auth/signup", () => {
    test("Should create account successfully", async () => {
        const res = await supertest(app).post("/api/auth/signup").send({
            name: "adammy",
            email: "xeon@gmail.com",
            password: "passito",
        });

        expect(res.statusCode).toEqual(201);
        expect(res.headers["set-cookie"]).toBeDefined();
        expect(res.body.msg).toBeDefined();
    });

    test("Should throw error if email has already been used", async () => {
        const res = await supertest(app).post("/api/auth/signup").send({
            name: "adammy",
            email: "xeon@gmail.com",
            password: "passito",
        });

        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toBe("Email has already been used");
    });
});

describe("POST /api/auth/login", () => {
    test("Should log user in successfully", async () => {
        const res = await supertest(app).post("/api/auth/login").send({
            email: "xeon@gmail.com",
            password: "passito",
        });

        expect(res.statusCode).toEqual(200);
        expect(res.headers["set-cookie"]).toBeDefined();
        expect(res.body.msg).toBeDefined();
        cookie = res.headers["set-cookie"];
    });

    test("Should throw error if password is incorrect", async () => {
        const res = await supertest(app).post("/api/auth/login").send({
            email: "xeon@gmail.com",
            password: "passit",
        });

        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toBe("Invalid Password");
    });
});

describe("GET /api/user", () => {
    test("Should get user info successfully", async () => {
        const res = await supertest(app)
            .get("/api/user")
            .set("Cookie", cookie[0]);

        console.log(cookie[0], res.body);
        expect(res.body).toBeDefined();
    });
});
