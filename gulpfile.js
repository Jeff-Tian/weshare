var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
//var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
    sass: ['./scss/**/*.scss']
};

gulp.task('default', ['jshint', 'test', 'start']);

gulp.task('sass', function (done) {
    gulp.src('./scss/ionic.app.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function () {
    return bower.commands.install()
        .on('log', function (data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function (done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});

// Import at the top of the file
var karma = require('karma').server;

/**
 * Test task, run test once and exit
 */
gulp.task('test', function (done) {
    karma.start({
        configFile: __dirname + '/tests/my.conf.js',
        singleRun: true
    }, function () {
        done();
    });
});

var jshint = require('gulp-jshint');

gulp.task('jshint', function () {
    gulp
        .src(['./www/js/**/*.js', './tests/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

var concat = require('gulp-concat');
var sourceFiles = 'www/.';
gulp.task('rsync', function (done) {
    sh.mkdir('dist');

    // http://ss64.com/osx/rsync.html
    var command = 'rsync -rlpt ' + sourceFiles + ' ' + 'dist/.';

    console.log(command);

    sh.exec(command, function () {
        done();
    });
});

var minifyHTML = require('gulp-minify-html');
gulp.task('minify-html', function () {
    var opts = {
        conditionals: false,
        spare: false
    };

    return gulp.src('./dist/**/*.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('./dist/'));
});


var minifyCss = require('gulp-minify-css');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var minify = require('gulp-minify');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');
gulp.task('minify-js-css', function () {
    var assets = useref.assets();

    return gulp.src('www/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

gulp.task('build', function (done) {
    runSequence('rsync', 'minify-js-css', 'minify-html', done);
});

var env = {
    dev: {ip: '121.199.35.151', domain: 'http://meiyanruhua.tao3w.com', user: 'root'},
    test: {ip: '112.74.77.139', domain: 'http://test.meiyanruhua.com', user: 'root'},
    production: {ip: '120.26.216.41', domain: '120.26.216.41', user: 'root'}
};

function getRemote(env) {
    return env.user + '@' + env.ip;
}

gulp.task('deploy-build-production', function (done) {
    var remote = getRemote(env.production);

    var command = 'rsync -ave ssh ./dist/ ' + remote + ':/var/www/html/jiy/.';
    console.log(command);

    sh.exec(command, function () {
        done();
    });
});

gulp.task('deploy-production', function (done) {
    runSequence('build', 'deploy-build-production', done);
});

var fs = require('fs');
function getAppVersion() {
    var configXML = fs.readFileSync('./config.xml').toString();
    var flag = '<widget id="com.ionicframework.workspace440082" version="';
    var index = configXML.indexOf(flag);
    if (index >= 0) {
        var index2 = configXML.indexOf('"', index + flag.length);
        var version = configXML.substring(index + flag.length, index2);

        return version;
    } else {
        return 'Version not found.';
    }
}

gulp.task('version', function (done) {
    console.log(getAppVersion());
    done();
});

gulp.task('android-release', function (done) {
    var fileName = 'jiy-' + getAppVersion() + '.apk';
    sh.rm(fileName);

    sh.exec('ionic build --release android', function () {
        var apkPath = '/Users/tianjie/jiy/platforms/android/build/outputs/apk/android-release-unsigned.apk';

        var signCommand = 'jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore -storepass 1050709 ' + apkPath + ' ' + 'alias_name';

        sh.echo('ready to sign: ');
        sh.echo(signCommand);
        sh.exec(signCommand, function () {
            sh.exec('zipalign -v 4 ' + apkPath + ' ' + fileName, function () {
                done();
            });
        });
    });
});

gulp.task('start', function (done) {
    sh.exec('node index.js', done);
});

gulp.task('mock-release', function (done) {
    process.env.NODE_ENV = 'prd';

    done();
});

gulp.task('local-release', ['mock-release', 'default']);

gulp.task('release', ['mock-release', 'jshint', 'mocha', 'test']);

gulp.task('mocha', function (done) {
    sh.exec('mocha', done);
});