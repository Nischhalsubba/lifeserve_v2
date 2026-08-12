/*
 * Build pipeline for the LifeServe static prototype.
 * Compiles Sass, optionally bundles project JavaScript, refreshes cache-busting
 * query strings in HTML, and exposes a watch mode for local development.
 */

const fs = require("fs");
const { src, dest, watch, series, parallel } = require("gulp");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const concat = require("gulp-concat");
const postcss = require("gulp-postcss");
const replace = require("gulp-replace");
const sass = require("gulp-sass/legacy")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");

const files = {
  scssPath: "./assets/sass/**/*.scss",
  jsPath: "./assets/js/**/*.js",
};

/** Compiles the Sass source tree into optimized CSS and writes source maps. */
function scssTask() {
  return src(files.scssPath)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("./"));
}

/** Bundles project JavaScript when an assets/js source directory is present. */
function jsTask() {
  if (!fs.existsSync("./assets/js")) {
    return Promise.resolve();
  }

  return src(files.jsPath)
    .pipe(concat("app.js"))
    .pipe(uglify())
    .pipe(dest("./js/"));
}

const cacheBustValue = Date.now();

/** Replaces existing cache-busting query values in root HTML files. */
function cacheBustTask() {
  return src(["./*.html"])
    .pipe(replace(/cb=\d+/g, `cb=${cacheBustValue}`))
    .pipe(dest("."));
}

/** Watches authored Sass and optional JavaScript sources and rebuilds on change. */
function watchTasks() {
  return watch([files.scssPath, files.jsPath], parallel(scssTask, jsTask));
}

const build = series(parallel(scssTask, jsTask), cacheBustTask);

exports.build = build;
exports.default = series(build, watchTasks);
