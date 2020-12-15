import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Logado from "../views/Logado.vue";
import Receita from "../views/Receita.vue";

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
        path: "/receita/:id",
        name: "receita",
        component: Receita,
    },
];

const router = new VueRouter({
    routes,
});

export default router;