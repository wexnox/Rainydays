const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const rename = require("gulp-rename");
const terser = require("gulp-terser");
const concat = require("gulp-concat");
const imagemin = require("gulp-imagemin");
const imagewebp = require("gulp-webp");
const browsersync = require("browser-sync").create();
const sourcemaps = require("gulp-sourcemaps");

const paths = {
  html: {
    src: ["./src/*.html"],
    dest: "./dist/",
  },
  styles: {
    src: ["./src/scss/**/*.scss"],
    dest: "./dist/assets/css/",
  },
  scripts: {
    src: ["./src/js/**/*.js"],
    dest: "./dist/assets/js/",
  },
  // TODO:
  images: {
    src: ["./src/images/**/*"],
    dest: "./dist/assets/images/",
  },
};

// sass task
function scssTask() {
  return src(paths.styles.src, { sourcemaps: true })
    .pipe(sass().on("error", sass.logError))
    .pipe(dest(paths.styles.dest))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(dest(paths.styles.dest, { sourcemaps: "." }));
}

// JavaScript Task
function jsTask() {
  return (
    src(paths.scripts.src)
      // .pipe(sourcemaps.init())
      .pipe(terser())
      .pipe(concat("all.js"))
      .pipe(dest(paths.scripts.dest, { sourcemaps: "." }))
  );
}
// Copies html files from src to dest
function copyHtml() {
  return src(paths.html.src).pipe(dest(paths.html.dest, { overwrite: true }));
}

function copySvg() {
  return src("./src/images/**/*.svg").pipe(dest(paths.images.dest));
}

//optimize and move images
function optimizeimg() {
  return src("src/images/*.{jpg,png}")
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        imagemin.optipng({ optimizationLevel: 2 }),
      ])
    )
    .pipe(dest("dist/images"));
}

//optimize and move images
function webpImage() {
  return src("dist/images/*.{jpg,png}")
    .pipe(imagewebp())
    .pipe(dest("dist/images"));
}

// Browsersync Tasks
function browsersyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: "./dist/",
      index: "index.html",
    },
    // injectChanges: true,
  });
  cb();
}

function browsersyncReload(cb) {
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask() {
  watch(paths.html.src, copyHtml, browsersyncReload);
  watch("src/images/*", optimizeimg);
  watch("dist/images/*.{jpg,png}", webpImage);
  watch(
    ["./src/scss/**/*.scss", "./src/js/**/*.js", "./src/*.html"],
    series(scssTask, jsTask, copySvg, copyHtml, browsersyncReload)
  );
}

// Default Gulp task
exports.default = series(
  copySvg,
  copyHtml,
  scssTask,
  jsTask,
  // optimizeimg,
  // webpImage,
  browsersyncServe,
  watchTask
);

exports.copyHtml = copyHtml;
