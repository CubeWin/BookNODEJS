const httpExeption  = require('./HttpExecption');
const password      = require('./password');
const uploadFile    = require('./uploadFile');
const validData     = require('./validData');

module.exports = {
    ...httpExeption,
    ...password,
    ...uploadFile,
    ...validData,
};
