const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const hbs = require('hbs');
const session = require('express-session');
const mysql = require('mysql');
const MySQLStore = require('express-mysql-session')(session);
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

//Creamos la sqlstore 
const sessionStore = new MySQLStore(options);
//Cookie
app.use(session({
    secret: "triplete de messi al real",
    resave: true,
    saveUninitialized: true,
    store: sessionStore
}))

app.use(express.static(__dirname+'/public/'));

app.get('/', (req,res) => {
    res.render("/")
})

app.listen(port, ()=> console.log("Escuchando en puerto " + port));