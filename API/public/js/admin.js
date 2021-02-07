function solicitudJuegos(){
    axios.get('http://localhost:8080/games')
    .then((response)=>{
        
        mostrarJuegosAdm(response.data);
    })

}

solicitudJuegos();

function mostrarJuegosAdm(data){

        let listadojuegos = document.querySelector('#listajuegos');
    //console.log(item);
       data.forEach((item)=>{
        listadojuegos.innerHTML+= 
        `    <tr>
        <th scope="row">${item.idJuego}</th>
        <td>${item.nombreJuego}</td>
        <td>${item.costoJuego}$</td> 
        <td><button onclick="eliminarProducto(event)" type="button" class="btn btn-danger">Eliminar</button></td> 
        </tr>`;
       })
}

function eliminarProducto(e){
    let juegoEliminado = parseInt(e.path[2].childNodes[1].innerText);
    console.log(juegoEliminado);
        axios.delete(`http://localhost:8080/games/juegos/${juegoEliminado}`)
        .then(()=>{
            alert('Juego eliminado!');
            location.reload();
        })
    }