const {conexion_bd} =require('../config/bdConfig')



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

//Edita costo de un Juego
const editarJuego =(req,res)=>{

    //destructuring
    let idJ = req.params;

    //console.log(idJ.precio);
    //console.log(idJ.idjuego);
    conexion_bd.query('UPDATE `t_juegos` SET `costoJuego`= ? WHERE idJuego = ?',[idJ.precio,idJ.idjuego],(err,results)=>{
        if(err)
        throw err;
    res.send('Juego editado con exito!');
    })
}

//Elimina un Juego
const eliminarJuego= (req,res)=>{
    //destructuring
    let idJ = req.params;
    //console.log(idJ.idjuego);
  
   conexion_bd.query('DELETE FROM `t_juegos` WHERE idJuego = ?',[idJ.idjuego],(err,results)=>{
        if(err)
        throw err;
    res.send('Juego eliminado');
    })
}

module.exports = {
    obtenerJuegos,
    agregarJuego,
    eliminarJuego,
    editarJuego
}