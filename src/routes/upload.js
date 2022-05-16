const { Router } = require('express');

const { mostrarImagen, updatePicture } = require('../controller/upload');

const { validToken } = require('../middleware/validarJWT');
const {validFileUpload} = require('../middleware/validFile');

const uploadRouter = Router();

uploadRouter.post('/');

uploadRouter.put('/:collection/:id',[validToken,validFileUpload], updatePicture);

uploadRouter.get('/:collection/:id',[validToken,validFileUpload], mostrarImagen);

module.exports = uploadRouter;
