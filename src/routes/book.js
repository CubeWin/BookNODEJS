const { Router } = require("express");
const { bookGetAll, createBook } = require("../controller/book");
const { validToken } = require("../middleware/validarJWT");

const bookRoute = Router();

bookRoute.get("/", bookGetAll);
bookRoute.post("/",[validToken,validRoles("ADMIN_ROLE", "USER_ROLE")], createBook);

module.exports = bookRoute;
