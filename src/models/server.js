const express    = require("express");
const fileUpload = require('express-fileupload')
const cors       = require("cors");
const path       = require("path");

const userRoutes   = require("../routes/user");
const bookRoutes   = require("../routes/book");
const pageRoutes   = require("../routes/page");
const uploadRoutes = require("../routes/upload");

const { dataBaseConnection } = require("../models/database");

class Server {

  constructor() {
    this.app     = express();
    this.port    = process.env.PORT || 9090;
    this.path    = {
      user    : '/api/user',
      book    : '/api/book',
      page    : '/api/page',
      uploads : '/api/uploads'
    }

    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    await dataBaseConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, "public")));
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Aaccess-Control-Allow-Headers",
        "Accept, Authorization, Origin, Content-Type, X-Requested-With"
      );
      if (req.method === "OPTIONS") {
        res.header(
          "Access-Control-Allow-Methods",
          "PUT, POST, PATH, DELETE, GET"
        );
        return res.status(200).json({});
      }
      next();
    });
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath: true
    }))
  }

  routes() {
    this.app.use(this.path.user, userRoutes);
    this.app.use(this.path.book, bookRoutes);
    this.app.use(this.path.page, pageRoutes);
    this.app.use(this.path.uploads, uploadRoutes);

    this.app.get("*", (req, res, next) => {
      res.status(404).send("Page Not Found");
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(
        `Servidor en el puerto ${this.port}. \n http://localhost:${this.port}`
      );
    });
  }
}

module.exports = Server;
