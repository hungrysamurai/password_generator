var gulp = require("gulp");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var cssnano = require("gulp-cssnano");

gulp.task("js", function () {
  return gulp
    .src(["src/words.js", "src/script.js"])
    .pipe(concat("script.js"))
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(gulp.dest("dist"));
});

gulp.task("css", function () {
  return gulp
    .src("src/style.css")
    .pipe(
      cssnano({
        zindex: false,
        discardComments: {
          removeAll: true,
        },
      })
    )
    .pipe(gulp.dest("dist"));
});
