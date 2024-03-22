const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');


function css(done){
    //Pasos para compilar sass
    //1. indetificar archivo; 2. compilarla; 3. Guardar el .css
    //Indicamos que finalizó la tarea

    //Identificar el archivo
    src('./src/sass/app.scss')
        //Utilizamos pipe para poder compilar el archivo recién cuando la tarea anterior haya finalizado
        .pipe(
            //compilamos el archivo .scss
            sass()
        )
        .pipe(
            postcss([ autoprefixer() ])
        )
        .pipe(
            //Almacenamos el archivo compilado en el disco
            dest('./build/css')
        )

    done();
}

function dev(){
    watch('./src/sass/**/*.scss', css);
}


exports.css = css;
exports.dev = dev;

exports.default = series(css, dev );