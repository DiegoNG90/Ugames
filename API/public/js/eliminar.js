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
        listadojuegos.innerHTML+= `<li><span>${item.idJuego}</span> ||<span>${item.nombreJuego}</span> || <span>${item.costoJuego}</span><button onclick="eliminarProducto(event)">Eliminar</button></li>`;
       })
    
}