const express = require('express');
const admins_controller = require('../controllers/adminController')
const adminsRouter = express.Router();

adminsRouter.get('/', admins_controller.obtenerAdmins);


module.exports = adminsRouter;