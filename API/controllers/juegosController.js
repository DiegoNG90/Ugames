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
    conexion_bd.query('INSERT INTO `t_juegos`(`nombreJuego`, `descJuego`,`tipoJuego`,`costoJuego`,`imgJuego`) VALUES (?,?,?,?,?)',[nombJ,descJ,tipoJ,costoJ,imgJ],(err,results)=>{
        if(err)
        throw err;
        res.redirect('adminView.html');
        // console.log(results);
    })
}


//Elimina un Juego
const eliminarJuego= (req,res)=>{
    //destructuring
    let idJ = req.params.idJuego;
    console.log(idJ);
  /*
   conexion_bd.query('DELETE FROM `t_juegos` WHERE idJuego = ?',[idJ],(err,results)=>{
        if(err)
        throw err;
    res.send('Juego eliminado');
    })*/
}

module.exports = {
    obtenerJuegos,
    agregarJuego,
    eliminarJuego
}