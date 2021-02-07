const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const hbs = require('hbs');
const session = require('express-session');
const mysql = require('mysql');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { urlencoded } = require('express');
 

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

passport.use('local.registro', new LocalStrategy({
    //Configuramos el user. Lo que pasemos acá de parámetro irá en el callback, así que deben ser iguales.
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, (req, username, password, done) => {
    console.log(req.body );

}));

/* MIDDLEWARES! */
//Cookie
app.use(session({
    secret: "triplete de messi al real",
    resave: true,
    saveUninitialized: true,
    store: sessionStore
}))
//Public con html
app.use(express.static(__dirname+'/public/'));
//Configuramos los middlewares de passport-initialize y passport-session
app.use(express.json());
app.use(express.urlencoded({extended: true});
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req,res) => {
    res.render("/")
})

app.listen(port, ()=> console.log("Escuchando en puerto " + port));