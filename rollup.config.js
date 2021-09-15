import * as path from "path";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import sass from "rollup-plugin-sass";
import pkg from "./package.json";
import { terser } from "rollup-plugin-terser";

// Array of extensions to be handled by babel
const EXTENSIONS = [".ts", ".tsx"];

// Excluded dependencies
const EXTERNAL = Object.keys(pkg.devDependencies);

export default {
  input: ["src/index.tsx"],
  output: {
    dir: "dist",
    sourcemap: true,
    format: "esm",
    exports: "named",
  },
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: EXTENSIONS,
    }),
    sass({
      insert: true,
    }),
    babel({
      extensions: EXTENSIONS,
      babelHelpers: "bundled",
      configFile: path.resolve(__dirname, ".babelrc.js"),
    }),
    terser(),
  ],
  external: EXTERNAL,
};
