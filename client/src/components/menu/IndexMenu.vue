<template lang="html">
  <div>
    <v-navigation-drawer
      absolute
      temporary
      v-model="drawer"
      app
      class="hidden-md-and-up"
    >
      <v-list dense>
        <v-list-item
          v-for="(item, i) in menuItems()"
          :key="`menuitem${i}`"
          :to="item.route"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon_name }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <template v-if="isLoggedIn">
          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item text v-bind="attrs" v-on="on">
                <v-list-item-action>
                  <v-icon class="mr-1">mdi-account-circle</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Личный кабинет</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>

            <v-list subheader>
              <v-subheader v-if="userInfo">
                {{
                  getGreetString(userInfo.fio.name, userInfo.fio.midname)
                }}</v-subheader
              >
              <v-divider></v-divider>

              <v-list-item link :to="'/control'">
                <v-list-item-title>Перейти в личный кабинет</v-list-item-title>
              </v-list-item>
              <v-list-item link @click.prevent="logout">
                <v-list-item-title>Выйти</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <template v-else>
          <v-list-item link :to="'/login'">
            <v-list-item-action>
              <v-icon class="mr-1">mdi-key</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Вход</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark flat>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>
      <v-img
        class="mr-2"
        max-height="30px"
        max-width="30px"
        src="/favicon.ico"
      ></v-img>
      <v-toolbar-title>Школьное питание #ШП</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          text
          v-for="(item, i) in menuItems()"
          :key="`menuItems${i}`"
          :to="item.route"
        >
          <v-icon class="mr-1">{{ item.icon_name }}</v-icon>
          {{ item.title }}</v-btn
        >
        <template v-if="isLoggedIn">
          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-btn text v-bind="attrs" v-on="on">
                <v-icon class="mr-1">mdi-account-circle</v-icon>
                Личный кабинет
              </v-btn>
            </template>

            <v-list subheader>
              <v-subheader v-if="userInfo">
                {{
                  getGreetString(userInfo.fio.name, userInfo.fio.midname)
                }}</v-subheader
              >
              <v-divider></v-divider>

              <v-list-item link :to="'/control'">
                <v-list-item-title>Перейти в личный кабинет</v-list-item-title>
              </v-list-item>
              <v-list-item link @click.prevent="logout">
                <v-list-item-title>Выйти</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <template v-else>
          <v-btn text :to="'/login'">
            <v-icon class="mr-1">mdi-key</v-icon>
            Вход</v-btn
          >
        </template>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false
  }),
  methods: {
    logout() {
      this.$store
        .dispatch("auth/logout")
        .then(() => {
          this.$router.push("/");
        })
        .catch(err => console.log(err));
    },
    menuItems() {
      return [
        {
          title: "Начало",
          route: "/",
          icon_name: "mdi-home"
        },
        {
          title: "Родителям",
          route: "/parents",
          icon_name: "mdi-account-multiple"
        },
        {
          title: "Школе",
          route: "/school",
          icon_name: "mdi-school"
        },
        {
          title: "Комбинату питания",
          route: "/kshp",
          icon_name: "mdi-silverware"
        },
        {
          title: "О нас",
          route: "/aboutus",
          icon_name: "mdi-briefcase"
        },
        {
          title: "Остались вопросы?",
          route: "",
          icon_name: "mdi-comment-question-outline"
        }
      ];
    },
    getGreetString(name, midname) {
      if (name && midname) {
        let time = new Date().getHours();
        let namePlusMidname = name + " " + midname + "!";
        return time >= 0 && time <= 3
          ? "Доброй ночи, " + namePlusMidname
          : time >= 4 && time <= 11
          ? "Доброе утро, " + namePlusMidname
          : time >= 12 && time <= 16
          ? "Добрый день, " + namePlusMidname
          : "Добрый вечер, " + namePlusMidname;
      } else {
        return "Доброго времени суток!";
      }
    }
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters["auth/isLoggedIn"];
    },
    userInfo: function() {
      return this.$store.getters["auth/getUserInfo"];
    }
  }
};
</script>

<style lang="css" scoped></style>
