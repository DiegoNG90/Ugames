const {conexion_bd} = require('../config/bdConfig');

const obtenerAdmins = (req,res) => {
    conexion_bd.query('SELECT * from admins', (err,results)=> {
        if (err)throw err;
        res.send(results)
    })
}

module.exports = {
    obtenerAdmins
}