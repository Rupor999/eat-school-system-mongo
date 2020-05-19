<template lang="html">
  <v-container
    class=" d-flex justify-space-around align-center flex-wrap"
    style="height: 80vh"
  >
    <v-card
      raised
      width="300"
      min-height="200"
      v-for="(item, index) in itemsMenuForCurrentUser(userRole)"
      :key="index"
      @click="go(item.route)"
      class="hoverCard d-flex flex-column justify-center align-center ma-5 pa-1 elevation-11"
      color=""
    >
      <v-card-title primary-title> {{ item.title }} </v-card-title>
      <v-card-subtitle class="hoverCard">
        {{ item.subtitle }}
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      pathToImage: "/img/control_panel_menu/",
      allItemsMenu: [
        {
          title: "Главная",
          subtitle: "",
          image: "home.jpg",
          route: "/",
          permission: [1, 2, 3, 4, 5]
        },
        {
          title: "Пользователи",
          subtitle: "Управление аккаунтами пользователей",
          image: "users.png",
          route: "/control/users",
          permission: [1, 2, 3, 4, 5]
        },
        {
          title: "Буфет",
          subtitle: "Управление буфетом",
          image: "bufet.jpg",
          route: "/control/bufet",
          permission: [1, 2, 3, 4, 5]
        },
        {
          title: "Ученики",
          subtitle: "Управление учетными записями учеников",
          image: "pupils.jpg",
          route: "/control/pupils",
          permission: [1, 2, 3, 4, 5]
        },
        {
          title: "Учереждения",
          subtitle: "Управление учереждениями",
          image: "institution.jpg",
          route: "/control/schools",
          permission: [1, 2, 3, 4, 5]
        },
        {
          title: "КШП",
          subtitle: "Управление КШП",
          image: "kshp.jpg",
          route: "/control/kshps",
          permission: [1, 2, 3, 4, 5]
        },
        {
          title: "Категории буфета",
          subtitle: "Управление категориями буфета",
          image: "kshp.jpg",
          route: "/control/categoriesbufet",
          permission: [1, 2, 3, 4, 5]
        },
        {
          title: "Города",
          subtitle:
            "Управление городами в которых успользуется система школьного питания",
          image: "kshp.jpg",
          route: "/control/cities",
          permission: [1, 2, 3, 4, 5]
        },
        {
          title: "Мои дети",
          subtitle: "Управление аккаунтами детей",
          image: "children.png",
          route: "/control/mykids",
          permission: [1, 2, 3, 4, 5]
        },
        {
          title: "Пополнение счета",
          subtitle: "Пополнение счет с помощью онлайн платежей",
          image: "popolnenie_scheta.png",
          route: "/control/payment",
          permission: [1, 2, 3, 4, 5]
        },
        {
          title: "Расходы и пополнения",
          subtitle: "Отслеживание расходов и пополнений",
          image: "rashodi_i_popolneniya.png",
          route: "/control/expenses-and-replenishment",
          permission: [1, 2, 3, 4, 5]
        },
        {
          title: "Статистика",
          subtitle: "Статистика и анализ потребления продукции",
          image: "statistika.png",
          route: "/control/statistics",
          permission: [1, 2, 3, 4, 5]
        },
        {
          title: "Чат с поддержкой",
          subtitle:
            "Если возникли вопросы, вы можете обратиться с ними в онлайн чат, для скорейшего решения вашего вопроса",
          image: "chat.jpg",
          route: "/control/chat",
          permission: [1, 2, 3, 4, 5]
        }
      ]
    };
  },
  methods: {
    go(url_path) {
      this.$router.push({ path: url_path });
    },
    itemsMenuForCurrentUser(user_role) {
      return this.allItemsMenu.filter(item => {
        return item.permission.includes(user_role);
      });
    }
  },
  computed: {
    userRole: function() {
      return this.$store.getters["auth/getUserInfo"].role;
    }
  }
};
</script>

<style lang="css" scoped>
.hoverCard:hover {
  background-color: #3F51B5;
  color: white;
}
</style>
