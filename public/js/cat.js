const serverUrl = 'http://localhost:8080/';
const itemsPath = 'items/';
const imagesPath = 'images/';



function solicitudJuegos(){
    axios.get('http://localhost:8080/games')
    .then((response)=>{
        
        mostrarJuegos(response.data);

    })

}

solicitudJuegos();

function mostrarJuegos(data){
    let listadojuegos = document.querySelector('#listadojuegos');

    // lista_productos
   data.forEach((item)=>{
   console.log(`${serverUrl}${imagesPath}${item.imgJuego}`);
    listadojuegos.innerHTML+=`
    <div class="col-12 col-lg-6 juegoconteiner" id="juego${item.idJuego}">
        <div class="item shadow mb-4" >
            <h3 class="item-title">${item.nombreJuego}</h3>
            <div class="imgdesc">
            <img class="item-image rounded img-fluid" src=${imagesPath}${item.imgJuego}>
            <p>${item.descJuego}</p>
            </div>
            <div class="item-details">
            
            <div class="precioCadaProd col-6">
            
            <span><h4 class="item-type"><u>Tipo</u>:</h4><h4>${item.tipoJuego}  </h4></span>
            <span><h4 class="item-price"><u>Precio</u>:</h4><h4>${item.costoJuego}  $</h4></span>
                </div>
            
                <div>
                <button class="item-button btn btn-success" data-toggle="modal" data-target="#modalCompra" onclick="iniciarCompra(event)" type="button" >COMPRAR!</button>
                </div>
            </div>
        </div>
    </div>`
   })
}
