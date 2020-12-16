const express = require("express");
const authRouter = express.Router();
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

const multer = require("../middlewares/imageMulter");
const ReceitaController = require("../controller/receita");

authRouter.use(authMiddleware);

router.get("/random/:number", ReceitaController.random);
router.post("/avaliar/:id", ReceitaController.avaliar);
router.get("/:id", ReceitaController.getById);
router.get("/", ReceitaController.getAll);

authRouter.patch("/:id", multer.single("imagem"), ReceitaController.update);
authRouter.delete("/:id", ReceitaController.delete);
authRouter.post("/", multer.single("imagem"), ReceitaController.create);

module.exports = [router, authRouter];