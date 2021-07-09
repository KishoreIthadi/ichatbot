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
    return gulp.src('iChatBot/iChatBot.js')
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
    return gulp.src('iChatBot/iChatBotStyle.css')
        .pipe(cleanCss())
        .pipe(rename({ suffix: '-' + json.version + '.min' }))
        .pipe(header('/* iChatbot library v' + json.version + '  *************** */ \n'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('copy-original-files', function () {
    return gulp.src(['iChatBot/iChatBotStyle.css', 'iChatBot/iChatBot.js'])
        .pipe(rename({ suffix: '-' + json.version }))
        .pipe(header('/* iChatbot library v' + json.version + '  *************** */ \n'))
        .pipe(gulp.dest('dist/'))
});

gulp.task('copy-files', function () {
    return gulp.src(['iChatBot/iChatBotConfig.js', 'copyCmd.js', 'package.json'])
        .pipe(gulp.dest('dist/'))
});

gulp.task('copy-gh-files', function () {
    return gulp.src(['iChatBot/iChatBotConfig.js', 'iChatBot/iChatBotStyle.css', 'iChatBot/iChatBot.js', 'iChatBot/index.html',
        'iChatBot/dataset-Basic-WorkFlow.js', 'iChatBot/dataset-Complex-WorkFlow.js', 'iChatBot/dataset-FileUpload-WorkFlow.js',
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