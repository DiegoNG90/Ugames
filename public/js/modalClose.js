

const $modalClose = document.querySelector('.close');
$modalClose.onclick = function(){
    let $errorRegistro = document.querySelector('#msg-error-registro');
    let $errorLogin = document.querySelector('#msg-error-login');
    let $errorAdmin = document.querySelector('#msg-error-admin');
    //Login
    let $inputLoginName = document.querySelector('#user');
    let $inputLoginPass = document.querySelector('#contraseña');
    //Registro
    let $inputRegName = document.querySelector('#userReg');
    let $inputRegPass = document.querySelector('#passwordReg');
    //Admin
    let $adminName = document.querySelector('#userAdm')
    let $adminPass = document.querySelector('#contraseñaAdm')

    $errorLogin.textContent = ""; 
    $errorRegistro.textContent = ""; 
    $errorAdmin.textContent = "";

    $inputLoginName.value = "";
    $inputLoginPass.value = "";
    $inputRegName.value = "";
    $inputRegPass.value = "";
    $adminName.value = "";
    $adminPass.value = "";
}