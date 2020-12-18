const express = require("express");
const path = require("path");

const router = require("express").Router();
const bodyParser = require("body-parser");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const usersRouter = require("./routes/users");
const receitaRouter = require("./routes/receitas");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/receitas", receitaRouter);
app.use("/users", usersRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


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