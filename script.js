// Objeto que almacenará los arrays de frases por idioma
let arraysPorIdioma = {};
let arraysPorIdiomaTraducido = {};
let frasesPorIdiomaTraducido = {};
let indiceAletorio = 0;

// Elementos del DOM
let titulo = document.getElementById("texto-frase");
let boton = document.getElementById("btn");

// Variables de estado
let currentArray = [];
let currentIdioma = "es"; // Idioma predeterminado
let currentArrayName = ""; // Nombre del conjunto de frases actual

// Evento al hacer clic en el botón
boton.addEventListener("mousedown", function (event) {
  event.preventDefault(); // Evitar que el botón pierda el foco al hacer clic
  cambiarMensaje();
  document.getElementById("frase-traducida").style.display = "none";
});

let botonEspanolTraduccion = document.getElementById("traduccion-es");
let botonInglesTraduccion = document.getElementById("traduccion-en");
let botonFrancesTraduccion = document.getElementById("traduccion-fr");
let botonItalianoTraduccion = document.getElementById("traduccion-it");

let fraseTraducida = document.getElementById("frase-traducida");
// Evento al hacer clic en el botón de traducción
botonEspanolTraduccion.addEventListener("click", function () {
  cargarFrasesPorIdiomaTraducido("es");
  traducirIdioma("es", indiceAletorio);
});

botonInglesTraduccion.addEventListener("click", function () {
  cargarFrasesPorIdiomaTraducido("en");
  traducirIdioma("en", indiceAletorio);
});

botonItalianoTraduccion.addEventListener("click", function () {
  cargarFrasesPorIdiomaTraducido("it");
  traducirIdioma("it", indiceAletorio);
});

botonFrancesTraduccion.addEventListener("click", function () {
  cargarFrasesPorIdiomaTraducido("fr");
  traducirIdioma("fr", indiceAletorio);
});

// Supongamos que tienes un botón para cambiar el idioma a inglés
let botonIngles = document.getElementById("en");

botonIngles.addEventListener("click", function () {
  cambiarIdioma("en");
});
let botonEspañol = document.getElementById("es");

botonEspañol.addEventListener("click", function () {
  cambiarIdioma("es");
});

let botonItaliano = document.getElementById("it");

botonItaliano.addEventListener("click", function () {
  cambiarIdioma("it");
});

let botonFrances = document.getElementById("fr");

botonFrances.addEventListener("click", function () {
  cambiarIdioma("fr");
});
function cargarFrasesPorIdioma(idioma) {
  let url = `data/frases-${idioma}.json`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Error al cargar frases: ${response.status} - ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      arraysPorIdioma[idioma] = data;
      cambiarMensaje(); // Cambia el mensaje una vez cargadas las frases
    })
    .catch((error) => console.error(error));
}

// Cambia el idioma y carga las frases correspondientes
function cambiarIdioma(idioma) {
  currentIdioma = idioma;
  cargarFrasesPorIdioma(idioma);
}

// Cambia el mensaje mostrado en el título
function cambiarMensaje() {
  cambiarFondoAleatorio(); // Cambia el fondo aleatoriamente

  // Obtiene el array actual según el idioma y el nombre del conjunto de frases
  let idiomaActual = arraysPorIdioma[currentIdioma];
  if (idiomaActual && idiomaActual[currentArrayName]) {
    currentArray = idiomaActual[currentArrayName];
    let indice = generarEntero(0, currentArray.length);
    titulo.innerText = `"${currentArray[indice]}"`;
  }
  console.log(arraysPorIdioma);
}

// Genera un número entero aleatorio en el rango especificado
function generarEntero(min, max) {
  indiceAletorio = Math.floor(Math.random() * (max - min) + min);

  return indiceAletorio;
}

let backgroundImages = [
  "img/imagen1.jpg",
  "img/imagen2.jpg",
  "img/imagen3.jpg",
  "img/imagen4.jpg",
  "img/imagen6.jpg",
  "img/imagen7.jpg",
  "img/imagen8.jpg",
  "img/imagen9.jpg",
  "img/imagen12.jpg",
  "img/imagen13.jpg",
  "img/imagen14.jpg",
  "img/imagen15.jpg",
  "img/imagen16.jpg",
];

