const mysql = require('mysql');

//Configuracion de la BDD bd_games
const options = {
    host: "localhost",
    port: 3306,
    user: "root",
    password:"",
    database: "bd_ugames"
}
//generamos la conexion a msql con la configuracion de options
const dbConnection = mysql.createConnection(options);
//Ejecutamos la conexion a la BDD bd_games
dbConnection.connect((err)=>{
    if(err) throw err;
    console.log("Conexion exitosa a la BDD");
})


module.exports = {
    options,
    dbConnection
}