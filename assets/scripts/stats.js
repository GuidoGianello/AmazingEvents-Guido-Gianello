import {
    porcentajeAsist,
eventoMayorPorcentaje,
eventoMenorPorcentaje,
eventoMayorCapacidad,
creadorDePrimerTabla,
arrayObjPorCategoria,
creadorDeSegundaYTercerTabla,
filtraEventosUp,
filtraEventosPast,
filtroCategorias
  } from "../modules/functions.js"
const URL_API = `https://mindhub-xj03.onrender.com/api/amazing`

let eventos
fetch(URL_API)
  .then((response) => response.json())
  .then(({ events, currentDate }) => {
    currentDate = currentDate
    eventos = events
    let porcentajes = porcentajeAsist(eventos, currentDate)
    let eventoConMayorPorcentaje = eventoMayorPorcentaje(porcentajes)
    let eventoConMenorPorcentaje = eventoMenorPorcentaje(porcentajes)
    let eventoConMayorCapacidad = eventoMayorCapacidad(eventos)
    let eventosUp = filtraEventosUp(currentDate, eventos)
    let eventosPast = filtraEventosPast(currentDate, eventos)
    let listaCategoriasUp = filtroCategorias(eventosUp)
    let listaCategoriasPast = filtroCategorias(eventosPast)
    let arrayObjUp = arrayObjPorCategoria(eventosUp, listaCategoriasUp)
    let arrayObjPast = arrayObjPorCategoria(eventosPast, listaCategoriasPast)
    creadorDePrimerTabla(
      "eventsStatic",
      eventoConMayorPorcentaje,
      eventoConMenorPorcentaje,
      eventoConMayorCapacidad
    )
    creadorDeSegundaYTercerTabla(arrayObjUp, "upcominEvent")
    creadorDeSegundaYTercerTabla(arrayObjPast, "pastEvent")
  })
  .catch((err) => console.log(err))