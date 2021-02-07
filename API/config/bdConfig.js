const mysql =require('mysql');

const conexion_bd = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'bd_ugames'
});

conexion_bd.connect((err)=>{
    if (err){
        console.log(err);
    }else{
        console.log('Conexión exitosa con BD')
    }
});

module.exports=conexion_bd;