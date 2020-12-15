const express = require("express");
const authRouter = express.Router();
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const asyncHandler = require("express-async-handler");
const multer = require("../middlewares/imageMulter");
const fs = require("fs");
const Receita = require("../model/Receita");

authRouter.use(authMiddleware);

router.get(
    "/random/:number",
    asyncHandler(async(req, res) => {
        const n = req.params.number;
        const teste = await Receita.random(n);
        res.send(teste);
    })
);

router.post(
    "/avaliar/:id",
    asyncHandler(async(req, res) => {
        const id = req.params.id;
        const { nota } = req.body;
        if (nota > 5 || nota < 0)
            throw { showMsg: "Nota tem que ser entre 0 e 5!" };
        let receita = await Receita.findById(id);
        let notaAnt = receita.nota;

        if (notaAnt == null) {
            notaAnt = nota;
        }
        notaAnt = (notaAnt + nota) / 2;
        receita = await Receita.findByIdAndUpdate(
            id, { nota: notaAnt }, { new: true }
        );
        res.send(receita);
    })
);

router.get(
    "/:id",
    asyncHandler(async(req, res) => {
        const id = req.params.id;
        const receita = await Receita.findOne({ _id: id });
        res.send(receita);
    })
);

router.get(
    "/",
    asyncHandler(async(req, res) => {
        const receitas = await Receita.find();
        res.send(receitas);
    })
);
authRouter.patch(
    "/:id",
    multer.single("imagem"),
    asyncHandler(async(req, res) => {
        const { id } = req.params;

        const { titulo, ingredientes, preparo } = req.body;

        const path = req.file === undefined ? undefined : req.file.path;
        const receitaAnt = await Receita.findOne({ _id: id });
        if (req.userId != receitaAnt.user) {
            fs.unlinkSync(path);
            throw { showMsg: "Você não é dono dessa receita!" };
        }
        const newObj = {
            titulo,
            path,
        };
        if (ingredientes !== undefined) newObj.ingredientes = ingredientes;
        if (preparo !== undefined) newObj.preparo = preparo;
        let receita = await Receita.findOneAndUpdate({ _id: id }, newObj, {
            new: true,
        });
        res.send(receita);
    })
);
authRouter.delete(
    "/:id",
    asyncHandler(async(req, res) => {
        const { id } = req.params;
        const receita = await Receita.findOne({ _id: id });
        if (receita === null) throw { showMsg: "Essa receita não existe!" };
        fs.unlinkSync(receita.imagem);
        if (receita.user != req.userId)
            throw { showMsg: "Essa receita não é sua!" };
        await Receita.findOneAndDelete({ _id: id });
        res.send();
    })
);
authRouter.post(
    "/",
    multer.single("imagem"),
    asyncHandler(async(req, res) => {
        if (req.file === undefined)
            throw { showMsg: "É obrigatório enviar uma foto!" };
        const { path } = req.file;
        try {
            const { userId } = req;
            const { titulo, ingredientes, preparo } = req.body;
            const receita = await Receita.create({
                titulo,
                ingredientes,
                preparo,
                user: userId,
                imagem: path,
            });
            res.send(receita);
        } catch (e) {
            fs.unlinkSync(path);
            throw e;
        }
    })
);

module.exports = [router, authRouter];