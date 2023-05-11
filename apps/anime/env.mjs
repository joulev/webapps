// @ts-check

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    ORIGIN: z.string().url(),
    CLIENT_ID: z.string().regex(/^[0-9]{4}$/),
    CLIENT_SECRET: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    ORIGIN: process.env.ORIGIN,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
  },
});
