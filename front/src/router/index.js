import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Logado from "../views/Logado.vue";
import Receita from "../views/Receita.vue";
import EnviarReceita from "../views/EnviarReceita";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/logado",
        name: "logado",
        component: Logado,
    },
    {
        path: "/receita/enviar",
        name: "enviarReceita",
        component: EnviarReceita,
    },
    {
        path: "/receita/editar/:id",
        name: "editarReceita",
        component: EnviarReceita,
        props: { editar: true },
    },
    {
        path: "/receita/:id",
        name: "receita",
        component: Receita,
    },
];

const router = new VueRouter({
    routes,
});

export default router;