const { Router } = require("express");
const { bookGetAll, createBook } = require("../controller/book");
const { validToken, validRoles } = require("../middleware");

const bookRoute = Router();

bookRoute.get("/", bookGetAll);
bookRoute.post(
    "/",
    [validToken, validRoles("ADMIN_ROLE", "USER_ROLE")],
    createBook
);

module.exports = bookRoute;
