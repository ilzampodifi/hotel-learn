import { z } from "zod";

export const configSchema = z.object({
  APP_NAME: z.string().default("API"),
  APP_ENV: z.enum(["development", "production"]).default("development"),
  APP_DEBUG: z.boolean().default(false),
  APP_PORT: z.number().default(3000),
  LOG_CHANNEL: z.enum(["console", "file"]).default("console"),
  LOG_LEVEL: z.enum(["debug", "info", "warning", "error"]).default("info"),
  DB_CONNECTION: z.enum(["mysql", "postgresql", "sqlite"]).default("mysql"),
  DB_HOST: z.string().default("localhost"),
  DB_PORT: z.number().default(3306),
  DB_DATABASE: z.string().default("api"),
  DB_USERNAME: z.string().default("root"),
  DB_PASSWORD: z.string().default(""),
  SESSION_DRIVER: z.enum(["file", "database", "redis"]).default("file"),
  REDIS_HOST: z.string().default("localhost"),
  REDIS_PORT: z.number().default(6379),
  REDIS_PASSWORD: z.string().default(""),
});

export type Config = z.infer<typeof configSchema>;