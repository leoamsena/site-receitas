const UserController = require("../controller/user");
const ReceitaController = require("../controller/receita");

let res = {};
let userId = "";

const getRes = () => ({
    status: () => ({
        send: (result) => {
            res = result;
        },
    }),
});

describe("Testando registro e login de usuário", () => {
    let user = {};
    it("deve registrar um usuário", async() => {
        user = {
            email: Math.random().toString(36).substring(7) + "leo@leo.com",
            password: "123",
            nome: "Leo Amorim",
        };
        await UserController.register({ body: user }, getRes());

        expect(res.user).toHaveProperty("_id");
        expect(res.user.email).toEqual(user.email);
        userId = res.user._id;
    });
    it("deve logar com o usuário criado", async() => {
        await UserController.login({ body: user }, getRes());

        expect(res).toHaveProperty("token");
        expect(res.user.email).toEqual(user.email);
        token = res.token;
    });
});
describe("Testando criação de nova receita", () => {
    it("Deve criar uma nova receita", async() => {
        const receita = {
            titulo: "titulo teste",
            ingredientes: ["ing 1", "ing2"],
            preparo: ["prep1", "prep2"],
        };
        await ReceitaController.create({
                body: receita,
                file: { path: "public/images/bolo.jpg" },
                userId,
            },
            getRes()
        );
        expect(res).toHaveProperty("_id");
        expect(res.titulo).toEqual(receita.titulo);
    });
});