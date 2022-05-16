const { Router } = require("express");
const {
  userGetOne,
  userCreate,
  userChangePsw,
  userDelete,
  userLogIn,
} = require("../controller/user");
const { validToken } = require("../middleware/validarJWT");

const userRoute = Router();

userRoute.get("/:user",validToken, userGetOne);
userRoute.post("/",validToken, userCreate);
userRoute.put("/:id",validToken, userChangePsw);
userRoute.delete("/:id",validToken, userDelete);
userRoute.post("/log/", userLogIn);

module.exports = userRoute;
