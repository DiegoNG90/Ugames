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
        <td><input type="number" name="costoActualJ" id="costoActualJ${item.idJuego}"  value="${item.costoJuego}">&nbsp;$</td> 
        <td><button onclick="eliminarProducto(event)" type="button" class="btn btn-danger">Eliminar</button></td>   
        <td><button onclick="modificarJuego(event)" type="button" class="btn btn-info">Modificar costo</button></td> 
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



function modificarJuego(e){
    e.preventDefault();
    let idJuegoAEditar = parseInt(e.path[2].childNodes[1].innerText);
    let precio = document.querySelector(`#costoActualJ${idJuegoAEditar}`).value;
    console.log(precio);
    console.log(idJuegoAEditar);
   axios.put(`http://localhost:8080/games/juegos/${idJuegoAEditar}-${precio}`,{
        idJuegoAEditar: idJuegoAEditar,
        precio: precio
    })
    alert('datos enviados');
    location.reload();
}
