const { Schema, model } = require("mongoose");

const pageSchema = Schema(
  {
    libro_id: {
      type: Schema.Types.ObjectId,
      required: [true, "No se especifico el libro"],
      ref: "Book",
    },
    user_id: {
      type: Schema.Types.ObjectId,
      required: [true, "No se identifico al usuario."],
      ref: "User",
    },
    page: {
      type: Number,
      required: [true, "Ingresar número de página."],
      unique: true,
    },
    picture: {
      type: String,
      default: `no-image`,
    },
    lock: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Page", pageSchema);
