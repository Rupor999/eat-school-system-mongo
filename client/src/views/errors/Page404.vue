<template lang="html">
  <div class="d-flex flex-column pa-5 ma-5">
    <h1 class="align-self-center">ОШИБКА 404</h1>
    <h2 class="align-self-center">Такой страницы не существует</h2>
    <div class="align-self-center pa-2">
      <v-btn @click.prevent="goBack" class="ma-2" color="warning">Назад</v-btn>
      <v-btn @click.prevent="goMain" class="ma-2" color="primary"
        >На главную</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goMain() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="css"></style>
