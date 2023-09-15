import { creaDetalle } from "../modules/functions.js"
const URL_API = `https://mindhub-xj03.onrender.com/api/amazing`
let contenedorCardDetail = document.getElementById("card-details")
let parametro = location.search
let params = new URLSearchParams(parametro)
let idEvento = params.get("parametro")
console.log(parametro)
let eventoDet

fetch(URL_API)
  .then((response) => response.json())
  .then(({ events }) => {
    eventoDet = events
    let evento = eventoDet.find((evento) => evento._id == idEvento)
    creaDetalle(evento, contenedorCardDetail)
  })
  .catch((err) => console.log(err))




    