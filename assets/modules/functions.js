export function creaCard(evento) {
  let href = window.location.href
let ruta = href.includes("index.html")?`./assets/pages/details.html?parametro=${evento._id}`:`./details.html?parametro=${evento._id}`
    return `<div class="col-12 col-md-6 col-xl-3 d-flex justify-content-center pt-2 pb-2">
    <div class="card" style="width: 18rem; height: 24rem;">
      <img src="${evento.image}" class="card-img-top img-card" alt="platos-comida">
      <div class="card-body">
        <h5 class="card-title text-center">${evento.name}</h5>
        <p class="card-text text-center">${evento.description}</p>
        <div class="d-flex justify-content-between">
          <p class="card-text">Price: ${evento.price}$</p>
          <a href="${ruta}" class="btn btn-primary">Details</a>
        </div>
      </div>
    </div>
  </div>`
  }

  export function creaCheck(categoria) {
    return `<label for="${categoria}">${categoria}</label>
      <input type="checkbox" id="${categoria}" value="${categoria}">
      `
  }

  export function conjuntoCheck(listaEventos) {
    let todosCheck = listaEventos
      .map((categoria) => creaCheck(categoria))
      .join(` `)
    return todosCheck
  }

  export function imprimirCards(array, contenedor) {
    let template = ""
    if (array == 0) {
      template = "No results found"
    }
    template = array.map((info) => creaCard(info)).join(` `)
    contenedor.innerHTML = template
  }

  export function imprimeCheck(template, contenedor) {
    contenedor.innerHTML = template
  }

  export function filtroCategorias(listaEventos) {
    let categorias = listaEventos.map((evento) => evento.category)
    let categoriasEventos = [...new Set(categorias)]
    return categoriasEventos
  }

  export function filterSearch(array, inputValue) {
    return array.filter((evento) =>
      evento.name.toLowerCase().includes(inputValue.toLowerCase())
    )
  }

  export function filtercheck(array, categorias) {
    return array.filter(
      (evento) => categorias.includes(evento.category) || categorias.length == 0
    )
  }

  export function filterCheckSearch(events, inputSearch, contenedor) {
  let checked = Array.from(
    document.querySelectorAll(`input[type="checkbox"]:checked`)
  ).map((elemento) => elemento.value)
  let filtrosearch = filterSearch(events, inputSearch.value)
  let filtrochecks = filtercheck(filtrosearch, checked)
  imprimirCards(filtrochecks, contenedor)
}


  export function filtraEventosUp(fechaReferencia, listaEventos) {
    let eventosFiltrados = listaEventos.filter(
      (evento) => evento.date >= fechaReferencia
    )
    return eventosFiltrados
  }

  export function filtraEventosPast(fechaReferencia, listaEventos) {
    let eventosFiltrados = listaEventos.filter(
      (evento) => evento.date <= fechaReferencia
    )
    return eventosFiltrados
  }

  export function creaDetalle(evento, contenedor) {
    contenedor.innerHTML += `
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

export function porcentajeAsist(listaEventos, currentDate) {
  let pastEvents = listaEventos.filter((evento) => evento.date < currentDate)
  let porcentajes = pastEvents.map((evento) => {
    let porcentaje = (evento.assistance * 100) / evento.capacity
    let objEvento = {
      name: evento.name,
      porcentaje: porcentaje.toFixed(2),
    };

    return objEvento
  });

  return porcentajes
}

export function eventoMayorPorcentaje(porcentajes) {
  let eventosOrdenados = [...porcentajes].sort(
    (a, b) => b.porcentaje - a.porcentaje
  );
  return eventosOrdenados[0]
}

export function eventoMenorPorcentaje(porcentajes) {
  let eventosOrdenados = [...porcentajes].sort(
    (a, b) => a.porcentaje - b.porcentaje
  );
  return eventosOrdenados[0]
}

export function eventoMayorCapacidad(listaEventos) {
  let eventosOrdenados = [...listaEventos].sort(
    (a, b) => b.capacity - a.capacity
  );
  return eventosOrdenados[0]
}

export function creadorDePrimerTabla(
  id,
  eventoConMayorPorcentaje,
  eventoConMenorPorcentaje,
  eventoConMayorCapacidad
) {
  let contenedor = document.getElementById(id);
  let tablaHTML = `
    <tr>
    <td>Events whit highest % of asistance</td>
    <td>Events with lowest % of assistance</td>
    <td>Events with larger capacity</td>
</tr>
<tr >
    <td>${eventoConMayorPorcentaje.name}: ${eventoConMayorPorcentaje.porcentaje}%</td>
    <td>${eventoConMenorPorcentaje.name}: ${eventoConMenorPorcentaje.porcentaje}%</td>
    <td>${eventoConMayorCapacidad.name}: ${eventoConMayorCapacidad.capacity}</td>
</tr>        
        `;
  contenedor.innerHTML = tablaHTML
}

export function arrayObjPorCategoria(listaEventos, listaCategorias) {
  let listaObjCat = listaCategorias.map((categoria) => {
    let eventosCategoria = listaEventos.filter(
      (evento) => evento.category === categoria
    )
    let gananciaTotal = eventosCategoria.reduce(
      (total, evento) =>
        (total += evento.price * (evento.assistance || evento.estimate)),
      0
    )
    let porcentajeAsistencia =
      eventosCategoria.reduce((total, evento) => {
        return total + ((evento.assistance || evento.estimate) / evento.capacity) * 100;
      }, 0) / eventosCategoria.length;
    let objCategoria = {
      categoria: categoria,
      ganancia: gananciaTotal.toFixed(2),
      porcentajeAsistencia: porcentajeAsistencia.toFixed(2),
    }
    return objCategoria;
  })
  return listaObjCat;
}

export function creadorDeSegundaYTercerTabla(array, id) {
  let contenedor = document.getElementById(id)
  let tablaHTML = `
  <tr>
  <td>Categories</td>
  <td>Revenues</td>
  <td>Percentage of asistance</td>
</tr>`
  array.forEach((categoria) => {
    tablaHTML += `<tr>
                <td>${categoria.categoria}</td>
                <td>$${categoria.ganancia}</td>
                <td>${categoria.porcentajeAsistencia}%</td>
            </tr>         
        `
  })
  contenedor.innerHTML = tablaHTML
}