<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
    

    <b-modal id="login-modal" title="Login">
      <form ref="form" @submit.prevent>
        <b-form-input
          id="email-input"
          v-model="email"
          type="email"
          required
          placeholder="Email"
          class="mb-3"
        ></b-form-input>
        <b-form-input
          id="password-input"
          v-model="password"
          type="password"
          required
          placeholder="Senha"
        ></b-form-input>
      </form>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="makeLoginClick"
          >
            Logar
          </b-button>
        </div>
      </template>
    </b-modal>
    <v-footer></v-footer>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import VFooter from "./components/Footer";
import { login } from "./services/Auth";
export default {
  components: { Navbar, VFooter },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async makeLoginClick() {
      try {
        const res = await login(this.email, this.password);
        if (res) {
          this.$router.push({ name: "logado" });
        }
      } catch (e) {
        this.$bvToast.toast("Email e/ou senha incorreto(s)!", {
          title: "Erro ao logar!",
          autoHideDelay: 5000,
        });
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
