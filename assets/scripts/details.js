let parametro = location.search
let params = new URLSearchParams(parametro)
let idEvento = params.get("parametro")
let evento = data.events.find((evento) => evento._id === idEvento)
let contenedorCardDetail = document.getElementById("card-details")

function creaDetalle(evento) {
    contenedorCardDetail.innerHTML += `
  <div class="card mb-3" style="max-width: 721px;">
  <div class="row g-0">
    <div class="col-md-6">
      <img src="${evento.image}" class="img-fluid rounded-start img-details" alt="museo">
    </div>
    <div class="col-md-6">
      <div class="card-body">
        <h5 class="card-title">${evento.name}</h5>
        <p class="card-text">${evento.date}</p>
        <p class="card-text">${evento.description}</p>
        <p class="card-text">${evento.category}</p>
        <p class="card-text">${evento.place}</p>
        <p class="card-text">${evento.capacity}</p>
        <p class="card-text">${evento.assistance ? `Assistance: ${evento.assistance} people` : `Estimate: ${evento.estimate} people`}</p>
        <p class="card-text">Price: $${evento.price}</p>
      </div>
    </div>
  </div>
</div>
    `
}
creaDetalle(evento)

    