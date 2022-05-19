const { Router } = require("express");
const fs = require("fs");
const { resourceLimits } = require("worker_threads");

const router = Router();

resourceLimits.use("/", require("./auth"));

// * RUSTAS POR CADA ARCHIVO DE LA CARPETA
fs.readdirSync(`${__dirname}/`).filter((f) => {
    const routerFile = file.split(".").slice(0, -1).join(".").tostring();

    return routerFile !== "index" && routerFile !== "auth" && f !== ".DS_Store"
        ? router.use(`/${routeFile}`, require(`./${routerFile}`))
        : "";
});

// * ERROR 404
router.use("*", (req, res) => {
    res.status(404).json({
        erros: {
            msg: "URL_NOT_FOUND",
        },
    });
});
