import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import typescript from "@rollup/plugin-typescript";
import tsconfig from "./tsconfig.json" assert { type: "json" };
import terser from "@rollup/plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import summary from "rollup-plugin-summary";

import pkg from "./package.json" assert { type: "json" };
const name = pkg.main.replace(/\.js$/, "");

const bundle = (config) => ({
  ...config,
  input: "src/index.ts",
});

export default [
  bundle({
    plugins: [
      esbuild(),
      typescript(tsconfig),
      commonjs(),
      nodeResolve({ preferBuiltins: false }),
      terser({
        module: true,
      }),
      summary()
    ],
    output: [
      {
        file: `${name}.js`,
        format: "cjs",
        sourcemap: true
      },
      {
        file: `${name}.mjs`,
        format: "es",
        sourcemap: true
      },
    ],
  }),
  bundle({
    plugins: [dts()],
    output: {
      file: `${name}.d.ts`,
      format: "es",
    },
  }),
];
