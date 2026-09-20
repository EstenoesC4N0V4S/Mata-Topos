let aciertos = 0;
let fallos = 0;
let juegoInterval = null;
const TIEMPO_TOPO_VISIBLE = 1000;
const INTERVALO_APARICION = 1200;
const FILAS = 3;
const COLUMNAS = 3;

function actualizarContadores() {
  document.getElementById("aciertos").textContent = aciertos;
  document.getElementById("fallos").textContent = fallos;
}

function crearCuadricula() {
  const cuadricula = document.getElementById("cuadricula");
  cuadricula.textContent = "";

  for (let i = 0; i < FILAS * COLUMNAS; i++) {
    const casilla = document.createElement("div");
    casilla.classList.add("casilla");
    casilla.dataset.activo = "false";

    const img = document.createElement("img");
    img.src = "img/topo.png";
    casilla.appendChild(img);

    cuadricula.appendChild(casilla);
  }
}

function mostrarTopo(casilla) {
  let img = casilla.querySelector("img");
  casilla.dataset.activo = "true";
  img.classList.add("sube");

  setTimeout(() => {
    if (casilla.dataset.activo === "true") {
      casilla.dataset.activo = "false";
      img.classList.remove("sube");
      fallos++;
      actualizarContadores();
    }
  }, TIEMPO_TOPO_VISIBLE);
}

function manejarClick(casilla) {
  let img = casilla.querySelector("img");
  if (casilla.dataset.activo == "true") {
    aciertos++;
    casilla.dataset.activo = "false";
    img.classList.remove("sube");
  } else {
    fallos++;
  }
  actualizarContadores();
}

function aparecerTopo(casillas) {
  let index = Math.floor(Math.random() * casillas.length);
  mostrarTopo(casillas[index]);
}

function iniciarJuego(casillas) {
  aciertos = 0;
  fallos = 0;
  actualizarContadores();

  if (juegoInterval) clearInterval(juegoInterval);

  juegoInterval = setInterval(() => aparecerTopo(casillas), INTERVALO_APARICION);
}

window.onload = function () {
  crearCuadricula();
  const casillas = document.querySelectorAll(".casilla");
  const btnIniciar = document.getElementById("btnIniciar");

  for (const casilla of casillas) {
    casilla.addEventListener("click", () => manejarClick(casilla));
  }

  btnIniciar.addEventListener("click", () => iniciarJuego(casillas));
};
