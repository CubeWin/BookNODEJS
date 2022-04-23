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

const pageRoute = Router();

pageRoute.post("/", pageCreate);
pageRoute.get("/", pageGetAll);
pageRoute.put("/lock/:id", pageLock);
pageRoute.put("/up/:id", pageUp);
pageRoute.put("/down/:id", pageDown);
pageRoute.put("/change/:id", pageChange);
pageRoute.put("/put/:id", pagePut);
pageRoute.delete("/put/:id", pageDelete);

module.exports = pageRoute;
