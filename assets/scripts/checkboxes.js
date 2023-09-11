function filtroCategorias(listaEventos) {
    let categorias = listaEventos.map((evento) => evento.category)
    const categoriasEventos = [...new Set(categorias)]
    return categoriasEventos
  }
  const categoriasEventos = filtroCategorias(data.events)
   console.log(categoriasEventos)

   function creaCheck(categoria) {
     return `<div class="form-check form-check-inline">
     <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value=${categoria}>
     <label class="form-check-label" for="inlineCheckbox1">${categoria}</label>
   </div>`
       
   }
    console.log(creaCheck(data.events))

   function conjuntoCheck(listaEventos) {
     return listaEventos.map((categoria) => creaCheck(categoria)).join(``)
   }

   const todosCheck = conjuntoCheck(categoriasEventos)
    
    const contenedorCheck = document.getElementById("section-categorias")
   
   
    function imprimeCheck(template, ubicacion) {
     ubicacion.innerHTML = template
   }
   imprimeCheck(todosCheck, contenedorCheck)