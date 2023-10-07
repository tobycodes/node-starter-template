import { createRequire } from "node:module";
import swaggerJsDoc, { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const require = createRequire(import.meta.url);

const pkg = require("../../package.json");

const options: Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "GiversZone API Documentation",
      version: pkg.version,
      description: "Everything you need to know about the GiversZone API",
    },
    servers: [{ url: "http://localhost:8080" }],
  },
  components: {
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "session",
      },
    },
  },
  apis: ["src/**/*.ts"],
};

const specs = swaggerJsDoc(options);

export { specs, swaggerUi };
