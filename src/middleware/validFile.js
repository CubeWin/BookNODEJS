const { response } = require('express');

const validFileUpload = (req, res = response, next) => {
    if (
        !req.files ||
        Object.keys(req.files).length === 0 ||
        !req.files.archivo
    ) {
        return res
            .status(400)
            .json({ message: `No hay archivos que subir - validFileUpload` });
    }
    next();
};

module.exports = { validFileUpload };
