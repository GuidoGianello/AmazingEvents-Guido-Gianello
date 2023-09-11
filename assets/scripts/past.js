const contenedor = document.getElementById("contenedor-card")
const contenedorCheck = document.getElementById("section-categorias")
const inputSearch = document.getElementById("search-bar")

function creaCard(evento) {
  return `<div class="col-12 col-md-6 col-xl-3 d-flex justify-content-center pt-2 pb-2">
  <div class="card" style="width: 18rem; height: 24rem;">
    <img src="${evento.image}" class="card-img-top img-card" alt="platos-comida">
    <div class="card-body">
      <h5 class="card-title text-center">${evento.name}</h5>
      <p class="card-text text-center">${evento.description}</p>
      <div class="d-flex justify-content-between">
        <p class="card-text">Price: ${evento.price}$</p>
        <a href="../pages/details.html?parametro=${evento._id}" class="btn btn-primary">Details</a>
      </div>
    </div>
  </div>
</div>`
}

const categoriasEventos = filtroCategorias(data.events);
function creaCheck(categoria) {
  return `<label for="${categoria}">${categoria}</label>
    <input type="checkbox" id="${categoria}" value="${categoria}">
    `
}

function conjuntoCheck(listaEventos) {
  let todosCheck = listaEventos
    .map((categoria) => creaCheck(categoria))
    .join(` `)
  return todosCheck
}
const todosCheck = conjuntoCheck(categoriasEventos)

function imprimirCards(array, contenedor) {
  let template = ""
  if (array == 0) {
    template = "No results found"
  }
  for (let info of array) {
    template += creaCard(info)
  }
  contenedor.innerHTML = template
}

function imprimeCheck(template, contenedor) {
  contenedor.innerHTML = template
}
imprimeCheck(todosCheck, contenedorCheck)

inputSearch.addEventListener("input", () => {
  filterCheckSearch()
})

contenedorCheck.addEventListener("change", () => {
  filterCheckSearch()
})

function filtraEventosPast(fechaReferencia, listaEventos) {
  let eventosFiltrados = listaEventos.filter(
    (evento) => evento.date <= fechaReferencia
  )
  return eventosFiltrados
}
const eventosFiltrados = filtraEventosPast(data.currentDate, data.events)

function filtroCategorias(listaEventos) {
  let categorias = listaEventos.map((evento) => evento.category)
  let categoriasEventos = [...new Set(categorias)]
  return categoriasEventos
}

function filterSearch(array, inputValue) {
  return array.filter((evento) =>
    evento.name.toLowerCase().includes(inputValue.toLowerCase())
  )
}

function filtercheck(array, categorias) {
  return array.filter(
    (evento) => categorias.includes(evento.category) || categorias.length == 0
  )
}

function filterCheckSearch() {
  let checked = Array.from(
    document.querySelectorAll(`input[type="checkbox"]:checked`)
  ).map((elemento) => elemento.value)
  let filtrosearch = filterSearch(eventosFiltrados, inputSearch.value)  
  let filtrocheck = filtercheck(filtrosearch, checked)
  imprimirCards(filtrocheck, contenedor)
}
filterCheckSearch()