
function registrarse(e){
    e.preventDefault();
    let username = document.querySelector('#userReg').value;
    let password = document.querySelector('#passwordReg').value;
    //Faltarían validaciones desde el Front
    function solicitudUsers(){
        let cantidadRepeticiones = 0;
        axios.get('http://localhost:8080/users')
        .then( (response)=>{
            console.log( response.data);
            let dataArr = response.data;
            dataArr.forEach(element => {
                if(element.username === username){
                    cantidadRepeticiones++;
                }else{
                    
                }

            });
        })
        return cantidadRepeticiones;
    }
    const cantidadRepeticiones =  solicitudUsers(); // Me da undefined
    
    if(cantidadRepeticiones>0){
        axios.post('http://localhost:8080/registro',{
            username: username,
            password: password,
        })
        .then((response)=>{
            console.log(response);
            window.location = 'landing.html';
        })
        .catch((err)=> {
            throw (err)
        })

    }else{
        let $errorMsg = document.querySelector('#msg-error-registro');
        $errorMsg.style.color = "red";
        $errorMsg.innerHTML = "El usuario ya existe, por favor, ingrese otro username."
        // if($errorMsg.innerText.length > 0){
        //     $
        // }else{

        // }
    }


}
document.querySelector('#reg-btn').addEventListener('click',registrarse);

function logIn(e){
    e.preventDefault();
    let username = document.querySelector('#user').value;
    let password = document.querySelector('#contraseña').value;
    axios.post('http://localhost:8080/login',{
        username: username,
        password: password
    })
    .then((response)=>{
        console.log(response)
        if(response.data === "Te has logueado"){
            console.log(response.data);
            console.log("Respuesta 200, el back te redirigió a landing.html")
            window.location = 'landing.html';

        }
    })
    .catch((error)=>{
        console.log(error)
    })
    // window.location = 'contenido.html'
}
document.querySelector('#login-btn').addEventListener('click',logIn);

