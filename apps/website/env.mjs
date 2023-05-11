// @ts-check
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    RESUME_URL: z.string().url(),
    YTMUSIC_HEADERS_RAW: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    RESUME_URL: process.env.RESUME_URL,
    YTMUSIC_HEADERS_RAW: process.env.YTMUSIC_HEADERS_RAW,
  },
});
