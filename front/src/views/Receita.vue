<template>
  <b-container class="mt-5">
    <b-row>
      <b-col>
        <h1 class="text-left">{{ receita.titulo }}</h1>
      </b-col>
    </b-row>
    <b-row v-if="possivelAvaliar"
      ><b-col> <b-form-rating v-model="nota"></b-form-rating></b-col>
      <b-col cols="1" v-if="nota != 0"
        ><b-button @click="avaliar">Enviar</b-button></b-col
      ></b-row
    >
    <b-row v-else><b-col>Obrigado por avaliar!</b-col></b-row>
    <b-row>
      <b-col v-if="receita.nota != null"
        >Nota geral: Avaliada em {{ receita.nota }} estrelas</b-col
      >
      <b-col v-else>Nota geral: Ainda não avaliada!</b-col>
    </b-row>
    <img :src="receita.imagem" style="max-width: 100%" />
    <h2 class="text-left">Ingredientes:</h2>
    <ul class="text-left">
      <li v-for="(ingrediente, key) in receita.ingredientes" :key="key">
        {{ ingrediente }}
      </li>
    </ul>
    <h2 class="text-left">Modo de preparo:</h2>
    <ul class="text-left">
      <li v-for="(preparo, key) in receita.preparo" :key="key">
        {{ preparo }}
      </li>
    </ul>
  </b-container>
</template>

<script>
import { getOne } from "../services/Receitas";
import { avaliar } from "../services/Receitas";
export default {
  data() {
    return {
      id: this.$route.params.id,
      receita: { titulo: "carregando...", ingredientes: [], preparo: [] },
      nota: 0,
      possivelAvaliar: true,
    };
  },
  async mounted() {
    this.receita = await getOne(this.id);
  },
  methods: {
    async avaliar() {
      await avaliar(this.id, this.nota);
      this.possivelAvaliar = false;
    },
  },
};
</script>

<style>
</style>