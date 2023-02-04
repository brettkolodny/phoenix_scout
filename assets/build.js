const esbuild = require("esbuild");
const ElmPlugin = require("esbuild-plugin-elm");
const fs = require("fs");

const watch = process.argv.includes("--watch");
const isProd = process.env.NODE_ENV === "production";

const options = {
  entryPoints: ["js/app.js"],
  bundle: true,
  outfile: "../priv/static/assets/app.js",
  watch: watch
    ? {
        onRebuild(error, result) {
          if (error) console.error("watch build failed:", error);
          else console.log("watch build succeeded:", result);
        },
      }
    : false,
  plugins: [
    ElmPlugin({
      debug: !isProd,
      optimize: isProd,
      clearOnWatch: watch,
      verbose: true,
    }), // options are documented below
  ],
};

const promise = esbuild.build(options);

if (watch) {
  promise.then((_result) => {
    process.stdin.on("close", () => {
      process.exit(0);
    });

    process.stdin.resume();
  });
}
