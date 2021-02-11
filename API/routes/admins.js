const express = require('express');
const admins_controller = require('../controllers/bdController')
const adminsRouter = express.Router();

adminsRouter.get('/', admins_controller.obtenerUsers);


module.exports = adminsRouter;