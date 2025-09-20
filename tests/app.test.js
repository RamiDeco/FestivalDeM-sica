/**
 * @jest-environment jsdom
 */
const { crearGaleria, mostrarImagen, ocultarImagen } = require("../src/js/app.js");

beforeEach(() => {
  document.body.innerHTML = `
    <div class="galeria-imagenes"></div>
  `;
});

afterEach(() => {
  // Limpiar cualquier modal que pueda quedar
  const modal = document.querySelector(".modal");
  if (modal) {
    modal.remove();
  }
  document.body.classList.remove("overflow-hidden");
});

test("crearGaleria agrega 16 imágenes a la galería", () => {
  crearGaleria();
  const imgs = document.querySelectorAll(".galeria-imagenes img");
  expect(imgs.length).toBe(16);
});

test("mostrarImagen crea un modal con la imagen y botón cerrar", () => {
  mostrarImagen(1);
  const modal = document.querySelector(".modal");
  expect(modal).not.toBeNull();
  expect(modal.querySelector("img").src).toContain("1.jpg");
  expect(modal.querySelector(".btn-cerrar")).not.toBeNull();
});

test("ocultarImagen elimina el modal del DOM", async () => {
  mostrarImagen(1);
  
  // Verificar que el modal existe antes de ocultarlo
  expect(document.querySelector(".modal")).not.toBeNull();
  
  ocultarImagen();
  
  // Esperar a que se complete la animación
  await new Promise(resolve => setTimeout(resolve, 600));
  
  expect(document.querySelector(".modal")).toBeNull();
});
