var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    uglify  = require('gulp-uglify'),
    concat  = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    sourcemaps = require('gulp-sourcemaps'),
    minifyCSS = require('gulp-clean-css'),
    jshint = require('gulp-jshint');

gulp.task('default', ['copy','copyvendor', 'css', 'js']); 

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
    })
})

gulp.task('copy', function() {
    return gulp.src('app/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
    }))
});

gulp.task('copyvendor', function() {
    return gulp.src(['bower_components/angular/angular.min.js', 
                    'bower_components/angular/angular.min.js.map',
                    'bower_components/bootstrap/dist/css/bootstrap.min*'])
        .pipe(gulp.dest('dist/vendor'))
        .pipe(browserSync.reload({
            stream: true
    }))
});



gulp.task('lint', function() {
    return gulp.src('app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'))
});

gulp.task('watch', ['browserSync', 'default'],  function(){
    gulp.watch('assets/scss/**/*.scss', ['css']);
    gulp.watch('app/**/*.js', ['lint', 'js']);
    gulp.watch('app/*.html', ['copy']);
})

gulp.task('css', function() {
    return gulp.src('assets/scss/**/*.scss') 
        .pipe(sass())
        .pipe(concat('styles.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(browserSync.reload({
            stream: true
    }))
})

gulp.task('js', function () {
    return gulp.src(['app/**/*.module.js', 'app/**/*.js'])
        .pipe(sourcemaps.init())
            .pipe(concat('app.min.js'))
            .pipe(ngAnnotate())
            .pipe(uglify())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(browserSync.reload({
            stream: true
    }))
})
