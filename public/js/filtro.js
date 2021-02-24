/*console.log("Filtro conectado exitosamente");

const iconoFiltro = document.querySelector(".fa-filter");

function nodeListToArray(nodelist){
    const arr = [];
    nodelist.forEach(element=> {
        arr.push(element);
    })
    return arr;
}

iconoFiltro.addEventListener("click", () => {
    const seleccion = document.querySelector(`#filtro-genero`).value;
    if (seleccion === "Seleccione un genero") {
        const titulo = document.querySelector("#t-catalogo");
        if (titulo.children.length === 0) {
            let advertencia = document.createElement("div");
            advertencia.innerHTML =  `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong> Elegí una categoría adecuada para usar el filtro</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`;
        titulo.appendChild(advertencia);
        setTimeout(()=>{titulo.removeChild(advertencia)},2500)
        }
    }else{
        //guardo todos los datos de las filas en una nodelist
        const nodoDataFila = document.querySelectorAll("td");
        //convierto la nodelist a array
        const dataArr = nodeListToArray(nodoDataFila);
        //seleccion ya definida
        for (let i = 0; i < dataArr.length; i++) {
            if((dataArr[i].innerHTML === seleccion)){
                let count = 1;
                console.log("Hubo " + count + " matches");
                count++;
            }else{
                console.log("No hubo coincidencias");
            }
        }
    





        // //capturo todos los tr
        // const filasTabla = document.querySelectorAll('tr');
        // // console.log(filasTabla);
        // filasTabla.forEach(element=> {
        // let hijos = element.children;
        // // console.log(hijos);
        // for (const child of hijos) {
        //     if (child.className === "genero") {
        //     // console.log(child.innerHTML);
        //         if(child.innerHTML === seleccion){
        //             // console.log(dataFila);
        //             // console.log(child);
        //         }else{
        //                 console.log("No hubo match");
        //             }
        //         }
        //     }
        // });
    }

    // const selectOptions =document.querySelectorAll("option");
    // optionValues = [];
    // selectOptions.forEach(element => {
    //     optionValues.push(element.value);
    // })
    // optionValues.shift();
    // console.log(optionValues);

    

})
//
// const listaDeGeneros = document.querySelectorAll(".genero");
// const generos = [];

// function enArray(array, element) {
//     return (array.indexOf(element) !== -1);
// }
// listaDeGeneros.forEach(element=> {
//     if (enArray(generos, element)) {
//         console.log("Elemento repetido");
//     }
//     generos.push(element.innerText)
// })
// console.log(generos);*/

const iconoFiltro = document.querySelector(".fa-filter");

function filtrarJuegos(e) {
    e.preventDefault();
    
    // Cantidad de juegos  
    let cantidadJuegos=e.path[3].children[2].childElementCount;
    let i=0;
    //Codigo que reestablece la vista de los juegos (por si el usuario filtra 2 veces)
    while(i<cantidadJuegos){
            var juegoAOcultar=document.querySelector(`#juego${i+1}`);
            //console.log(juegoAOcultar);
            juegoAOcultar.classList.remove("oculto");
        
        i++;
    }

    //Valor que tomamos
    const seleccion = document.querySelector(`#filtro-genero`).value;

    if (seleccion==="Seleccione un genero"){
        alert("Favor de elegir un tipo de juego a filtrar!");
    }else{



    // Valor a comparar                      *
    //let j = e.path[3].children[2].children[3].children[0].children[2].children[0].children[0].children[1].innerText;


    i=0;
    
    while(i<cantidadJuegos){
        //var PRUEBA = (e.path[3].children[2].children[i].children[0].children[2].children[0].children[0].children[1].innerText);
        //console.log(PRUEBA);

        if ((e.path[3].children[2].children[i].children[0].children[2].children[0].children[0].children[1].innerText)===seleccion){
            //console.log("Verdadero");
        }else{
           
           
            //console.log("False");
            var juegoAOcultar=document.querySelector(`#juego${i+1}`);
            juegoAOcultar.classList.add("oculto")
        }


        i++;
    }
    }
    }

