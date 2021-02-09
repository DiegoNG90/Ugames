const {options, conexion_bd} = require('./bdConfig')
//Passport y sessions
const session = require('express-session'); 
const mysql = require('mysql'); // CHEQUEAR SI ES NECESARIO QUE ESTÉ ACÁ!
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;



//Controlador y estrategia de login
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

//Controller y estrategia de registro 
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
    // conexion_bd.query('SELECT * from users WHERE username = ?',newUser.username,(err,results)=>{

    // })
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

module.exports = {
    passport,
    MySQLStore,
    session
};