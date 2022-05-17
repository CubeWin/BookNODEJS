const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const validToken = async (req = request, res = response, next) => {
    try {
        const token = req.header("auth-token");
        const { uid } = await jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        //verificar el id del token existe
        const usuario = await User.findById(uid);
        if (!usuario) {
            return res.status(401).json({
                message: "El usuario no existe en la BD",
            });
        }
        // verificar si el estado del usuario (en este caso no uso estado por eso lo omito)
        if (!usuario.state) {
            return res.status(401).json({
                message: "El usuario se encuentra deshabilitado",
            });
        }

        req.usuario = usuario; // creo una variable en el req para poder usar despues

        next();
    } catch (error) {
        res.status(401).json({
            message: "Token no valido",
        });
    }
};

module.exports = { validToken };
