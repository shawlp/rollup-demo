import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import alias from "@rollup/plugin-alias";
import url from "@rollup/plugin-url";
import json from "@rollup/plugin-json";

const path = require("path");
const resolveDir = (dir) => path.join(__dirname, dir);

const isDevelopment = process.env.NODE_ENV === 'development'

const devPlugins = [
    serve({
        open: true,
        port: 8888,
        contentBase: "",
      }),
      livereload({
          watch: 'dist'
      })
]

export default {
  input: ["src/index.ts"],
  output: [
    {
      dir: "dist",
      format: "es",
      preserveModules: true,
      preserveModulesRoot: "src",
      sourcemap: "inline",
      name: 'component'
    },
    // {
    //   dir: "dist/cjs",
    //   format: "cjs",
    // },
    // {
    //   dir: "dist/umd",
    //   format: "umd",
    // },
    // {
    //   dir: "dist/iife",
    //   format: "iife",
    // },
  ],
  plugins: [
    babel({
      extensions: [".js", ".ts", "tsx", "jsx"],
      runtimeHelpers: true,
      exclude: /node_modules/,
    }),
    commonjs(),
    resolve(),
    typescript({ tsconfig: "./tsconfig.json" }),
    terser(),
    postcss({
      minimize: true,
      extensions: [".css", ".scss"],
    }),
    alias({
      entries: [{ find: "@", replacement: resolveDir("src") }],
    }),
    url(),
    json(),
    ...(isDevelopment ? devPlugins : [] )
  ],
};
