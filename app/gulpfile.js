var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var ngHtml2Js = require('gulp-ng-html2js');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var browserify = require('browserify');
var ngAnnotate = require('browserify-ngannotate');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var del = require('del');

gulp.task('default', ['build']);

gulp.task('watch', function() {
    return gulp.watch([
    './src/**/*',
    './src/*'
    ], ['build']);
});

gulp.task('build', ['clean', 'scss', 'build-templates', 'build-partials', 'jshint', 'build-js'], function() {
    gulp.src([
        './node_modules/angular-material/angular-material.min.css',
        './node_modules/angular-material-icons/angular-material-icons.css'
    ])
        .pipe(gulp.dest('dist/scss'))
    gulp.src([
        './node_modules/angular/angular.min.js',
        './node_modules/angular-animate/angular-animate.min.js',
        './node_modules/angular-aria/angular-aria.min.js',
        './node_modules/angular-material/angular-material.min.js'
    ])
        .pipe(gulp.dest('dist/js'));
    gulp.src([
        './index.html'
    ])
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function(cb) {
    return del([
        './dist/*',
        './dist'
    ], { force: true }, cb);
});

gulp.task('scss', function (cb) {
    return gulp.src('./src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCss({ keepSpecialComments: 0 }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./dist'), cb);
});

gulp.task('build-templates', function (cb) {
    return gulp.src(['./src/pages/*.html'])
        .pipe(ngHtml2Js({
            moduleName: 'app.templates',
            prefix: '/templates/'
        }))
        .pipe(concat('templateCacheTemplates.js'))
        .pipe(gulp.dest('./dist/temp'), cb);
});

gulp.task('build-partials', function (cb) {
    return gulp.src([
        './src/components/**/*.html'
    ])
        .pipe(ngHtml2Js({
            moduleName: 'app.partials',
            prefix: '/partials/'
        }))
        .pipe(concat('templateCachePartials.js'))
        .pipe(gulp.dest('./dist/temp'), cb);
});

gulp.task('jshint', function (cb) {
    return gulp.src('/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'), cb);
});

gulp.task('build-js', ['build-partials'], function (cb) {
    var b = browserify({
        entries: './src/app.js',
        debug: true,
        paths: [
            './src',
            './src/components/search',
            './src/services'
        ],
        transform: [ngAnnotate]
    });
    return b.bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'), cb);
});