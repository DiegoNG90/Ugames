const express = require('express');
const juego_controller = require('../controllers/juegosController');
const juegosRouter = express.Router();

juegosRouter.get('/',juego_controller.obtenerJuegos);

juegosRouter.post('/admin',juego_controller.agregarJuego)

module.exports=juegosRouter;