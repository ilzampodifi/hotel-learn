import { configSchema, Config } from "@/config/schema";
import { getEnv } from "./runtime";

let cached: Readonly<Config> | null = null;
    
export const getConfig = () => {
  if (cached) return cached;

  console.log(getEnv("APP_NAME"));

  const config = configSchema.safeParse({
    APP_NAME: getEnv("APP_NAME"),
    APP_ENV: getEnv("APP_ENV"),
    APP_DEBUG: getEnv("APP_DEBUG") === "true",
    APP_PORT: parseInt(getEnv("APP_PORT") || "3000"),
    LOG_CHANNEL: getEnv("LOG_CHANNEL"),
    LOG_LEVEL: getEnv("LOG_LEVEL"),
    DB_CONNECTION: getEnv("DB_CONNECTION"),
    DB_HOST: getEnv("DB_HOST"),
    DB_PORT: parseInt(getEnv("DB_PORT") || "3306"),
    DB_DATABASE: getEnv("DB_DATABASE"),
    DB_USERNAME: getEnv("DB_USERNAME"),
    DB_PASSWORD: getEnv("DB_PASSWORD"),
    SESSION_DRIVER: getEnv("SESSION_DRIVER"),
    REDIS_HOST: getEnv("REDIS_HOST"),
    REDIS_PORT: parseInt(getEnv("REDIS_PORT") || "6379"),
    REDIS_PASSWORD: getEnv("REDIS_PASSWORD"),
  });

  if (!config.success) {
    console.error(`Invalid environment variables: ${config.error.message}`);
    process.exit(1);
  }

  cached = Object.freeze(config.data);
  return cached;
};
