<template lang="html">
  <div>
    <v-app-bar app color="indigo" dark flat>
      <v-img
        class="mr-2"
        max-height="30px"
        max-width="30px"
        src="/favicon.ico"
      ></v-img>
      <v-toolbar-title
        >Школьное питание #ШП / Панель управления / {{ userRoleWord }} -
        {{ userInfo.fio.surname }} {{ userInfo.fio.name }}
        {{ userInfo.fio.midname }}</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-toolbar-items class="">
        <v-btn @click.prevent="logout" color="red" class="">Выход</v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  methods: {
    logout() {
      this.$store
        .dispatch("auth/logout")
        .then(() => {
          this.$router.push("/");
        })
        .catch(err => console.log(err));
    }
  },
  computed: {
    userInfo: function() {
      return this.$store.getters["auth/getUserInfo"];
    },
    userRoleWord() {
      return this.$store.getters["auth/getUserRoleWord"];
    }
  }
};
</script>

<style lang="css" scoped></style>
