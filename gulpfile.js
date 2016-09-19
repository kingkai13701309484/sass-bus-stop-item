var gulp = require('gulp');
var uglify=require('gulp-uglify');   //js压缩
var concat=require('gulp-concat');   //文件合并


var minifycss=require('gulp-minify-css');  //css压缩
var imagemin=require('gulp-imagemin');  //图片压缩
var  htmlmin=require('gulp-htmlmin');   //html压缩
var rev=require('gulp-rev'); //对文件名加md5后缀

var  sass=require('gulp-sass');    //sass

//sass自动转换css
gulp.task('css',function() {
	gulp.src('styles.scss')
		.pipe(sass())
		.pipe(rev())
		.pipe(gulp.dest('build/sass'));  
});

//对scss文件的自动监控
gulp.task('watch', function() {
	gulp.watch('styles.scss',['css']) 
});

//css压缩合并
gulp.task('css-uglify', function() {
	gulp.src('stylesheets/*.css')
		.pipe(minifycss())
		.pipe(concat('all.min.css'))
		.pipe(rev())
		.pipe(gulp.dest('build/css')); 
});

//html压缩
gulp.task('html', function() {
	gulp.src('*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(rev())
		.pipe(gulp.dest('build')); 
});

//图片压缩
gulp.task('image', function() {
	gulp.src('images/*')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./build/images/')); 
});

//js压缩合并
gulp.task('default', ['watch','image','html','css-uglify'],function() {
	gulp.src('js/*.js')
		.pipe(uglify())
		.pipe(concat('all.min.js'))
		.pipe(rev())
		.pipe(gulp.dest('build/js')); 
});
