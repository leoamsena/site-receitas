<template>
  <div id="app">
    <navbar></navbar>

    <b-modal
      hide-header-close
      hide-header
      hide-footer
      no-close-on-esc
      no-close-on-backdrop
      ref="loading-modal"
      id="loading-modal"
    >
      <div class="d-block text-center">
        Carregando!!!<br />
        <b-icon icon="arrow-clockwise" animation="spin" font-scale="4"></b-icon>
      </div>
    </b-modal>
    <router-view></router-view>

    <b-modal id="login-modal" :title="registrar ? 'Cadastro' : 'Login'">
      <form ref="form" @submit.prevent>
        <b-form-input
          id="nome-input"
          v-model="nome"
          required
          placeholder="Nome"
          class="mb-3"
          v-if="registrar"
        ></b-form-input>
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
        <b-container>
          <b-row>
            <b-col>
              <b-button
                variant="warning"
                size="sm"
                @click="registrar = !registrar"
                id="mudar-registro-login"
              >
                Mudar para {{ registrar ? "login" : "cadastro" }}
              </b-button>
            </b-col>
            <b-col>
              <b-button
                variant="primary"
                size="sm"
                class="float-right"
                @click="makeLoginClick"
                id="btn-logar-registrar"
              >
                {{ registrar ? "Registrar" : "Logar" }}
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </template>
    </b-modal>
    <v-footer></v-footer>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import VFooter from "./components/Footer";
import { login, register } from "./services/Auth";
import { mapState } from "vuex";

export default {
  components: { Navbar, VFooter },
  data() {
    return {
      email: "",
      password: "",
      nome: "",
      registrar: false,
    };
  },
  methods: {
    async makeLoginClick() {
      if (!this.registrar) {
        const res = await login(this.email, this.password);
        if (res) {
          this.$bvModal.hide("login-modal");
          this.$router.push({ name: "logado" });
        }
      } else {
        const res = await register(this.nome, this.email, this.password);
        if (res) {
          this.registrar = false;
          this.$store.dispatch("appendNewMsg", {
            msg: "Registrado com sucesso! Agora faça login!",
          });
        }
      }
    },
  },
  computed: mapState(["loading", "adminMsg"]),
  watch: {
    loading() {
      this.$refs["loading-modal"].toggle();
    },
    adminMsg() {
      while (this.adminMsg.length > 0) {
        const msg = this.adminMsg.pop();
        this.$bvToast.toast(msg, {
          title: "Informação do servidor",
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
