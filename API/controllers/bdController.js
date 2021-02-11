const {conexion_bd} = require('../config/bdConfig')


//Recibo todos los users.

const obtenerUsers = (req,res) => {
    conexion_bd.query('SELECT * from users', (err,results)=> {
        if (err)throw err;
        res.send(results)
    })
}

module.exports = {
    obtenerUsers
}