const { request, response } = require("express");

const validRole = (req = request, res = response, next) => {
    try {
        const usuario = req.usuario;
        if (!usuario) {
            res.status(401).json({
                message: "Usuario no encontrado",
            });
        }

        const { role, name } = usuario;
        if (role !== "ADMIN_ROLE") {
            return res.status(401).json({
                message: `${name} no es administrador - No puede hacer esto`,
            });
        }

        next();
    } catch (error) {
        res.status(501).json({
            message: error,
        });
    }
};

const validRoles = (...roles) => {
    return (req = request, res = response, next) => {
        try {
            const usr = req.usuario;
            if (!usr) {
                res.status(500).json({
                    message: "Falta validar el token.",
                });
            }

            const { rol } = usr;
            if (!roles.includes(rol)) {
                res.status(401).json({
                    message: `el servicio requiere uno de estos roles ${rols}`,
                });
            }
        } catch (error) {
            res.status(501).json({
                message: error,
            });
        }
    };
};

module.exports = { validRole, validRoles };
