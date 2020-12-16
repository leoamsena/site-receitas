<template>
  <div class="home">
    <b-container class="mt-5 mb-5">
      <b-row align-h="between">
        <b-col cols="6" style="max-height: 400px; height: 30em">
          <b-link
            v-for="(receita, key) in destaqueMaior"
            :key="key"
            :to="{ name: 'receita', params: { id: receita._id } }"
          >
            <card
              :img="receita.imagem"
              :text="receita.titulo"
              position="top"
            ></card>
          </b-link>
        </b-col>
        <b-col cols="5">
          <b-row
            class="d-flex flex-column bd-highlight mb-3 justify-content-between h-100"
          >
            <template v-for="(receita, key) in outrosDestaques">
              <div :key="key" cols="12">
                <b-link :to="{ name: 'receita', params: { id: receita._id } }">
                  <card
                    :img="receita.imagem"
                    :text="receita.titulo"
                    style="max-height: 200px"
                  ></card>
                </b-link>
              </div>
            </template>
          </b-row>
        </b-col>
      </b-row>
      <h2 class="mt-5">Todas as receitas:</h2>
      <b-row>
        <b-col>
          <b-list-group class="text-left">
            <b-list-group-item
              v-for="(receita, key) in todasReceitas"
              :to="{ name: 'receita', params: { id: receita._id } }"
              :key="key"
            >
              {{ receita.titulo }}
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Card from "../components/Card";
import { getRandom, getAll } from "../services/Receitas";
export default {
  name: "Home",
  data() {
    return {
      receitasIniciais: [],
      todasReceitas: [],
    };
  },
  components: { Card },
  async mounted() {
    const [data, data2] = await Promise.all([getRandom(3), getAll()]);
    this.receitasIniciais = data;
    this.todasReceitas = data2;
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
