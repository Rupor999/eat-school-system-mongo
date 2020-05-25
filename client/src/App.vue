<template>
  <v-app>
    <router-view name="navbar"></router-view>

    <router-view></router-view>

    <v-snackbar :color="snackbar.color" :timeout="0" v-model="snackbar.enabled">
      {{ snackbar.text }}
      <v-btn dark text text @click="offSnackBar">
        Закрыть
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { axiosConfigurated as axios } from "@/config/axiosConfigurated";

export default {
  name: "App",
  created: function() {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      this.$store.dispatch("auth/getUserInfo");
    }
    // axios.interceptors.response.use(undefined, error => {
    //   this.$store.dispatch("auth/logout").then(() => {
    //     this.$router.push({ name: "login" });
    //   });
    //
    //   return Promise.reject(error);
    // });
  },
  computed: {
    snackbar: function() {
      return {
        enabled: this.$store.getters["snackbar/getSnackEnabled"],
        text: this.$store.getters["snackbar/getSnackText"],
        color: this.$store.getters["snackbar/getColor"]
      };
    }
  },
  methods: {
    offSnackBar: function() {
      this.$store.dispatch("snackbar/off");
    }
  }
};
</script>
