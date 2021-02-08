const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const hbs = require('hbs');
const {options, dbConnection} = require('./config/dbConfig') 
const cors = require('cors');
const session = require('express-session');
const mysql = require('mysql');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { urlencoded } = require('express');
 



//Creamos la sqlstore 
const sessionStore = new MySQLStore(options);
//Controller de registro
passport.use('local.registro', new LocalStrategy({
    //Configuramos el user. Lo que pasemos acá de parámetro irá en el callback, así que deben ser iguales.
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true 
}, (req, username, password, done) => {
    // console.log(req.body);
    // console.log(username);
    // console.log(password);
    const newUser = {
        username,
        password
    }
    dbConnection.query('INSERT INTO users SET ?', newUser,(err, results) => {
        if(err) throw err;
        console.log(results);
        username.id = results.insertId;
        return done(null, username.id)
    }) 
}));

// passport.serializeUser();
// passport.deserializeUser();

/* MIDDLEWARES! */
app.use(cors())
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
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/registro', (req,res)=> {
    res.send("Hubo algun problema en el registro");
})

//Ruta del formulario de registro
app.post('/registro', passport.authenticate('local.registro', {
        successRedirect:"/",
        failureRedirect: "/registro",
    })
    // res.send("Peticion de registro recibida");
);


app.listen(port, ()=> console.log("Escuchando en puerto " + port));