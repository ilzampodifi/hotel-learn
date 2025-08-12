import { configSchema, Config } from "@/config/schema";

let cached: Readonly<Config> | null = null;
    
export const getConfig = () => {
  if (cached) return cached;

  const env = process.env;
  const config = configSchema.safeParse(env);

  if (!config.success) {
    console.error(`Invalid environment variables: ${config.error.message}`);
    process.exit(1);
  }

  cached = Object.freeze(config.data);
  return cached;
};
