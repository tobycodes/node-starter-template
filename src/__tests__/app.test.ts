import supertest from "supertest";

import { app } from "../app";

describe("Express App", () => {
  describe("GET /", () => {
    it("should return 200 OK", () => {
      return supertest(app).get("/").expect(200);
    });
  });

  describe("GET /error", () => {
    it("should return 400 Bad Request", () => {
      return supertest(app).get("/error").expect(400);
    });
  });

  describe("GET /not-found", () => {
    it("should return 404 Not Found", () => {
      return supertest(app).get("/not-found").expect(404);
    });
  });
});
