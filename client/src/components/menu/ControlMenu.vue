<template>
  <v-card>
    <v-navigation-drawer
      app
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      mini-variant-width="80"
      width="300"
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-icon>mdi-account-circle</v-icon>
        </v-list-item-avatar>
        <v-list-item-title>Панель управления</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list v-show="!mini">
        <v-list-item> Статус: {{ userInfo.role }} </v-list-item>
        <v-list-item>
          Пользователь: {{ userInfo.fio.surname }} {{ userInfo.fio.name }}
          {{ userInfo.fio.midname }}
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.route"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn @click.prevent="test_button" class="error" block
            >TEST BUTTON</v-btn
          >
          <v-btn @click.prevent="logout" class="error" block>Выйти</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      mini: true,
      items: [
        {
          title: "Главная",
          route: "/control",
          icon: "mdi-home-city",
          permission: [1, 2, 3, 4, 5]
        },
        {
          title: "Управление пользователями",
          route: "/control/users",
          icon: "mdi-pan-right",
          permission: [1]
        },
        {
          title: "Буфет",
          route: "/control/bufet",
          icon: "mdi-pan-right",
          permission: [1]
        }
      ]
    };
  },
  methods: {
    test_button() {},
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
    }
  }
};
</script>

<style lang="css" scoped></style>
