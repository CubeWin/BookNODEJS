const { Router } = require('express');

const { mostrarImagen, updatePicture } = require('../controller/upload');

const {validFileUpload} = require('../middleware/validFile');

const uploadRouter = Router();

uploadRouter.post('/');

uploadRouter.put('/:collection/:id',validFileUpload, updatePicture);

uploadRouter.get('/:collection/:id',validFileUpload, mostrarImagen);

module.exports = uploadRouter;
