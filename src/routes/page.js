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
const { validRoles } = require("../middleware/validRole");

const pageRoute = Router();

pageRoute.get("/:book", pageGetAll);
pageRoute.post("/", [validToken, validRoles("ADMIN_ROLE", "USER_ROLE")], pageCreate);
pageRoute.put("/lock/:id", [validToken, validRoles("ADMIN_ROLE", "USER_ROLE")], pageLock);
pageRoute.put("/up/:id", [validToken, validRoles("ADMIN_ROLE", "USER_ROLE")], pageUp);
pageRoute.put("/down/:id", [validToken, validRoles("ADMIN_ROLE", "USER_ROLE")], pageDown);
pageRoute.put("/change/:id", [validToken, validRoles("ADMIN_ROLE", "USER_ROLE")], pageChange);
pageRoute.put("/put/:id", [validToken, validRoles("ADMIN_ROLE", "USER_ROLE")], pagePut);
pageRoute.delete("/put/:id", [validToken, validRoles("ADMIN_ROLE", "USER_ROLE")], pageDelete);

module.exports = pageRoute;
