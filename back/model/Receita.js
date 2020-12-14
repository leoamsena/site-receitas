const mongoose = require("../database");

const ReceitaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, "Título é obrigatório!"],
    },
    ingredientes: {
        type: [String],
        required: [true, "Ingredientes é obrigatório!"],
        validate: {
            validator: (v) => Array.isArray(v) && v.length > 0,
            message: (props) => `Os ingredientes não são válidos!`,
        },
    },
    imagem: {
        type: String,
        required: true,
    },
    preparo: {
        type: [String],
        required: [true, "Modo de preparo é obrigatório!"],
        validate: {
            validator: (v) => Array.isArray(v) && v.length > 0,
            message: (props) => `O modo de preparo não é válido!`,
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    nota: {
        type: Number,
        default: null,
    },
});

const Receita = mongoose.model("Receita", ReceitaSchema);
module.exports = Receita;