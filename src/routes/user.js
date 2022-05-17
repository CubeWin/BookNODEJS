const { Router } = require("express");
const {
  userGetOne,
  userCreate,
  userChangePsw,
  userDelete,
  userLogIn,
} = require("../controller/user");
const { validToken } = require("../middleware/validarJWT");
const { validRole } = require("../middleware/validRole");

const userRoute = Router();

userRoute.get("/:user",[validToken, validRole], userGetOne);
userRoute.post("/",[validToken, validRole], userCreate);
userRoute.put("/:id",[validToken, validRole], userChangePsw);
userRoute.delete("/:id",[validToken, validRole], userDelete);
userRoute.post("/log/", userLogIn);

module.exports = userRoute;
