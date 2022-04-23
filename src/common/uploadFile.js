const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (
    files,
    extensions = ['png', 'jpg', 'jpeg'],
    folder = ''
) => {
    return new Promise((resolve, reject) => {
        const { Archivo } = files;

        const nombreCortado = Archivo.name.split('.');

        const extension = nombreCortado[nombreCortado.length - 1];

        if (!extensions.includes(extension)) {
            return reject(
                `La extensión ${extension} no es permitida - ${extensionesValidas}`
            );
        }

        const nombreTemp = uuidv4() + '.' + extension;

        const uploadpath = path.join(
            __dirname,
            '../../public/uploads/',
            folder,
            nombreTemp
        );

        Archivo.mv(uploadpath, (err) => {
            if (err) {
                reject(err);
            }
            resolve(nombreTemp);
        });
    });
};

module.exports = { uploadFile };
