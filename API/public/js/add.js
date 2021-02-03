
let formulario_product = document.querySelector('#formulario-add');

function enviarDatos(e){
    e.preventDefault();
    let nombJ = document.querySelector('#nombJ').value;
    let descJ = document.querySelector('#descJ').value;
    let tipoJ = document.querySelector('#tipoJ').value;
    let costoJ = document.querySelector('#costoJ').value;
    let imgJ = document.querySelector('#imgJ').value;

    
    axios.post('http://localhost:8080/gestorproductos/productos',{
        nombJ: nombJ,
        descJ:descJ,
        tipoJ: tipoJ,
        costoJ:costoJ,
        imgJ:imgJ
    })
    alert('datos enviados');
    window.location = 'lista-productos.html';
}

formulario-add.addEventListener('submit',enviarDatos);