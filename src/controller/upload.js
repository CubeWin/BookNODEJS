const { response } = require('express');
const path = require('path');
const fs = require('fs');

const { httpExeption, _validData, uploadFile } = require('../common');

const { Book, Page } = require('../models');

const mostrarImagen = async (req, res = response) => {
    try {
        const { id, collection } = req.params;

        let result;

        switch (collection) {
            case 'book':
                result = await Book.findById(id);
                if (!result) {
                    throw new httpExeption(400, `No existe el id ${id}.`);
                }
                break;

            case 'page':
                result = await Page.findById(id);
                if (!result) {
                    throw new httpExeption(400, `No existe el id ${id}`);
                }
                break;

            default:
                throw new httpExeption(
                    500,
                    `No se pudo validad la colección "${collection}".`
                );
        }

        // ?Enviar imagen si existe
        if (result.picture) {
            const pathImagen = path.join(
                __dirname,
                '../../public/uploads',
                collection,
                result.picture
            );

            if (fs.existsSync(pathImagen)) {
                return res.sendFile(pathImagen);
            }
        }

        // !Envia imagen por defecto
        const pathImage = path.join(
            __dirname,
            '../../public/uploads/no-image.jpg'
        );
        res.sendFile(pathImage);
    } catch (error) {
        const { status, data } = _validData(error);
        res.status(status).json({ data });
    }
};

const updatePicture = async (req, res = response) => {
    try {
        const { id, collection } = req.params;
        let result;

        switch (collection) {
            case 'book':
                result = await Book.findById(id);
                if (!result) {
                    throw new httpExeption(
                        400,
                        `No existe el usuario con el id ${id}.`
                    );
                }
                break;

            case 'page':
                result = await Page.findById(id);
                if (!result) {
                    throw new httpExeption(
                        400,
                        `No existe la página con el id ${id}.`
                    );
                }
                break;

            default:
                throw new httpExeption(500, `coleccion invalida`);
        }
        // !Limpiar imagenes previas
        if (result.picture) {
            const pathPicture = path.join(
                __dirname,
                '../../public/uploads',
                collection,
                result.picture
            );
            if (fs.existsSync(pathPicture)) {
                fs.unlinkSync(pathPicture);
            }
        }

        // ?Registrar nueva imagen
        const picture = await uploadFile(req.files, undefined, collection);
        result.picture = picture;
        await result.save();

        const data = {
            message: 'Se actualizo correctamente.',
            result: {
                id: result._id,
                picture: result.picture,
                request: {
                    type: 'GET',
                    url: `http://localhost:8080/api/upload/${collection}/${id}`,
                },
            },
        };
        res.status(200).json({ data });
    } catch (error) {
        const { status, data } = _validData(error);
        res.status(status).json({ data });
    }
};

module.exports = { mostrarImagen, updatePicture };
