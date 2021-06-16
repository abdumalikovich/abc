const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer') // prefixex
const cleanCSS = require('gulp-clean-css') // minify css
const concat = require('gulp-concat') // unit files
const sass = require('gulp-sass') // scss sass

// sources
const paths = {
    styles: {
        src: {
            custom: './styles/scss/**/*.scss',
			css: './styles/css/'
        },
        dist: './public/css'
    }
}

sass.compiler = require('node-sass');

// styles custom optimize
function CustomStyles() {
    return gulp.src(paths.styles.src.custom)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(autoprefixer({ overrideBrowserslist: ['> 1%'], cascade: false }))
        .pipe(cleanCSS({ level: 2 }))
        .pipe(gulp.dest(paths.styles.dist))
}

// css styles
function CssStyles() {
    return gulp.src(paths.styles.src.css)
		.pipe(gulp.dest(paths.styles.dist))
}


// watchin' onchange
function watch() {
    gulp.watch(paths.styles.src.custom, CustomStyles)
    gulp.watch(paths.styles.src.css, CssStyles)
}

gulp.task('styles', CustomStyles)
gulp.task('styles', CssStyles)
gulp.task('watch', watch)

gulp.task('build', gulp.parallel(CustomStyles, CssStyles))
gulp.task('default', gulp.series('build', 'watch'))
