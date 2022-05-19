const httpExeption = require("./HttpExecption");
const password = require("./password");
const uploadFile = require("./uploadFile");
const validData = require("./validData");
const generarJWT = require("./generarJwt");

module.exports = {
    ...httpExeption,
    ...password,
    ...uploadFile,
    ...validData,
    ...generarJWT,
};
