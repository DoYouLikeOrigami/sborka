/* --------- plugins --------- */

var
	gulp        = require('gulp'),
	//compass     = require('gulp-compass'),
	jade        = require('gulp-jade'),
	browserSync = require('browser-sync').create(),
	browserify  = require('gulp-browserify'),
	uglify      = require('gulp-uglify'),
	rename      = require("gulp-rename"),
	plumber     = require('gulp-plumber'),
	concat      = require('gulp-concat'),
	scss 		= require('gulp-sass');

/* --------- paths --------- */

var
	paths = {
		jade : {
			location    : 'dev/markups/**/*.jade',
			compiled    : 'dev/markups/_pages/*.jade',
			destination : '.'
		},

		scss : {
			location    : 'dev/styles/**/*.scss',
			entryPoint  : 'css/main.css',
			destination : 'css'
		},

		compass : {
			configFile  : 'config.rb',
			cssFolder   : 'css',
			scssFolder  : '- dev/styles',
			imgFolder   : 'img'
		},

		js : {
			location    : 'dev/scripts/main.js',
			plugins     : 'dev/scripts/_plugins/*.js',
			destination : 'js'
		},

		browserSync : {
			baseDir : './',
			watchPaths : ['*.html', 'css/*.css', 'js/*.js']
		}
	}

/* --------- jade --------- */

gulp.task('jade', function() {
	gulp.src(paths.jade.compiled)
		.pipe(plumber())
		.pipe(jade({
			pretty: '\t',
		}))
		.pipe(gulp.dest(paths.jade.destination));
});

/* --------- scss-compass --------- */
/*
gulp.task('compass', function() {
	gulp.src(paths.scss.location)
		.pipe(plumber())
		.pipe(compass({
			config_file: paths.compass.configFile,
			css: paths.compass.cssFolder,
			sass: paths.compass.scssFolder,
			image: paths.compass.imgFolder
		}));
});*/

/* --------- scss --------- */

gulp.task('scss', function () {
	gulp.src(paths.scss.location)
    	.pipe(scss().on('error', scss.logError))
    	.pipe(gulp.dest(paths.scss.destination));
});

/* --------- browser sync --------- */

gulp.task('sync', function() {
	browserSync.init({
		server: {
			baseDir: paths.browserSync.baseDir
		}
	});
});

/* --------- plugins --------- */

gulp.task('plugins', function() {
	return gulp.src(paths.js.plugins)
		.pipe(plumber())
		.pipe(concat('plugins.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.js.destination));
});

/* --------- plugins --------- */

gulp.task('scripts', function() {
	return gulp.src(paths.js.location)
		.pipe(plumber())
		.pipe(uglify())
		.pipe(rename('main.min.js'))
		.pipe(gulp.dest(paths.js.destination));
});

/* --------- watch --------- */

gulp.task('watch', function(){
	gulp.watch(paths.jade.location, ['jade']);
	gulp.watch(paths.scss.location, ['scss']);
	gulp.watch(paths.js.location, ['scripts']);
	gulp.watch(paths.js.plugins, ['plugins']);
	gulp.watch(paths.browserSync.watchPaths).on('change', browserSync.reload);
});

/* --------- default --------- */

gulp.task('default', ['jade', 'scss', 'plugins', 'scripts', 'sync', 'watch']);