import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        adminMsg: [],
        variant: [],
        newMsg: false,
        loading: false,
    },
    mutations: {
        addAdminMsg(state, adminMsg) {
            state.adminMsg.push(adminMsg);
        },
        addVariant(state, variant) {
            state.variant.push(variant);
        },
        restartVariant(state) {
            Vue.set(state, "variant", []);
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
    },
    actions: {
        appendNewMsg({ commit }, obj) {
            commit("addAdminMsg", obj.msg);
            commit("addVariant", obj.variant);
            commit("newMsg");
        },
        restartMsg({ commit }) {
            commit("restartAdminMsg");
            commit("restartVariant");
            commit("restartNewMsg");
        },
        ldTrue({ commit }) {
            commit("defineLoadingTrue");
        },
        ldFalse({ commit }) {
            commit("defineLoadingFalse");
        },
    },
    modules: {},
    getters: {
        adminMsg: (state) => state.adminMsg,
        variant: (state) => state.variant,
        newMsg: (state) => state.newMsg,
        loading: (state) => state.loading,
    },
});