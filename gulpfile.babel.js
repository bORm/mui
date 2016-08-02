import gulp from 'gulp'
import babel from 'gulp-babel'
import watch from 'gulp-watch'
import cached from 'gulp-cached'
import sourcemaps from 'gulp-sourcemaps'

gulp.task("watch", ()=>{
	return watch([
		"src/*.js",
		"src/**/*.js"
	], ()=>{
		gulp.start('babel')
	})
});

gulp.task('babel', ()=>{
	return gulp.src('src/**/*.js')
		.pipe(cached('listing'))
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('lib'));
});

gulp.task('default', ['babel', 'watch']);