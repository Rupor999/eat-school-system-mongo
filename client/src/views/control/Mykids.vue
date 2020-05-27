<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl>
    <v-btn @click.prevent="$router.go(-1)" color="warning" class="mr-5"
      >Назад
    </v-btn>
    <v-card>
      <v-card-title class="text-center justify-center py-6">
        <h1 class="display-5">
          Дети
        </h1>
      </v-card-title>
      <v-tabs v-model="tab" background-color="transparent" grow>
        <v-tab v-for="item in tab_items" :key="item">
          {{ item }}
        </v-tab>
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="(item, index) in tabItemsComponent" :key="index">
            <component
              v-if="childrensCurrentUserData.children.length"
              v-bind:is="item"
            >
            </component>
            <div v-else class="">
              У данного пользователя отсутствуют записи о детях...Ц
            </div>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script>
import children from "@/views/control/Mykids/children";
import expensesAndReplenishment from "@/views/control/Mykids/expensesAndReplenishment";
import payment from "@/views/control/Mykids/payment";

export default {
  components: {
    children,
    expensesAndReplenishment,
    payment
  },
  data() {
    return {
      tab: null,
      tab_items: ["Дети", "Расходы и пополнения", "Пополнить баланс"],
      tabItemsComponent: ["children", "expensesAndReplenishment", "payment"]
    };
  },
  computed: {
    childrensCurrentUserData() {
      console.log(this.$store.getters["auth/getUserAdditional"]);
      return this.$store.getters["auth/getUserAdditional"];
    }
  },
  methods: {}
};
</script>

<style lang="css" scoped></style>
