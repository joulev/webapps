// @ts-check
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    JOULEV_PASSWORD: z.string().min(1),
    MONGODB_URI: z.string().url(),
  },
  client: {},
  runtimeEnv: {
    JOULEV_PASSWORD: process.env.JOULEV_PASSWORD,
    MONGODB_URI: process.env.MONGODB_URI,
  },
});
