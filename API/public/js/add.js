
let formulario_product = document.querySelector('#formulario-add');

function enviarDatos(e){
    e.preventDefault();
    alert("ENVIADO");
    let nombJ = document.querySelector('#nombJ').value;
    let descJ = document.querySelector('#descJ').value;
    let tipoJ = document.querySelector('#tipoJ').value;
    let costoJ = document.querySelector('#costoJ').value;
    let imgJ = document.querySelector('#imgJ').value;

    console.log(nombJ,descJ,tipoJ,costoJ,imgJ)
    
    axios.post('http://localhost:8080/games/add',{
        nombJ: nombJ,
        descJ: descJ,
        tipoJ: tipoJ,
        costoJ:costoJ,
        imgJ: imgJ
    })
    alert('datos enviados');
}

formulario_product.addEventListener('submit',enviarDatos);