function iniciarCompra(e){
    e.preventDefault();
    // TIPO JUEGO console.log(e.path[2].children[0].children[0].children[1].innerText)


    let costoJuego = document.querySelector("#costoJuego");
    costoJuego.textContent=e.path[2].children[0].children[1].children[1].innerText;

    let tituloJuego = document.querySelector("#tituloJuego");
    tituloJuego.textContent = e.path[3].children[0].innerText;

    
}




function continuarCompra(e){
    e.preventDefault();
    let debito = document.querySelector("#debito").checked;
    let credito = document.querySelector("#credito").checked;
    let acuerdoReglas = document.querySelector("#acuerdo").checked;

    //console.log(debito); 
    //console.log(credito); 
    //console.log(acuerdoReglas); 

    if (debito===false && credito===false){
        alert("Elija un medio de pago!")
    }else if(acuerdoReglas===false){
        alert("Para continuar, debe estar de acuerdo con el reglamento de compra y usos")
    }else{

        //Ocultamos info del Modal
        let ppCompra =document.querySelector("#primerPasoCompra");
        ppCompra.classList.add("oculto");
        let pfCompra =document.querySelector("#primerFooter");
        pfCompra.classList.add("oculto");

        //Mostramos segundo Modal
        let spCompra=document.querySelector("#segundoPasoCompra");
        spCompra.classList.remove("oculto");
        let sfCompra=document.querySelector("#segundoFooter");
        sfCompra.classList.remove("oculto");
    }
}
