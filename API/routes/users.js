const express = require('express');
const users_controller = require('../controllers/bdController')
const userRouter = express.Router();

userRouter.get('/', users_controller.obtenerUsers);


module.exports = userRouter;