const { request, response } = require('express');

const { User } = require('../models');

const {
    httpExeption,
    _validData,
    encryptPassword,
    matchPassword,
} = require('../common');

const userGetOne = async (req = request, res = response) => {
    try {
        const { user } = req.params;
        const result = await User.findOne({ username: user });
        if (!result) {
            throw new httpExeption(
                400,
                `no se encontro el usuario ${user} en la BD`
            );
        }
        const { username, name, email } = result;
        res.status(200).json({
            username,
            name,
            email,
            request: {
                type: 'GET',
                url: `http://localhost:8080/api/user/${username}`,
            },
        });
    } catch (error) {
        const { status, data } = _validData(error);
        res.status(status).json({ data });
    }
};

const userCreate = async (req = request, res = response) => {
    try {
        const { username, name, password, email } = req.body;
        const { isEncrypt, pwdHash } = await encryptPassword(password);
        if (!isEncrypt) {
            throw new httpExeption(
                400,
                'la clave debe tener 4 digitos como minimo'
            );
        }
        const user = new User({
            username,
            name,
            password: pwdHash,
            email,
        });
        const result = await user.save();
        const data = {
            message: 'Se registro correctamente.',
            result: {
                id: result._id,
                name: result.name,
                username: result.username,
                request: {
                    type: 'GET',
                    url: `http://localhost:8080/api/user/${result.username}`,
                },
            },
        };
        res.status(200).json(data);
    } catch (error) {
        const { status, data } = _validData(error);
        res.status(status).json({ data });
    }
};

const userLogIn = async (req = request, res = response) => {
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
        res.status(200).json({ message: 'Datos Correctos' });
    } catch (error) {
        const { status, data } = _validData(error);
        res.status(status).json({ data });
    }
};

const userChangePsw = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { password, npassword } = req.body;
        const result = await User.findById(id);
        if (!result) {
            throw new httpExeption(400, `El id ${id} no se encuentra en la BD`);
        }

        const isMatchPwd = await matchPassword(password, result.password);
        if (!isMatchPwd) {
            throw new httpExeption(400, 'la clave no coincide.');
        }

        const { isEncrypt, pwdHash } = await encryptPassword(npassword);
        if (!isEncrypt) {
            throw new httpExeption(
                400,
                'la clave debe tener 4 digitos como minimo'
            );
        }

        // const uresult = await User.findOneAndUpdate(
        //   { _id: id },
        //   { $set: { password: pwdHash } },
        //   { runValidators: true, context: "query" }
        // );
        result.password = pwdHash;
        await result.save();

        const data = {
            message: 'Se actualizo correctamente.',
            result: {
                id,
                request: {
                    type: 'GET',
                    url: `http://localhost:8080/api/user/${uresult.username}`,
                },
            },
        };
        res.status(200).json(data);
    } catch (error) {
        const { status, data } = _validData(error);
        res.status(status).json({ data });
    }
};

const userDelete = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const result = await User.findByIdAndDelete({ _id: id });
        if (!result) {
            throw new httpExeption(
                400,
                `No se encontro el usuario con el id ${id}.`
            );
        }
        const data = {
            message: 'Se elimino correctamente.',
            result: {
                id: result._id,
                request: {
                    type: 'GET',
                    url: `http://localhost:8080/api/user/`,
                },
            },
        };
        res.status(200).json(data);
    } catch (error) {
        const { status, data } = _validData(error);
        res.status(status).json({ data });
    }
};

module.exports = {
    userGetOne,
    userCreate,
    userLogIn,
    userChangePsw,
    userDelete,
};
