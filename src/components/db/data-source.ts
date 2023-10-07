import path from "node:path";
import { fileURLToPath } from "node:url";
import "reflect-metadata";
import { DataSource } from "typeorm";
import config from "config";

const ENV = config.util.getEnv("NODE_ENV");
const DATABASE_URL = config.get<string>("db.url");

const isDev = ENV === "dev" || ENV === "development";

let AppDataSource: DataSource;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createAppDataSource = () => {
  return new DataSource({
    entities: [__dirname + "/**/*.model.ts"],
    synchronize: ENV !== "production",
    logging: isDev,
    type: "postgres",
    url: DATABASE_URL,
  });
};

const getDataSource = () => {
  if (!AppDataSource) {
    AppDataSource = createAppDataSource();
  }

  return AppDataSource;
};

export { getDataSource };
