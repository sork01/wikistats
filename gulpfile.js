var gulp        = require('gulp'),
    //sass        = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    uglify      = require('gulp-uglify'),
    sourcemaps  = require('gulp-sourcemaps'),
    minifyCSS   = require('gulp-clean-css'),
    jshint      = require('gulp-jshint'),
    source      = require('vinyl-source-stream'),
    streamify   = require('gulp-streamify'),
    browserify  = require('browserify'),
    concat      = require('gulp-concat'),
    buffer      = require('vinyl-buffer');

gulp.task('default', ['copy','copyvendor', 'css', 'js', 'lint']);

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
    })
})

gulp.task('copy', function() {
    return gulp.src(['app/*.html', 'assets/projects.json'])
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
})

gulp.task('copyvendor', function() {
    return gulp.src(['node_modules/angular/**/*', 
                    'node_modules/angular-resource/**/*',
                    'node_modules/angular-animate/**/*',
                    'node_modules/bootstrap-css-only/css/**/*',
                    'node_modules/angular-ui-bootstrap/dist/**/*',
                    'node_modules/highcharts-exporting/exporting.js',
                    'node_modules/highcharts-offline-exporting/offline-exporting.js',
                    'node_modules/highcharts/highcharts.js',
                    'node_modules/jquery/dist/*'])
        .pipe(gulp.dest('dist/vendor'))
})

gulp.task('lint', function() {
    return gulp.src('app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        //.pipe(jshint.reporter('fail'))
});

gulp.task('watch', ['browserSync', 'default'],  function(){
    gulp.watch('assets/scss/**/*.s*ss', ['css']);
    gulp.watch('app/**/*.js', ['lint', 'js']);
    gulp.watch('app/*.html', ['copy']);
})

gulp.task('css', function() {
    return gulp.src('assets/scss/**/*.s*ss') 
        //.pipe(sass())
        .pipe(concat('styles.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(browserSync.stream());
})

gulp.task('js', function () {
    return browserify('./app/index.js').ignore('angular').bundle()
        .pipe(source('app.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(streamify(uglify()))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/assets/js'))
})
