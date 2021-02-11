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
   //console.log(`${serverUrl}${imagesPath}${item.imgJuego}`);
    console.log(item)
    listadojuegos.innerHTML+=`
    <div class="col-12 col-md-6 juegoconteiner">
        <div class="item shadow mb-4" data-id=${item.idJuego}>
            <h3 class="item-title">${item.nombreJuego}</h3>
            <div class="imgdesc">
            <img class="item-image rounded img-fluid" src=${imagesPath}${item.imgJuego}>
            <p>${item.descJuego}</p>
            </div>
            <div class="item-details">
                <h4 class="item-price"><u>Precio</u>:&nbsp; &nbsp;${item.costoJuego}  $</h4>
                <button class="item-button btn btn-success addToCart">AÑADIR AL CARRITO</button>
            </div>
        </div>
    </div>`
   })
}
