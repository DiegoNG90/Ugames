const conexion_bd=require('../config/bdConfig')



//Envia los juegos
const obtenerJuegos=(req,res)=>{
    conexion_bd.query('SELECT * FROM t_juegos',(err,results)=>{
        if (err) throw err;
      res.send(results);
    })
}


//Agrega un juego
const agregarJuego = (req,res)=>{
    let {nombJ,descJ,tipoJ,costoJ,imgJ} = req.body;
    // console.log(req.body)
    conexion_db.query('INSERT INTO `t_juegos`(`nombreJuego`, `descJuego`,`tipoJuego`,`costoJuego`,`imgJuego`) VALUES (?,?,?,?,?)',[nombJ,descJ,tipoJ,costoJ,imgJ],(err,results)=>{
        if(err)
        throw err;
        res.render('catalogo.html');
        // console.log(results);
    })
}


module.exports = {
    obtenerJuegos,
    agregarJuego
}