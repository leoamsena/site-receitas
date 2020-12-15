<template>
  <b-container class="mt-4"
    ><b-row
      ><b-col><h1>Adicionar nova receita</h1></b-col>
    </b-row>
    <b-row>
      <b-col
        ><b-form-input
          placeholder="Título da receita"
          v-model="titulo"
        ></b-form-input
      ></b-col>
    </b-row>
    <b-row class="border-bottom pb-2">
      <b-col>
        <b-form-file
          placeholder="Escolha uma foto ou arraste pra cá..."
          drop-placeholder="Solte a foto aqui..."
          v-model="imagem"
        >
        </b-form-file
      ></b-col>
    </b-row>
    <b-row align-h="between" class="text-left">
      <b-col><h2>Ingredientes</h2></b-col>
      <b-col cols="auto"
        ><b-button @click="adicionarIngrediente"
          >Adicionar ingrediente</b-button
        ></b-col
      >
    </b-row>
    <b-row>
      <b-col
        ><b-input-group
          v-for="(ing, key) in ingredientes"
          :key="key"
          class="mb-3"
        >
          <b-form-input
            placeholder="Descreva o ingrediente"
            v-model="ingredientes[key]"
          ></b-form-input>
          <b-input-group-append>
            <b-button
              variant="danger"
              @click="removerIngrediente(key)"
              v-show="key > 0"
              >X</b-button
            >
          </b-input-group-append>
        </b-input-group></b-col
      >
    </b-row>
    <b-row align-h="between" class="text-left">
      <b-col><h2>Modo de prapro</h2></b-col>
      <b-col cols="auto"
        ><b-button @click="adicionarPreparo"
          >Adicionar modo de preparo</b-button
        ></b-col
      >
    </b-row>
    <b-row>
      <b-col
        ><b-input-group v-for="(ing, key) in preparo" :key="key" class="mb-3">
          <b-form-input
            placeholder="Descreva o modo de preparo"
            v-model="preparo[key]"
          ></b-form-input>
          <b-input-group-append v-show="key > 0">
            <b-button variant="danger" @click="removerPreparo(key)">X</b-button>
          </b-input-group-append>
        </b-input-group></b-col
      >
    </b-row>
    <b-row>
      <b-col>
        <b-button variant="primary" @click="submit">Enviar</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { submit as subRec } from "../services/Receitas";
export default {
  data() {
    return {
      ingredientes: [""],
      preparo: [""],
      titulo: "",
      imagem: null,
    };
  },
  methods: {
    adicionarIngrediente() {
      this.ingredientes.push("");
    },
    adicionarPreparo() {
      this.preparo.push("");
    },
    removerIngrediente(pos) {
      if (this.ingredientes.length > 1) this.ingredientes.splice(pos, 1);
    },
    removerPreparo(pos) {
      if (this.preparo.length > 1) this.preparo.splice(pos, 1);
    },
    async submit() {
      let form = new FormData();
      form.append("imagem", this.imagem);
      this.ingredientes.forEach((item, key) => {
        form.append(`ingredientes[${key}]`, item);
      });

      this.preparo.forEach((item, key) => {
        form.append(`preparo[${key}]`, item);
      });
      form.append("titulo", this.titulo);

      const data = await subRec(form);
      this.$router.push({ name: "receita", params: { id: data._id } });
    },
  },
};
</script>

<style scoped>
.row {
  margin-bottom: 2rem;
}
</style>