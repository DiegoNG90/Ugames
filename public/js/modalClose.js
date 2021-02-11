

const $modalClose = document.querySelector('.close');
$modalClose.onclick = function(){
    let $errorRegistro = document.querySelector('#msg-error-registro');
    let $errorLogin = document.querySelector('#msg-error-login');
    //Login
    let $inputLoginName = document.querySelector('#user');
    let $inputLoginPass = document.querySelector('#contraseña');
    //Registro
    let $inputRegName = document.querySelector('#userReg');
    let $inputRegPass = document.querySelector('#passwordReg');

    $errorLogin.textContent = ""; 
    $errorRegistro.textContent = ""; 

    $inputLoginName.value = "";
    $inputLoginPass.value = "";
    $inputRegName.value = "";
    $inputRegPass.value = "";
}