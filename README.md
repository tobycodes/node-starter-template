# Node Starter Template

Yeah, I know there's **tons** of Node starter templates out there, but I still need one for me. If I'm using bare Express for my app (and not using NestJS), this is what I'd usually start with. Also it was copied from an existing project that I did some time ago, so a lot of times I have to add/remove stuff depending on the project I'm working on.

## About

This is a Node starter template for bare Express applications, drawing a lot of patterns from [Node best practices](https://github.com/goldbergyoni/nodebestpractices/tree/master) and some [OWASP Node recommendations](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html). It comes with a good level of setup for:

- Authentication (with [Passport](https://www.passportjs.org/)).
- Logging Setup (with [Pino](https://github.com/pinojs/pino)).
- Error Handling (with [graceful shutdown](https://blog.heroku.com/best-practices-nodejs-errors)).
- Testing (with [Jest](https://jest-archive-august-2023.netlify.app/docs/29.3/getting-started) and [Supertest](https://github.com/ladjs/supertest)).
- API documentation (with [Swagger](https://www.npmjs.com/package/swagger-jsdoc)).
- Data Validation (using [AJV](https://ajv.js.org/)).
- [Configuration](https://www.npmjs.com/package/config), [File Uploads](https://www.npmjs.com/package/multer), [TypeORM setup](https://typeorm.io/) etc.

## Note

This template is definitely missing a lot of things, so if you ever come across it and find it interesting, feel free to make changes however you like. You can also make a PR to improve this one if you have some time - I'd love that very much.
