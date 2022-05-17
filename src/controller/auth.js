const { request, response } = require('express');

const User = require('../models/user');

const { _validData, matchPassword, httpExeption } = require('../common');
const { generarJWT } = require('../common/generarJwt');

const login = async (req = request, res = response) => {
    try {
        const { user, password } = req.body;
        const result = await User.findOne({ username: user });
        if (!result) {
            throw new httpExeption(
                400,
                `El usuario ${user} no se encuentra en la BD`
            );
        }
        const isMatchPwd = await matchPassword(password, result.password);
        if (!isMatchPwd) {
            throw new httpExeption(400, 'La clave no coincide.');
        }

        const token = await generarJWT(result._id);

        res.status(200).json({ result, token });
    } catch (error) {
        const { status, data } = _validData(error);
        res.status(status).json({ data });
    }
};

module.exports = { login };
