const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const authConfig = require("../config/auth");
const authMiddleware = require("../middlewares/auth");
const Receita = require("../model/Receita");

authRouter.use(authMiddleware);

function generateToken(params = {}) {
    return (token = jwt.sign(params, authConfig.secret, { expiresIn: 86400 }));
}

authRouter.get(
    "/receitas",
    asyncHandler(async(req, res) => {
        const { userId } = req;
        const receitas = await Receita.find({ user: userId });
        res.send(receitas);
    })
);

router.get(
    "",
    asyncHandler(async(req, res) => {
        const users = await User.find();
        res.send(users);
    })
);

router.post(
    "/register",
    asyncHandler(async(req, res) => {
        const err = { acao: "realizar cadastro" };

        const { email } = req.body;
        if (await User.findOne({ email }))
            throw Object.assign(err, { showMsg: "Usuário já existe!" });
        const user = await User.create(req.body);
        user.password = undefined;
        return res.send({ user, token: generateToken({ id: user.id }) });
    })
);

router.post(
    "/login",
    asyncHandler(async(req, res) => {
        const { email, password } = req.body;
        if (password === undefined)
            throw { codeHttp: 400, showMsg: "Nenhuma senha foi fornecida!" };
        const user = await User.findOne({ email }).select("+password");
        if (!user) throw { showMsg: "Usuário não encontrado!", codeHttp: 401 };
        if (!(await bcrypt.compare(password, user.password)))
            throw { showMsg: "Senha inválida!", codeHttp: 401 };
        user.password = undefined;
        res.send({ user, token: generateToken({ id: user.id }) });
    })
);

module.exports = [router, authRouter];