const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const hbs = require('hbs');

app.use(express.static(__dirname+'/public/'));

app.get('/', (req,res) => {
    res.render("/")
})

app.listen(port, ()=> console.log("Escuchando en puerto " + port));