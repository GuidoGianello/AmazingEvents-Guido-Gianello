let eventosFiltrados = []
function filtraFechas(fecha, arrayEventos) {
    for(let i = 0; i < arrayEventos.length; i++) {
        const evento = arrayEventos[i]
        if(evento.date >= fecha) {
            eventosFiltrados.push(evento)
        }
    }
}

filtraFechas(data.currentDate, data.events)
console.log(eventosFiltrados)
console.log(data)

function generaCard(evento) {
    return `<div class="col-12 col-md-6 col-xl-3 d-flex justify-content-center pt-2 pb-2">
    <div class="card" style="width: 18rem; height: 24rem;">
      <img src="${evento.image}" class="card-img-top img-card" alt="platos-comida">
      <div class="card-body">
        <h5 class="card-title text-center">${evento.name}</h5>
        <p class="card-text text-center">${evento.description}</p>
        <div class="d-flex justify-content-between">
          <p class="card-text">Price: ${evento.price}$</p>
          <a href="../pages/details.html" class="btn btn-primary">Details</a>
        </div>
      </div>
    </div>
  </div>`
}

let template = ""
function creaTemplate(arrayFiltrado) {
    for(let evento of arrayFiltrado) {
        template += generaCard(evento)
    } return template
}



let templateFinal = creaTemplate(eventosFiltrados)

const contenedor = document.getElementById("contenedor-card")

 function pusheaCard(formatoCard, contenedor) {
     contenedor.innerHTML = formatoCard
 }
 pusheaCard(templateFinal, contenedor)

 console.log(eventosFiltrados)
 console.log(creaTemplate(eventosFiltrados))