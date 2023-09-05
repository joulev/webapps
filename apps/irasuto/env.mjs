// @ts-check
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    JOULEV_PASSWORD: z.string().min(1),
    MONGODB_URI: z.string().url(),
    R2_ACCOUNT_ID: z.string().min(1),
    R2_ACCESS_KEY: z.string().min(1),
    R2_SECRET_ACCESS_KEY: z.string().min(1),
    DISCORD_WEBHOOK: z.string().url().optional(),
  },
  client: {},
  runtimeEnv: {
    JOULEV_PASSWORD: process.env.JOULEV_PASSWORD,
    MONGODB_URI: process.env.MONGODB_URI,
    R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID,
    R2_ACCESS_KEY: process.env.R2_ACCESS_KEY,
    R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
    DISCORD_WEBHOOK: process.env.DISCORD_WEBHOOK,
  },
});
