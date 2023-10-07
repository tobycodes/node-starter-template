FROM node:16-alpine

RUN apk add dumb-init

WORKDIR /app

COPY --chown=node:node package.json ./

RUN yarn install --frozen-lockfile

COPY --chown=node:node . .

USER node

CMD ["dumb-init", "node", "--loader", "ts-paths-esm-loader", "src/main.ts"]