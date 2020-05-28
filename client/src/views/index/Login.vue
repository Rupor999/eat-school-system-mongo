<template>
  <div
    class="d-flex justify-center align-center light-blue darken-1"
    style="height: 90vh"
  >
    <v-card width="500" :loading="getLoading" class="elevation-12">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>Вход в личный кабинет</v-toolbar-title>
        <div class="flex-grow-1"></div>
      </v-toolbar>
      <v-card-text>
        <v-alert v-show="error" dense border="left" type="warning">
          Ошибка авторизации
        </v-alert>
        <v-form>
          <v-text-field
            v-model="user.number"
            label="Номер телефона"
            name="number"
            prepend-icon="mdi-cellphone-android"
            type="text"
          ></v-text-field>

          <v-text-field
            v-model="user.password"
            id="password"
            label="Пароль"
            name="password"
            prepend-icon="mdi-lock"
            type="password"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn :disabled="processing" color="primary" @click.prevent="login"
          >Войти</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        number: "9209209201",
        password: "124"
      }
    };
  },
  methods: {
    async login() {
      await this.$store.dispatch("auth/login", this.user);
      await this.$store.dispatch("auth/getUserInfo");
      this.$router.push("/control");
    }
  },
  computed: {
    error() {
      return this.$store.getters["auth/authStatus"] === "error" ? true : false;
    },
    processing() {
      return this.$store.getters["auth/authStatus"] === "loading"
        ? true
        : false;
    },
    status() {
      // return this.$store.getters.authStatus;
      console.log(this.$store.getters["auth/authStatus"]);
    },
    getLoading() {
      return this.$store.getters["auth/getLoading"];
    }
  }
};
</script>

<style lang="css" scoped></style>
