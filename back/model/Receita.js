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
ReceitaSchema.statics.random = async function(number) {
    const arr = [];
    const count = await this.countDocuments({});

    for (let i = 0; i < number; i++) {
        const rand = Math.floor(Math.random() * count);
        arr.push(await this.findOne().skip(rand).exec());
    }
    const filtered = arr.filter((item) => item != null);
    return filtered;
};
const Receita = mongoose.model("Receita", ReceitaSchema);
module.exports = Receita;