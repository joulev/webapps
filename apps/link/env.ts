import { createEnv } from "@t3-oss/env-nuxt";
import { z } from "zod";

export const env = createEnv({
  server: {
    JOULEV_PASSWORD: z.string(),
    MONGODB_URI: z.string().url(),
  },
  client: {},
});
