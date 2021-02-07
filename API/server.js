const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const hbs = require('hbs');
const cors = require('cors');
const juegosRouter = require('./routes/games');
const imgRoutes = require('./routes/img');

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