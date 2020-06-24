(() => { 

	'use strict';

const gulp = require('gulp'),
browserSync = require('browser-sync').create(),
sass = require('gulp-sass'),
imagemin = require('gulp-imagemin'),
size = require('gulp-size'),

dir = {
	src : 'src/',
	build : 'build/'
};



function js() {
		return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/tether/dist/js/tether.min.js'])
   				.pipe(gulp.dest('build/js'))
   				.pipe(browserSync.stream());
}


exports.js = js; 


function css() {

		return gulp.src(imageConfig.src)
		.pipe(gulp.dest(imageConfig.build))
		.pipe(imagemin(imgConfig.minOpts))
      	pipe(size({ showFiles:true }))
      	.pipe(gulp.dest(imgConfig.build));
}

const imageConfig = {
	src : dir.src + 'assets/**/*',
	build : dir.build + 'assets/',

	minOpts: {
		optimizationLevel: 5
	}
};

function images() {

		return gulp.src(imageConfig.src)
		.pipe(gulp.dest(imageConfig.build))
		.pipe(imagemin(imageConfig.minOpts))
      	pipe(size({ showFiles:true }))
      	.pipe(gulp.dest(imageConfig.build));
}


const cssConfig = {
		src 		: dir.src + 'scss/style.scss',
		watch 		: dir.src + 'scss/**/*',
		build		: dir.build + 'css/',

		sassOpts: {

			outputStyle		: 'nested',
			imagePath		: '/assets',
			precision		: 3,
			errLogToConsole		: true
		}

};

function css() {

		return gulp.src(cssConfig.src)
		  .pipe(sass(cssConfig.sassOpts).on('error', sass.logError))
		  .pipe(gulp.dest(cssConfig.build))
		  .pipe(browserSync ? browserSync.reload({stream : true}) : noop());

}

exports.css = gulp.series(js, images, css);



const syncConfig = {

	server : {

		baseDir : './',
		index : dir.src + '/index.html'
	},

	port : 8000,
	open : false
};

function server(done) {
	if(browserSync) browserSync.init(syncConfig);
	done();
}

function watch(done) {

	gulp.watch(cssConfig.watch, css);

	done();
}

exports.default = gulp.series(exports.css, watch, server);

})();

