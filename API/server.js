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


app.use(cors());
app.use(express.json()); // permite que mi app acepte json del lado del cliente
app.use(express.urlencoded({extended:true})); // permite interprete los datos que vienen del cliente


app.use(express.static(__dirname+'/public'));

app.use('/games',juegosRouter);
app.use('/images', imgRoutes);

app.get('/', (req,res) => {
    res.render("/")
})

app.get('/admin', (req,res) => {
   // res.send(__dirname);
   res.redirect('adminView.html');
})

app.listen(port, ()=> console.log("Escuchando en puerto " + port));