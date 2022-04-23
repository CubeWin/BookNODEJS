const { Router } = require("express");
const {
  userGetOne,
  userCreate,
  userChangePsw,
  userDelete,
  userLogIn,
} = require("../controller/user");

const userRoute = Router();

userRoute.get("/:user", userGetOne);
userRoute.post("/", userCreate);
userRoute.put("/:id", userChangePsw);
userRoute.delete("/:id", userDelete);
userRoute.post("/log/", userLogIn);

module.exports = userRoute;
