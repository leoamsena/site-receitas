const express = require("express");
const authRouter = express.Router();
const router = express.Router();

const authMiddleware = require("../middlewares/auth");

const UserController = require("../controller/user");

authRouter.use(authMiddleware);

authRouter.get("/receitas", UserController.getAllReceitas);

router.post("/register", UserController.register);

router.post(
    "/login",
    UserController.login
);

module.exports = [router, authRouter];