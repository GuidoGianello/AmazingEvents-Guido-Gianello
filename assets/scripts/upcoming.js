import {
  conjuntoCheck,
  imprimeCheck,
  filtroCategorias,
  filterCheckSearch,
  filtraEventosUp,
} from "../modules/functions.js"

const contenedor = document.getElementById("contenedor-card")
const contenedorCheck = document.getElementById("section-categorias")
const inputSearch = document.getElementById("search-bar")
const URL_API = `https://mindhub-xj03.onrender.com/api/amazing`
let eventos;

fetch(URL_API)
  .then((response) => response.json())
  .then(({events, currentDate}) => {
    eventos = filtraEventosUp(currentDate, events)
    let categoriasEventos = filtroCategorias(eventos)
    let todosCheck = conjuntoCheck(categoriasEventos)
    imprimeCheck(todosCheck, contenedorCheck)
    filterCheckSearch(eventos, inputSearch, contenedor)
  })
  .catch((err) => console.log(err))

  inputSearch.addEventListener("input", () => {
    filterCheckSearch(eventos, inputSearch, contenedor)
  })
  contenedorCheck.addEventListener("change", () => {
    filterCheckSearch(eventos, inputSearch, contenedor)
  })