// Cambia el fondo del body con una imagen aleatoria
function cambiarFondoAleatorio() {
  let randomIndex = Math.floor(Math.random() * backgroundImages.length);
  let selectedImage = backgroundImages[randomIndex];
  document.body.style.backgroundImage = `url('${selectedImage}')`;
}

// Copia el texto de la frase actual al portapapeles
function copiarFrase() {
  let textoFrase = titulo.innerText;

  let inputTemp = document.createElement("input");
  inputTemp.setAttribute("value", textoFrase);
  document.body.appendChild(inputTemp);

  inputTemp.select();
  inputTemp.setSelectionRange(0, 99999);

  document.execCommand("copy");

  document.body.removeChild(inputTemp);

  let mensajeCopiado = document.getElementById("mensaje-copiado");
  mensajeCopiado.style.display = "block";

  setTimeout(function () {
    mensajeCopiado.style.display = "none";
  }, 3000);
}

// Cambia el conjunto de frases actual y carga las frases correspondientes
function cambiarArray(arrayName) {
  cargarFrasesPorIdioma(currentIdioma); // Recarga las frases por idioma
  currentArrayName = arrayName; // Actualiza el nombre del conjunto de frases actual
  cambiarEstadoBotonActivo(arrayName); // Cambia el estado del botón activo
  document.getElementById("frase-traducida").style.display = "none";
}

