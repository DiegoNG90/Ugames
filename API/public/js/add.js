
let formulario_product = document.querySelector('#formulario-add');

function enviarDatos(e){
    e.preventDefault();
    let nombJ = document.querySelector('#nombJ').value;
    let descJ = document.querySelector('#descJ').value;
    let tipoJ = document.querySelector('#tipoJ').value;
    let costoJ = document.querySelector('#costoJ').value;
    let imgJ = document.querySelector('#imgJ').value;

    console.log(nombJ,descJ,tipoJ,costoJ,imgJ)
    
    axios.post('http://localhost:8080/games/juegos',{
        nombJ: nombJ,
        descJ: descJ,
        tipoJ: tipoJ,
        costoJ:costoJ,
        imgJ: imgJ
    })
    alert('datos enviados');
    location.reload();
}

formulario_product.addEventListener('submit',enviarDatos);



