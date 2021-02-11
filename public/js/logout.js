
const $logOut = document.querySelector('#log-out-btn');

$logOut.onclick = function(){
   axios.get('http://localhost:8080/logout')
   .then((response)=>{
       console.log(response);
       if(response.status === 200){
           window.location = "loginRegistro.html"
       }
   })
}