// Cambia el estado del botón activo
function cambiarEstadoBotonActivo(buttonId) {
  const buttons = document.querySelectorAll(".botones button, section button");
  buttons.forEach((button) => {
    if (button.id === buttonId) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

const tituloPrincipal = document.querySelector(".titulo");
tituloPrincipal.innerHTML = tituloPrincipal.textContent.replace(
  /\S/g,
  "<span>$&</span>"
);

const frases = [
  "Bienvenido al Buscador de Frases.<br />Selecciona un idioma y tipo de Frase 💫",
  "Welcome to the Phrase Searcher.<br />Select a language and type of phrase 💫",
  "Benvenuti nel Cercatore di Frasi.<br />Seleziona una lingua e un tipo di frase 💫",
  "Bienvenue dans le Chercheur de Phrases.<br />Sélectionnez une langue et un type de phrase 💫",
];

function traducir(idiomaIndex) {
  document.getElementById("texto-frase").innerHTML = frases[idiomaIndex];
  console.log(arraysPorIdioma);
}

function copiarFrase() {
  document.getElementById("mensaje-copiado").style.display = "block";
  setTimeout(function () {
    document.getElementById("mensaje-copiado").style.display = "none";
  }, 2000);
}
function cargarFrasesPorIdiomaTraducido(idioma) {
  let url = `data/frases-${idioma}.json`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Error al cargar frases: ${response.status} - ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("Datos cargados:", data); // Verificar los datos cargados

      // Clonar el objeto data para evitar que ambas variables apunten al mismo objeto
      let clonedData = JSON.parse(JSON.stringify(data));

      // Asignar datos clonados a arraysPorIdiomaTraducido y frasesPorIdiomaTraducido
      arraysPorIdiomaTraducido[idioma] = clonedData;
      frasesPorIdiomaTraducido[idioma] = clonedData;

      console.log(arraysPorIdiomaTraducido);
      console.log(frasesPorIdiomaTraducido);
    })
    .catch((error) => console.error(error));
}

// Llamada a la función para cargar los datos por idioma
cargarFrasesPorIdiomaTraducido("es");
cargarFrasesPorIdiomaTraducido("en");
cargarFrasesPorIdiomaTraducido("it");
cargarFrasesPorIdiomaTraducido("fr");

function traducirIdioma(idioma, indiceAleatorio) {
  // Obtener el nombre del array correspondiente al idioma y al botón seleccionado
  let nombreArray = obtenerNombreArrayPorIdioma(idioma);
  console.log("nombre array " + nombreArray);
  // Obtener el conjunto de frases del idioma especificado desde frasesPorIdiomaTraducido
  let frasesPorIdiomaActual = frasesPorIdiomaTraducido[idioma];
  console.log("frase por idioma traducido " + frasesPorIdiomaTraducido);
  console.log("frase por idioma actual " + frasesPorIdiomaActual);
  // Verificar si hay frases para el idioma especificado y si el nombreArray está presente
  if (frasesPorIdiomaActual && frasesPorIdiomaActual[nombreArray]) {
    // Obtener la traducción de la frase actual al idioma especificado
    let fraseTraducida = frasesPorIdiomaActual[nombreArray][indiceAleatorio];

    // Mostrar la frase traducida en el elemento con el id "frase-traducida"
    document.getElementById("frase-traducida").innerHTML = fraseTraducida;
    // Mostrar el div que contiene la frase traducida
    document.getElementById("frase-traducida").style.display = "block";

    // Opcional: También puedes mostrar la frase traducida en la consola para verificar
    console.log("Frase traducida:", fraseTraducida);
  } else {
    // Si no hay frases disponibles para el idioma o el conjunto de frases actual, ocultar el div
    document.getElementById("frase-traducida").style.display = "none";

    // Si no hay frases disponibles para el idioma o el conjunto de frases actual, mostrar un mensaje de error
    console.error(
      "No hay frases disponibles para el idioma o el conjunto de frases actual"
    );
  }
}

// Función para obtener el nombre del array por idioma
function obtenerNombreArrayPorIdioma(idioma) {
  // Mapeo de nombres de array por idioma
  let nombresArraysPorIdioma = {
    es: {
      frasesMotivacionales: "frasesMotivacionales",
      mensajesAmorAmistad: "mensajesAmorAmistad",
      consejosBienestarMental: "consejosBienestarMental",
      frasesMotivacionalesTrabajo: "frasesMotivacionalesTrabajo",
      citasGratitud: "citasGratitud",
      pensamientosPositivos: "pensamientosPositivos",
      curiosidadesOptimistas: "curiosidadesOptimistas",
      anecdotasPositivas: "anecdotasPositivas",
      consejosDeVida: "consejosDeVida",
      reflexionesDiarias: "reflexionesDiarias",
      frasesInspiradoras: "frasesInspiradoras",
      refranesFamosos: "refranesFamosos",
      frasesFamosas: "frasesFamosas",
    },
    en: {
      frasesMotivacionales: "frasesMotivacionales",
      mensajesAmorAmistad: "mensajesAmorAmistad",
      consejosBienestarMental: "consejosBienestarMental",
      frasesMotivacionalesTrabajo: "frasesMotivacionalesTrabajo",
      citasGratitud: "citasGratitud",
      pensamientosPositivos: "pensamientosPositivos",
      curiosidadesOptimistas: "curiosidadesOptimistas",
      anecdotasPositivas: "anecdotasPositivas",
      consejosDeVida: "consejosDeVida",
      reflexionesDiarias: "reflexionesDiarias",
      frasesInspiradoras: "frasesInspiradoras",
      refranesFamosos: "refranesFamosos",
      frasesFamosas: "frasesFamosas",
    },
    it: {
      frasesMotivacionales: "frasesMotivacionales",
      mensajesAmorAmistad: "mensajesAmorAmistad",
      consejosBienestarMental: "consejosBienestarMental",
      frasesMotivacionalesTrabajo: "frasesMotivacionalesTrabajo",
      citasGratitud: "citasGratitud",
      pensamientosPositivos: "pensamientosPositivos",
      curiosidadesOptimistas: "curiosidadesOptimistas",
      anecdotasPositivas: "anecdotasPositivas",
      consejosDeVida: "consejosDeVida",
      reflexionesDiarias: "reflexionesDiarias",
      frasesInspiradoras: "frasesInspiradoras",
      refranesFamosos: "refranesFamosos",
      frasesFamosas: "frasesFamosas",
    },
    fr: {
      frasesMotivacionales: "frasesMotivacionales",
      mensajesAmorAmistad: "mensajesAmorAmistad",
      consejosBienestarMental: "consejosBienestarMental",
      frasesMotivacionalesTrabajo: "frasesMotivacionalesTrabajo",
      citasGratitud: "citasGratitud",
      pensamientosPositivos: "pensamientosPositivos",
      curiosidadesOptimistas: "curiosidadesOptimistas",
      anecdotasPositivas: "anecdotasPositivas",
      consejosDeVida: "consejosDeVida",
      reflexionesDiarias: "reflexionesDiarias",
      frasesInspiradoras: "frasesInspiradoras",
      refranesFamosos: "refranesFamosos",
      frasesFamosas: "frasesFamosas",
    },
  };

  // Devolver el nombre del array correspondiente al idioma y al botón seleccionado
  return nombresArraysPorIdioma[idioma][currentArrayName];
}
