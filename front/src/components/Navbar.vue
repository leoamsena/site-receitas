<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand :to="{ name: 'Home' }">Tudo Delicioso</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <!--
        <b-nav-form class="text-center">
          <b-form-input
            size="sm"
            class="mr-sm-2"
            placeholder="Digite sua pesquisa"
          ></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit"
            >Pesquisar</b-button
          >
        </b-nav-form>
         -->

        <b-nav-item right>
          <b-button
            variant="light"
            class="mb-2"
            :to="{ name: 'enviarReceita' }"
            v-if="logged"
          >
            <b-icon icon="list-check" aria-hidden="true"></b-icon>
            Enviar receita
          </b-button>
        </b-nav-item>
        <b-nav-item right>
          <b-button
            v-if="!logged"
            variant="light"
            class="mb-2"
            id="btnLogin"
            @click="showModal"
          >
            <b-icon icon="box-arrow-in-right" aria-hidden="true"></b-icon>
            Fazer login
          </b-button>
          <div v-else>
            <b-button
              variant="light"
              class="mb-2 mr-2"
              id="btnLogin"
              :to="{ name: 'logado' }"
            >
              <b-icon icon="list" aria-hidden="true"></b-icon>
              Minhas receitas
            </b-button>
            <b-button
              variant="light"
              class="mb-2"
              id="btnLogin"
              @click="logout"
            >
              <b-icon icon="box-arrow-in-left" aria-hidden="true"></b-icon>
              Logout
            </b-button>
          </div>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapState } from "vuex";
export default {
  methods: {
    showModal() {
      this.$root.$emit("bv::show::modal", "login-modal", "#btnLogin");
    },
    logout() {
      localStorage.removeItem("jwt");
      this.$router.push({ name: "Home" });
      this.$store.dispatch("lgFalse");
    },
  },
  computed: mapState(["logged"]),
};
</script>

<style>
</style>