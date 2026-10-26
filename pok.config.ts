import { defineConfig } from "@pokit/core";
import { release } from "pok-plugins";

/** One release group per package: the packages version independently. */
const pkg = (dir: string, build: string | false) => ({
  label: `@djgrant/classy-${dir}`,
  tag: `classy-${dir}@%s`,
  commit: `release: @djgrant/classy-${dir}@%s`,
  packages: [{ file: `packages/${dir}/package.json`, build }],
});

export default defineConfig({
  appName: "classy",
  pmScripts: true,
  plugins: [
    release({
      packages: {
        core: pkg("core", "pnpm --filter @djgrant/classy-core build"),
        react: pkg("react", "pnpm --filter @djgrant/classy-react build"),
        // Publishes src/ as-is.
        solid: pkg("solid", false),
        foldkit: pkg("foldkit", "pnpm --filter @djgrant/classy-foldkit build"),
      },
    }),
  ],
});
