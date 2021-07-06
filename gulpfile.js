var del = require('del');
var gulp = require('gulp');

var header = require('gulp-header');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');

var fs = require('fs')
var json = JSON.parse(fs.readFileSync('./package.json'))

gulp.task('clean', function () {
    return del('dist/**', { force: true });
});

gulp.task('minify-js', function () {
    return gulp.src(['iChatBot/iChatBot.js'])
        .pipe(minify({
            noSource: true,
            ext: {
                min: '-' + json.version + '.min.js',
            }
        }))
        .pipe(header('/* iChatbot library v' + json.version + '  *************** */ \n'))
        .pipe(gulp.dest('dist/'))
});

gulp.task('minify-css', function () {
    return gulp.src(['iChatBot/iChatBotStyle.css'])
        .pipe(cleanCss())
        .pipe(rename({ suffix: '-' + json.version + '.min' }))
        .pipe(header('/* iChatbot library v' + json.version + '  *************** */ \n'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('copy-md-files', function () {
    return gulp.src(['README.md', 'CHANGELOG.md'])
        .pipe(gulp.dest('dist/'))
});

gulp.task('copy-original-files', function () {
    return gulp.src(['iChatBot/iChatBotStyle.css', 'iChatBot/iChatBot.js'])
        .pipe(rename({ suffix: '-' + json.version }))
        .pipe(header('/* iChatbot library v' + json.version + '  *************** */ \n'))
        .pipe(gulp.dest('dist/'))
});

gulp.task('minify', gulp.series('clean', 'minify-js', 'minify-css', 'copy-md-files', 'copy-original-files'));