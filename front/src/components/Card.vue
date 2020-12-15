<template>
  <b-card
    :title="text"
    :img-src="img"
    img-alt="Foto da receita"
    :img-left="posicao('left')"
    :img-top="posicao('top')"
    class="mb-3"
    title-tag="h2"
    :img-width="posicao('left') ? '40%' : '100%'"
    :img-height="posicao('left') ? 'auto' : '70%'"
    style="height: 100%"
  >
  </b-card>
</template>

<script>
export default {
  props: {
    position: {
      type: String,
      default: "left",
      validator: function (value) {
        return ["top", "left"].indexOf(value) !== -1;
      },
    },
    text: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  methods: {
    posicao(pos) {
      return this.position == pos;
    },
  },
};
</script>

<style>
</style>