const express = require("express");
const path = require("path");

const router = require("express").Router();
const bodyParser = require("body-parser");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const receitaRouter = require("./routes/receitas");

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/receitas", receitaRouter);
app.use("/users", usersRouter);

app.use(function(err, req, res, next) {
    //console.log(err.errors);
    let { message, showMsg, acao, stack, codeHttp = 500 } = err;
    if (err.name == "ValidationError") {
        const valErrors = Object.values(err.errors).reduce(
            (t, { properties }) => t + " " + properties.message,
            ""
        );

        showMsg = "Erro de validação de campos: " + valErrors;
    }
    res.status(codeHttp).send({
        message,
        showMsg,
        acao,
        stack,
    });
});

module.exports = app;