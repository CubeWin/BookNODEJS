const { Router } = require("express");
const { bookGetAll, createBook } = require("../controller/book");

const bookRoute = Router();

bookRoute.get("/", bookGetAll);
bookRoute.post("/", createBook);

module.exports = bookRoute;
