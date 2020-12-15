<template>
  <div class="home">
    <b-container class="mt-5 mb-5">
      <b-row align-h="between">
        <b-col cols="6" style="max-height: 400px; height: 30em">
          <card
            v-for="(receita, key) in destaqueMaior"
            :img="receita.imagem"
            :text="receita.titulo"
            :key="key"
            position="top"
          ></card>
        </b-col>
        <b-col cols="5">
          <b-row
            class="d-flex flex-column bd-highlight mb-3 justify-content-between h-100"
          >
            <template v-for="(receita, key) in outrosDestaques">
              <div :key="key" cols="12">
                <card :img="receita.imagem" :text="receita.titulo"></card>
              </div>
            </template>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Card from "../components/Card";
import { getRandom } from "../services/Receitas";
export default {
  name: "Home",
  data() {
    return {
      receitasIniciais: [],
    };
  },
  components: { Card },
  async mounted() {
    const data = await getRandom(3);
    this.receitasIniciais = data;
    console.log(this.receitasIniciais);
  },
  computed: {
    destaqueMaior() {
      return this.receitasIniciais.length > 0 ? [this.receitasIniciais[0]] : [];
    },
    outrosDestaques() {
      return this.receitasIniciais.length >= 3
        ? [this.receitasIniciais[1], this.receitasIniciais[2]]
        : [];
    },
  },
};
</script>
