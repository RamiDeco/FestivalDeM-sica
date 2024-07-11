import { src,dest,watch, series } from "gulp"
import * as dartSass from "sass"
import gulpSass from "gulp-sass" //extraer dependencias

const sass = gulpSass(dartSass) //vamos a compilar sass utilizando la dependencia gulpSass que se encuentra en dartSass

export function css(done){
    src("src/scss/app.scss", {sourcemaps: true})
        .pipe(sass().on("error", sass.logError))
        .pipe(dest("build/css", {sourcemaps:"."}))

    done();
}

export function js(done){
    src("src/js/app.js")
        .pipe(dest("build/js"))
    done();
}

export function dev(){
    
    watch("src/scss/**/*.scss",css);
    watch("src/js/**/*.js",js);
}
export default series (css, js, dev);