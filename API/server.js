const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path'); // No se si se usa :'(
const hbs = require('hbs'); // No se usa; ver branch hbs
const cors = require('cors');
const juegosRouter = require('./routes/games');
const imgRoutes = require('./routes/img');
const {options} = require('./config/bdConfig')
// //Passport y sessions
const {passport,MySQLStore, session} = require('./config/passportConfig');
const { setupMaster } = require('cluster');

//Creamos la sqlstore 
const sessionStore = new MySQLStore(options);


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
//Middlewares de passport
app.use(passport.initialize());
app.use(passport.session());
//Manuales: para proteccion de rutas 
function isLogedIn(req,res,next){
    if(req.isAuthenticated()){
        console.log("El usuario está debidamente logueado y por ende, puede acceder a index/landing");
        return next();
    }else{
        console.log("El user está intenando acceder al index/landing sin permisos y por eso lo vamos a redirigir");
        res.redirect('loginRegistro.html');
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
app.get('/', isLogedIn,(req,res) => {
    res.redirect("landing.html")
})
app.get('/landing', isLogedIn,(req,res) => {
    res.redirect("landing.html")
})
app.get('/contacto',isLogedIn, (req,res)=> {
    res.redirect("contacto.html");
})
app.get('/catalogo', isLogedIn,(req,res)=> {
    res.redirect("catalogo.html")
})
//No funciona
app.get('/landing.html', isNotLogedIn,(req,res) => {
    res.redirect("landing.html")
})
//No funciona
app.get('/contacto.html',isLogedIn, (req,res)=> {
    res.redirect("contacto.html");
})
//No funciona
app.get('/catalogo.html',isLogedIn, (req,res)=> {
    res.redirect("contacto.html");
})

app.get('/login', isNotLogedIn, (req,res)=> {
    res.redirect('login.html');
})

app.get('/admin', (req,res) => {
   // res.send(__dirname);
   res.redirect('adminView.html');
})

app.get('/registro', (req,res)=> {
    res.send("Hubo algun problema en el registro");
})

//Ruta del formulario de registro
app.post('/registro', passport.authenticate('local.registro', {
    successRedirect:"/registro",
    failureRedirect: "/",
    })
);

app.get('/descargar',function(req,res){
    res.download(__dirname+'/installers/setup.txt');
});


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
app.get('/logout', (req,res)=>{
    req.logout();
    res.redirect('loginRegistro.html')
})

app.listen(port, ()=> console.log("Escuchando en puerto " + port));