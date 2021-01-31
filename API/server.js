const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const hbs = require('hbs');

app.use(express.static(__dirname+'/public/'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname+"/views/partials")


app.get('/', (req,res) => {
    res.render("home",{
        anio: new Date().getFullYear(),
        titulo: "Ugames",
        catalogo: `${__dirname}/views/catalogo`,
        plantilla: ""
    })
})
app.get('/catalogo', (req,res) => {
    res.render("catalogo")
})
app.get('/plantilla', (req,res) => {
    res.render("plantilla")
})

app.listen(port, ()=> console.log("Escuchando en puerto " + port));