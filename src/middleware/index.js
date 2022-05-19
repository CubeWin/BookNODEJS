const validarJWT = require("./validarJWT");
const validFile = require("./validFile");
const validRole = require("./validRole");

module.exports = {
    ...validarJWT,
    ...validFile,
    ...validRole,
};
