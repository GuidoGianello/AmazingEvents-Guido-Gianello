import {
  conjuntoCheck,
  imprimeCheck,
  filtroCategorias,
  filterCheckSearch,
} from "../modules/functions.js"

const contenedor = document.getElementById("contenedor-card")
const contenedorCheck = document.getElementById("section-categorias")
const inputSearch = document.getElementById("search-bar")
const URL_API = `https://mindhub-xj03.onrender.com/api/amazing`
let eventos

fetch(URL_API)
  .then(response => response.json())
  .then(({events}) => {
    eventos = events
    let categoriasEventos = filtroCategorias(events)
    let todosCheck = conjuntoCheck(categoriasEventos)
    imprimeCheck(todosCheck, contenedorCheck)
    filterCheckSearch(events, inputSearch, contenedor)
  })
  .catch((err) => console.log(err))

  inputSearch.addEventListener("input", () => {
    filterCheckSearch(eventos, inputSearch, contenedor)
  })
  contenedorCheck.addEventListener("change", () => {
    filterCheckSearch(eventos, inputSearch, contenedor)
  })


