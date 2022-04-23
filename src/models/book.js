const { Schema, model } = require("mongoose");

const bookSchema = Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: [true, "No se identifico al usuario."],
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Ingresar el título."],
    },
    count_page: {
      type: Number,
      required: [true, "Ingresar la cantidad de páginas."],
    },
    picture: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("Book", bookSchema);
