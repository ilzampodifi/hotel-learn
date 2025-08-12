type EnvType = Record<string, string | undefined>;

const bun: EnvType | undefined = (globalThis as any).Bun?.env;
export const ENV: EnvType = bun ?? process.env;

export const getEnv = (k: string, d?: string) => ENV[k] ?? d;