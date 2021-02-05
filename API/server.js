const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const hbs = require('hbs');
const session = require('express-session');
const mysql = require('mysql');
const MySQLStore = require('express-mysql-session')(session);

app.use(session({
    secret: "triplete de messi al real",
    resave: true,
    saveUninitialized: true
}))

app.use(express.static(__dirname+'/public/'));

app.get('/', (req,res) => {
    res.render("/")
})

app.listen(port, ()=> console.log("Escuchando en puerto " + port));