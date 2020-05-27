<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl class="d-flex justify-center flex-wrap">
    <v-card
      v-for="(item, index) in childrenCurrentUserData"
      :key="index"
      width="550"
      class="ma-1"
    >
      <v-card-title primary-title class="d-flex">
        <div>{{ item.familia }} {{ item.imya }} {{ item.otchestvo }}</div>
        <div class="font-weight-light">
          Лицевой счет:
          {{ item.id_uchenik }}
        </div>
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="(item, i) in viewChild" :key="i" @click="">
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-list-item-action-text
                v-text="item.function(index)"
              ></v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  mounted() {
    this.$store
      .dispatch("schools/getSchools")
      .then(() => {})
      .catch(err => console.log(err));
  },
  data() {
    return {
      viewChild: [
        { text: "Школа", function: this.getSchool },
        { text: "Класс", function: this.getClass },
        { text: "Разрешение: покупки в буфете", function: this.getAllowBufet },
        { text: "Разрешение: горячее питание", function: this.getAllowGP },
        { text: "Привязана чип карта", function: this.getChipStatus },
        { text: "Баланс: буфет", function: this.getBalanceBufet },
        { text: "Баланс: горячее питание", function: this.getBalanceGP }
      ]
    };
  },
  methods: {
    getSchool(index) {
      let data = this.schoolsData.find(item => {
        if (item._id == this.childrenCurrentUserData[index].id_school) {
          return true;
        } else return false;
      });
      return data === undefined ? "Нет данных" : data.school_name;
    },
    getClass(index) {
      return (
        this.childrenCurrentUserData[index].cifra_kl +
        " " +
        this.childrenCurrentUserData[index].bukva_kl
      );
    },
    getAllowBufet(index) {
      return this.childrenCurrentUserData[index].bufet === true ? "Да" : "Нет";
    },
    getAllowGP(index) {
      return this.childrenCurrentUserData[index].goryachee_pitanie === true
        ? "Да"
        : "Нет";
    },
    getChipStatus(index) {
      return this.childrenCurrentUserData[index].chip_karty.length
        ? "Да"
        : "Нет";
    },
    getBalanceBufet(index) {
      return (
        this.childrenCurrentUserData[index].balans_bufet.$numberDecimal +
        " Руб."
      );
    },
    getBalanceGP(index) {
      return (
        this.childrenCurrentUserData[index].balans_gp.$numberDecimal + " Руб."
      );
    }
  },
  computed: {
    schoolsData() {
      return this.$store.getters["schools/getSchools"];
    },
    childrenCurrentUserData() {
      return this.$store.getters["auth/getUserAdditional"].children;
    }
  }
};
</script>

<style lang="css" scoped></style>
