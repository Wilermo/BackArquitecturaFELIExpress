const {mongoose} = require("mongoose");

const usuarioSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, "Por favor, pon un nombre al usuario"]
        },
        documento: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timeStamps: true
    }
)

const usuario = mongoose.model('usuarioPipe', usuarioSchema)

module.exports = usuario;