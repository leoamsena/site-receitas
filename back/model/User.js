const mongoose = require("../database");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, "Nome é obrigatório!"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email é obrigatório!"],
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Por favor, insira um email válido!",
        ],
    },
    password: {
        type: String,
        required: [true, "Senha é obrigatório!"],
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.pre("save", async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});
const User = mongoose.model("User", UserSchema);
module.exports = User;