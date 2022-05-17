const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = Schema(
    {
        username: {
            type: String,
            required: [true, "El usuario es requerido."],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Ingresar Clave."],
        },
        email: {
            type: String,
            required: [true, "Ingresar Correo"],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "El correo no es valido.",
            ],
            unique: true,
        },
        name: {
            type: String,
            required: [true, "Ingresar nombre"],
        },
        role: {
            type: String,
            required: true,
            emun: ["ADMIN_ROLE", "USER_ROLE"],
        },
        state: {
            type: Boolean,
            default: true,
            required: [true, "El estado es obligatorio"],
        },
    },
    {
        timestamps: true,
    }
);

userSchema.plugin(uniqueValidator, {
    message: "Error, el '{PATH}' con valor '{VALUE}' se encuentra registrado.",
});

userSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
};

module.exports = model("User", userSchema);
