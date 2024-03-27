//CSS & SASS DEPENDENCIES
const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

//Images Dependencies
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

function css(done){
    //Pasos para compilar sass
    //1. indetificar archivo; 2. compilarla; 3. Guardar el .css
    //Indicamos que finalizó la tarea

    //Identificar el archivo
    src('./src/sass/app.scss')
        .pipe(
            sourcemaps.init()
        )
        //Utilizamos pipe para poder compilar el archivo recién cuando la tarea anterior haya finalizado
        .pipe(
            //compilamos el archivo .scss
            sass()
        )
        .pipe(
            postcss([ autoprefixer(), cssnano()])
        )
        .pipe(
            sourcemaps.write('.')
        )
        .pipe(
            //Almacenamos el archivo compilado en el disco
            dest('./build/css')
        )

    done();
}

function img(done){
    src("./src/img/**/*")
        .pipe(
            imagemin({optimizationLevel:3})
        )
        .pipe(
            dest("./build/img")
        )

    done();
}

function webpVersion(done){
    src('./src/img/**/*.{jpg,png}')
        .pipe(
            webp()
        )
        .pipe(
            dest('./build/img')
        )
    done();
}

function avifVersion(done){
    src('./src/img/**/*.{jpg,png}')
        .pipe(
            avif()
        )
        .pipe(
            dest('./build/img')
        )
    done();
}

function dev(){
    watch('./src/sass/**/*.scss', css);
    watch('./src/img/**/*', img);
}


exports.css = css;
exports.dev = dev;
exports.img=img;
exports.webpVersion=webpVersion;
exports.avifVersion=avifVersion;

exports.default = series(img,webpVersion,avifVersion, css, dev );