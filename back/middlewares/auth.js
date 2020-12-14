const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).send({ showMsg: "Token não fornecido!" });
    const parts = authHeader.split(" ");
    if (parts.length !== 2)
        return res
            .status(401)
            .send({ showMsg: "Erro no token (tamanho diferente de 2)" });
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ showMsg: "Token mal formatado" });

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send({ showMsg: "Token inválido!" });
        req.userId = decoded.id;
        return next();
    });
};