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

//Controlador de login
passport.use('local.login', new LocalStrategy({
    usernameField:'username',
    passwordField:'password',
    passReqToCallback: true
}, (req,username,password,done)=>{
    dbConnection.query('SELECT * from users WHERE username=?', [username], (err,results)=> {
        if(err)throw err;
        if(results.length > 0){
            if(results[0].password === password){
                return done(null, results[0]);
            }else{
                return done(null,false, {message: "Usuario o contraseña incorrecta"});
            }
        }else{
            done(null, false, {message: "Usuario o contraseña no existe"});
        }
    })
}))

//Controller de registro
passport.use('local.registro', new LocalStrategy({
    //Configuramos el user. Lo que pasemos acá de parámetro irá en el callback, así que deben ser iguales.
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true 
}, (req, username, password, done) => {
    // console.log(req.body);
    // console.log(username);
    // console.log(password);
    const newUser = {
        username,
        password
    }
    dbConnection.query('SELECT * from users WHERE username = ?',newUser.username,(err,results)=>{

    })
    dbConnection.query('INSERT INTO users SET ?', newUser,(err, results) => {
        if(err) throw err;
        console.log(results);
        username.id = results.insertId;
        return done(null, username.id)
    }) 
}));

//serializacion del user
passport.serializeUser((user, done)=> {
    done(null, user.id)
});
//deserializacion del user
passport.deserializeUser((id,done)=>{
    dbConnection.query('SELECT * FROM users WHERE id=?',[id], (err,results)=>{
        done(err,results[0])
    })
});

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

function isLogedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('index.html');
    }
}
function isNotLogedIn(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }else{
        next();
    }
}


//Ruta del formulario de registro
app.post('/registro',isLogedIn, passport.authenticate('local.registro', {
        successRedirect:"/registro",
        failureRedirect: "/",
    })
);
//Ruta del form de login
app.post('/login', (req,res,next)=>{
    passport.authenticate('local.login', (err,user,info)=>{
        if(err) {return next(err)};
        if(!user){ return res.send(info)} //o Redireccionar res.redirect(/index)
        req.logIn(user, (err)=>{
            if(err){return next(err)};
            return res.send("Te has logueado");
            
        })

    }) (req,res,next)
})
//Rutas 
app.get('/login', (req,res)=> {
    res.redirect('index.html');
})


app.get('/registro', (req,res)=> {
    res.send("Hubo algun problema en el registro");
})
//Ruta del logout
app.get('/logout', isLogedIn, (req,res)=>{
    req.logOut();
    res.redirect('index.html')
})
// app.get('/landing', isLogedIn, (req,res)=>{
//     res.redirect('landing.html');
// })

// dbConnection.query('SELECT * from users', (err, results)=>{
//     if(err)throw err;
//     console.log(results);
// })


app.listen(port, ()=> console.log("Escuchando en puerto " + port));