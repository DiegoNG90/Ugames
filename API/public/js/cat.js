const serverUrl = 'http://localhost:3000/';
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

    listadojuegos.innerHTML+=`
    <div class="col-6 col-md-6">
        <div class="item shadow mb-4" data-id=${item.idJuego}>
            <h3 class="item-title">${item.nombreJuego}</h3>
            <img class="item-image" src=${serverUrl}${imagesPath}${item.imgJuego}>

            <div class="item-details">
                <h4 class="item-price">${item.costoJuego}$</h4>
                <button class="item-button btn btn-primary addToCart">AÑADIR AL CARRITO</button>
            </div>
        </div>
    </div>`
   })
}
