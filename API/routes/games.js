const express = require('express');
const juego_controller = require('../controllers/juegosController');
const juegosRouter = express.Router();

juegosRouter.get('/',juego_controller.obtenerJuegos);

juegosRouter.post('/juegos',juego_controller.agregarJuego);

juegosRouter.put('/juegos/:idjuego-:precio',juego_controller.editarJuego);

juegosRouter.delete('/juegos/:idjuego',juego_controller.eliminarJuego);


module.exports=juegosRouter;