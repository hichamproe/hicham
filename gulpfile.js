var gulp                = require('gulp'),
    concat              = require('gulp-concat'),
    prefex              = require('gulp-autoprefixer'),
    pug                 = require('gulp-pug'),
    livereload          = require('gulp-livereload'),
    autoprefixer        = require('gulp-autoprefixer'),
    notify              = require("gulp-notify"),
    minify              = require('gulp-minify'),
    sass                = require('gulp-sass'),
    ghpages             = require('gh-pages');

// Task For Html
gulp.task('html', function() {
   
        return gulp.src(["stage/html/*.pug"])
        
        .pipe(pug({pretty:true}))
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
        
});
// Task For Css
gulp.task('css', function() {
   
    return gulp.src(["stage/css/**/*.scss", "stage/css/**/*.css"])
    
    .pipe(sass({outputStyle:'compressed'})).on("error", sass.logError)
    .pipe(autoprefixer())
    .pipe(concat("style.css"))
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload());
    
});

// Task For Js
gulp.task('js', function() {
   
    return gulp.src(["stage/js/*.js"])
    .pipe(concat("custome.js"))
    .pipe(minify())
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload());
    
});
// Task Watch

gulp.task("watch", function() {
    require("./server");
    livereload.listen();
    gulp.watch("stage/html/*.pug", gulp.series('html'));
    gulp.watch(["stage/css/**/*.scss", "stage/css/**/*.css"], gulp.series('css'));
    gulp.watch(["stage/js/*.js"], gulp.series('js'));
});
