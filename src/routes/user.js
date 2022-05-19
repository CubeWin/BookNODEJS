const { Router } = require("express");
const {
    userGetOne,
    userCreate,
    userChangePsw,
    userDelete,
} = require("../controller/user");
const { validToken, validRole } = require("../middleware");

const userRoute = Router();

userRoute.get("/:user", [validToken, validRole], userGetOne);
userRoute.post("/", [validToken, validRole], userCreate);
userRoute.put("/:id", [validToken, validRole], userChangePsw);
userRoute.delete("/:id", [validToken, validRole], userDelete);

module.exports = userRoute;
