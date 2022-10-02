import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfigFn } from "vite";

const config: UserConfigFn = ({ mode }) => ({
  plugins: [sveltekit()],

  // Workaround for Apollo not working in production
  // https://github.com/timhall/svelte-apollo/issues/119#issuecomment-1133959304
  // https://github.com/apollographql/apollo-client/issues/8674#issuecomment-915827157
  define: {
    __DEV__: (mode === "development").toString(),
  },
  optimizeDeps: {
    exclude: ["@apollo/client", "svelte-apollo"],
  },
  ssr: {
    noExternal: ["@apollo/client", "svelte-apollo"],
  },
});

export default config;
