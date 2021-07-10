var del = require('del');
var gulp = require('gulp');

var header = require('gulp-header');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');

var fs = require('fs')
var json = JSON.parse(fs.readFileSync('./package.json'))

gulp.task('clean', function () {
    return del(['dist/**', 'gh-pages/**'], { force: true });
});

gulp.task('minify-js', function () {
    return gulp.src('ichatbot/ichatbot.js')
        .pipe(minify({
            noSource: true,
            ext: {
                min: '-' + json.version + '.min.js',
            }
        }))
        .pipe(header('/* ichatbot library v' + json.version + '  *************** */ \n'))
        .pipe(gulp.dest('dist/'))
});

gulp.task('minify-css', function () {
    return gulp.src('ichatbot/ichatbotstyle.css')
        .pipe(cleanCss())
        .pipe(rename({ suffix: '-' + json.version + '.min' }))
        .pipe(header('/* ichatbot library v' + json.version + '  *************** */ \n'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('copy-original-files', function () {
    return gulp.src(['ichatbot/ichatbotstyle.css', 'ichatbot/ichatbot.js'])
        .pipe(rename({ suffix: '-' + json.version }))
        .pipe(header('/* ichatbot library v' + json.version + '  *************** */ \n'))
        .pipe(gulp.dest('dist/'))
});

gulp.task('copy-files', function () {
    return gulp.src(['ichatbot/ichatbotConfig.js', 'copyCmd.js', 'package.json'])
        .pipe(gulp.dest('dist/'))
});

gulp.task('copy-gh-files', function () {
    return gulp.src(['ichatbot/ichatbotConfig.js', 'ichatbot/ichatbotstyle.css', 'ichatbot/ichatbot.js', 'ichatbot/index.html',
        'ichatbot/dataset-basic-workflow.js', 'ichatbot/dataset-complex-workflow.js', 'ichatbot/dataset-fileupload-workflow.js',
        'README.md'])
        .pipe(gulp.dest('gh-pages/'))
});

gulp.task('copy-gh-images', function () {
    return gulp.src(['images/complex.gif', 'images/fileupload.gif',
        'images/ichatbotconfig.png', 'images/simple.gif'])
        .pipe(gulp.dest('gh-pages/images/'))
});

gulp.task('release', gulp.series('clean', 'minify-js', 'minify-css', 'copy-original-files', 'copy-files'));
gulp.task('gh-pages', gulp.series('copy-gh-files', 'copy-gh-images'));