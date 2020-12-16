const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const authConfig = require("../config/auth");
const Receita = require("../model/Receita");

function generateToken(params = {}) {
    return (token = jwt.sign(params, authConfig.secret, { expiresIn: 86400 }));
}
module.exports = {
    getAllReceitas: asyncHandler(async(req, res) => {
        const { userId } = req;
        const receitas = await Receita.find({ user: userId });
        res.send(receitas);
    }),
    register: asyncHandler(async(req, res) => {
        const err = { acao: "realizar cadastro" };

        const { email } = req.body;
        if (await User.findOne({ email }))
            throw Object.assign(err, { showMsg: "Usuário já existe!" });
        const user = await User.create(req.body);
        user.password = undefined;
        return res.send({ user, token: generateToken({ id: user.id }) });
    }),
    login: asyncHandler(async(req, res) => {
        const { email, password } = req.body;
        if (password === undefined)
            throw { codeHttp: 400, showMsg: "Nenhuma senha foi fornecida!" };
        const user = await User.findOne({ email }).select("+password");
        if (!user) throw { showMsg: "Usuário não encontrado!", codeHttp: 401 };
        if (!(await bcrypt.compare(password, user.password)))
            throw { showMsg: "Senha inválida!", codeHttp: 401 };
        user.password = undefined;
        res.send({ user, token: generateToken({ id: user.id }) });
    }),
};