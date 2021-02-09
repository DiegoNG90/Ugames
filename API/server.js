const express = require('express');
const app = express();
const port = 8080;
const path = require('path'); // No se si se usa :'(
const hbs = require('hbs'); // No se usa; ver branch hbs
const cors = require('cors');
const juegosRouter = require('./routes/games');
const imgRoutes = require('./routes/img');
const {options, conexion_bd} = require('./config/bdConfig')
//Passport y sessions
const session = require('express-session'); 
const mysql = require('mysql'); // CHEQUEAR SI ES NECESARIO QUE ESTÉ ACÁ!
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { urlencoded } = require('express'); //No sé si es necesario tampoco.

//Creamos la sqlstore 
const sessionStore = new MySQLStore(options);

//Controlador de login
passport.use('local.login', new LocalStrategy({
    usernameField:'username',
    passwordField:'password',
    passReqToCallback: true
}, (req,username,password,done)=>{
    conexion_bd.query('SELECT * from users WHERE username=?', [username], (err,results)=> {
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
    conexion_bd.query('SELECT * from users WHERE username = ?',newUser.username,(err,results)=>{

    })
    conexion_bd.query('INSERT INTO users SET ?', newUser,(err, results) => {
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
    conexion_bd.query('SELECT * FROM users WHERE id=?',[id], (err,results)=>{
        done(err,results[0])
    })
});

//Middlewares
app.use(cors());
//Cookie
app.use(session({
    secret: "triplete de messi al real",
    resave: true,
    saveUninitialized: true,
    store: sessionStore
}))
app.use(express.static(__dirname+'/public'));
app.use(express.json()); // permite que mi app acepte json del lado del cliente
app.use(express.urlencoded({extended:true})); // permite interprete los datos que vienen del cliente
//Configuramos los middlewares de passport-initialize y passport-session
app.use(passport.initialize());
app.use(passport.session());
//Proteccion de rutas MIDDLEWARES
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

//Routers
app.use('/games',juegosRouter);
app.use('/images', imgRoutes);

//Rutas
app.get('/', (req,res) => {
    res.render("/")
})

app.get('/admin', (req,res) => {
   // res.send(__dirname);
   res.redirect('adminView.html');
})

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
//Ruta del logout
app.get('/logout', isLogedIn, (req,res)=>{
    req.logOut();
    res.redirect('index.html')
})

app.listen(port, ()=> console.log("Escuchando en puerto " + port));