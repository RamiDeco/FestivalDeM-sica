document.addEventListener("DOMContentLoaded", function(){
    navegacionFija();
    crearGaleria();
    resaltarSeccion();
    scrollNav();
})

function resaltarSeccion() {
    
    document.addEventListener("scroll", function(){
        const sections = document.querySelectorAll("section")
        const navLinks = document.querySelectorAll(".navegacion-principal a")

        let actual = "";
        sections.forEach(function(section){
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= (sectionTop - sectionHeight/3)){
                actual = section.id;
            }
        })

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${actual}`){
                link.classList.add("active");
            }
        })

    })
    




}

function navegacionFija(){
     const header = document.querySelector(".header")
     const sobreFestival = document.querySelector(".sobre-festival")

    document.addEventListener("scroll", function(){
         if (sobreFestival.getBoundingClientRect().bottom < 1){
             header.classList.add("fixed")
         } else{
             header.classList.remove("fixed")
        }
    })
}

function crearGaleria(){
    
    const galeria = document.querySelector(".galeria-imagenes");
    
    for (let i=1; i<=16; i++){
        const imagen = document.createElement("IMG");
        imagen.src = `src/img/gallery/full/${i}.jpg`;
        
        imagen.onclick = function(){
            mostrarImagen(i)
        }
        
        galeria.appendChild(imagen);


    }
}



function mostrarImagen(i){
    const imagen = document.createElement("IMG");
    imagen.src = `src/img/gallery/full/${i}.jpg`;
    
    const modal = document.createElement("DIV");
    modal.classList.add("modal");

    const cerrarModalBtn = document.createElement("BUTTON");
    cerrarModalBtn.classList.add("btn-cerrar");
    cerrarModalBtn.textContent = "X";
    cerrarModalBtn.onclick = ocultarImagen;

    const body = document.querySelector("body");
    body.classList.add("overflow-hidden");
    body.appendChild(modal);
    modal.appendChild(imagen);
    modal.appendChild(cerrarModalBtn);

    modal.onclick = ocultarImagen;

}

function ocultarImagen(){
    const modal = document.querySelector(".modal");
    modal.classList.add("fade-out"); //Le agregamos esta clase antes de eliminarlo para poder realizar la animación
   
    setTimeout(() => {
        const body = document.querySelector("body");
        body.classList.remove("overflow-hidden");

        modal?.remove(); 
    }, 500);
    
}

function scrollNav(){
    const navLinks = document.querySelectorAll(".navegacion-principal a")

    navLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const sectionScroll = e.target.getAttribute("href");
            const section = document.querySelector(sectionScroll);

            section.scrollIntoView({behavior:"smooth"});
        })
    })
}