const { Router } = require("express");

const { mostrarImagen, updatePicture } = require("../controller/upload");

const { validToken } = require("../middleware/validarJWT");
const { validFileUpload } = require("../middleware/validFile");
const { validRoles } = require("../middleware/validRole");

const uploadRouter = Router();

uploadRouter.post("/");

uploadRouter.put(
    "/:collection/:id",
    [validToken, validRoles("ADMIN_ROLE", "USER_ROLE"), validFileUpload],
    updatePicture
);

uploadRouter.get("/:collection/:id", mostrarImagen);

module.exports = uploadRouter;
