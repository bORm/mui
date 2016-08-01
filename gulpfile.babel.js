/**
 * Created by borm on 01.08.2016.
 */
import fs from 'fs'
import path from 'path'
import gulp from 'gulp'
import webpack from 'webpack'
const gulpWebpack = require('gulp-webpack');
const named = require('vinyl-named');
const babelRc = JSON.parse(fs.readFileSync('./.babelrc'));
import autoprefixer from 'autoprefixer'

gulp.task('default', function() {
	return gulp.src([
		'src/index.js'
	])
	.pipe(gulpWebpack({
		watch: true,
		context: path.resolve(__dirname, 'src'),
		entry: {
			index: 'index.js'
		},
		resolve: {
			root: path.resolve(__dirname, 'src'),
			extensions: ['', '.js', '.jsx', '.scss']
		},
		output: {
			path: __dirname + '/dist',
			filename: '[name].js',
			library: "mui",
			libraryTarget: 'umd'
		},
		externals: {
			// Use external version of React
			'react': {
				root: 'React',
				commonjs2: 'react',
				commonjs: 'react',
				amd: 'react'
			},
			//"react-dom": "ReactDOM",
		},
		module : {
			loaders : [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					query: {
						cacheDirectory: true,
						presets: babelRc.presets,
						plugins: babelRc.plugins
					}
				},
				{
					test: /\.scss$/,
					loaders: [
						'style',
						//'css?sourceMap', // Blob file
						'css',
						'postcss',
						'sass?sourceMap'
						+ '&includePaths[]=' + path.resolve(__dirname, "node_modules/compass-mixins/lib")
					]
				}
			]
		},
		postcss: [
			autoprefixer({
				browsers: ['last 2 versions']
			})
		]
	}))
	.pipe(gulp.dest('dist/'));
});