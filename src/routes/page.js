const { Router } = require("express");
const {
    pageCreate,
    pageGetAll,
    pageLock,
    pageUp,
    pageDown,
    pageChange,
    pagePut,
    pageDelete,
} = require("../controller/page");
const { validToken } = require("../middleware/validarJWT");

const pageRoute = Router();

pageRoute.get("/:book", pageGetAll);// !cambio a se busca por libro
pageRoute.post("/", validToken, pageCreate);
pageRoute.put("/lock/:id", validToken, pageLock);
pageRoute.put("/up/:id", validToken, pageUp);
pageRoute.put("/down/:id", validToken, pageDown);
pageRoute.put("/change/:id", validToken, pageChange);
pageRoute.put("/put/:id", validToken, pagePut);
pageRoute.delete("/put/:id", validToken, pageDelete);

module.exports = pageRoute;
