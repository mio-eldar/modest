var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	cleanCSS = require('gulp-clean-css'),
	sourcemaps = require('gulp-sourcemaps'),
	postcss = require('gulp-postcss'),
	autoprefixer = require('gulp-autoprefixer'),
	cssnext = require('cssnext'),
	precss = require('precss');
gulp.task('default', ['watch']);
 
gulp.task('sass', function(){
	var processors = [
		autoprefixer,
		cssnext,
		precss
	];
	return gulp.src('app/sass/**/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(concat('styles.css'))
	.pipe(cleanCSS())
	.pipe(postcss(processors))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({
		stream: true
	}))
});

gulp.task('watch', ['browserSync'], function(){
	gulp.watch('app/sass/**/*.scss', ['sass']);
	gulp.watch('app/**/*.scss', browserSync.reload);
	gulp.watch('app/**/*.php', browserSync.reload);
	gulp.watch('app/**/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);

});

gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir: './app/'
		}
	})
});