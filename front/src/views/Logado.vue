<template>
  <b-container style="min-height: 90vh" class="mt-5">
    <h1>Minhas receitas</h1>
    <b-row>
      <b-col v-if="receitas.length <= 0"
        >Sem receitas para exibir!! Envie uma nova!</b-col
      >
      <b-col cols="4" v-for="receita in receitas" :key="receita.id"
        ><b-card
          :img-src="receita.imagem"
          img-alt="Foto da receita"
          img-left
          img-width="40%"
          class="mb-3"
          :title="receita.titulo"
        >
          <div class="d-flex justify-content-around">
            <b-button href="#" variant="danger" @click="apagar(receita._id)"
              >Apagar</b-button
            >
            <b-button href="#" variant="primary">Editar</b-button>
          </div>
        </b-card></b-col
      >
    </b-row>
  </b-container>
</template>

<script>
import { minhasReceitas } from "../services/Receitas";
import { apagar } from "../services/Receitas";
export default {
  data() {
    return {
      receitas: [],
    };
  },
  async mounted() {
    const data = await minhasReceitas();
    this.receitas = data;
  },
  methods: {
    async apagar(id) {
      await apagar(id);
      const data = await minhasReceitas();
      this.receitas = data;
    },
  },
};
</script>

<style>
</style>