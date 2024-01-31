import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["production", "development", "test"]),
  DATABASE_URL: z.string().url(),
  DATABASE_AUTH_TOKEN: z.string()
});

export const env = envSchema.parse(process.env);