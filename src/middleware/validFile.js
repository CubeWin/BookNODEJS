const { response } = require('express');

const validFileUpload = (req, res = response, next) => {
    console.log(req.files);
    if (
        !req.files ||
        Object.keys(req.files).length === 0 ||
        !req.files.Archivo
    ) {
        return res
            .status(400)
            .json({ message: `No hay archivos que subir - validFileUpload` });
    }
    next();
};

module.exports = { validFileUpload };
