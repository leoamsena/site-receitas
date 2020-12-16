import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        adminMsg: [],
        logged: false,
        newMsg: false,
        loading: false,
    },
    mutations: {
        addAdminMsg(state, adminMsg) {
            state.adminMsg.push(adminMsg);
        },

        restartAdminMsg(state) {
            Vue.set(state, "adminMsg", []);
        },
        newMsg(state) {
            Vue.set(state, "newMsg", true);
        },
        restartNewMsg(state) {
            Vue.set(state, "newMsg", false);
        },
        defineLoadingTrue(state) {
            Vue.set(state, "loading", true);
        },
        defineLoadingFalse(state) {
            Vue.set(state, "loading", false);
        },
        defineLoggedTrue(state) {
            Vue.set(state, "logged", true);
        },
        defineLoggedFalse(state) {
            Vue.set(state, "logged", false);
        },
    },
    actions: {
        appendNewMsg({ commit }, obj) {
            commit("addAdminMsg", obj.msg);

            commit("newMsg");
        },
        restartMsg({ commit }) {
            commit("restartAdminMsg");

            commit("restartNewMsg");
        },
        ldTrue({ commit }) {
            commit("defineLoadingTrue");
        },
        ldFalse({ commit }) {
            commit("defineLoadingFalse");
        },
        lgFalse({ commit }) {
            commit("defineLoggedFalse");
        },
        lgTrue({ commit }) {
            commit("defineLoggedTrue");
        },
    },
    modules: {},
    getters: {
        adminMsg: (state) => state.adminMsg,
        newMsg: (state) => state.newMsg,
        loading: (state) => state.loading,
        logged: (state) => state.logged,
    },
});