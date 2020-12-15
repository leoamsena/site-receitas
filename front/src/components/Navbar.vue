<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">Tudo Delicioso</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
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

        <b-nav-item right>
          <b-button variant="light" class="mb-2">
            <b-icon icon="list-check" aria-hidden="true"></b-icon>
            Enviar receita
          </b-button>
        </b-nav-item>
        <b-nav-item right>
          <b-button
            variant="light"
            class="mb-2"
            id="btnLogin"
            @click="showModal"
          >
            <b-icon icon="box-arrow-in-right" aria-hidden="true"></b-icon>
            Fazer login
          </b-button>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    showModal() {
      this.$root.$emit("bv::show::modal", "login-modal", "#btnLogin");
    },
  },
};
</script>

<style>
</style>