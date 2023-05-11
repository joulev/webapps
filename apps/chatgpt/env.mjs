// @ts-check
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    JOULEV_PASSWORD: z.string().min(1),
    OPENAI_API_KEY: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    JOULEV_PASSWORD: process.env.JOULEV_PASSWORD,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
});
