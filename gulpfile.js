const gulp = require('gulp'), // Сообственно Gulp JS
    concat = require('gulp-concat'), // Склейка файлов
    imagemin = require('gulp-imagemin'), // Минификация изображений
    csso = require('gulp-csso'), // Минификация CSS
    sass = require('gulp-sass'), // Конверстация SASS (SCSS) в CSS
    babel = require('gulp-babel'); // babel JS

gulp.task('js', function() {
    gulp.src(['assets/js/index.js'])
        .pipe(babel({presets: ['es2015']}))
        .pipe(gulp.dest('public/javascript/'))
});


gulp.task('sass', function () {
    gulp.src('assets/scss/index.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.min.css'))
        .pipe(csso())
        .pipe(gulp.dest('public/css/'));
});

gulp.task('images', function() {
    gulp.src('assets/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/img/'))

});

gulp.task('watch', function () {
    gulp.watch('assets/scss/*.scss', ['sass']);
    gulp.watch('assets/js/*.js', ['js']);
    gulp.watch('assets/img/*', ['img']);
});