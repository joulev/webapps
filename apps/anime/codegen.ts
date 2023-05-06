import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://graphql.anilist.co",
  documents: "**/*.ts",
  generates: {
    "lib/gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
