<template lang="html">
  <div>
    <v-card class="mx-auto pa-3 my-1" max-width="800" outlined>
      <div class="d-flex justify-end">
        <slot></slot>
      </div>
      <v-card-text class="d-flex">
        <v-row>
          <v-col>
            <v-select
              class="ma-1"
              :items="schoolsData"
              item-text="school_name"
              item-value="_id"
              label="Школа"
              v-model="inputData.id_uchrezhdenia"
            ></v-select>
            <v-text-field
              class="ma-1"
              label="Наименование товара"
              required
              v-model="inputData.naimenovanie"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-select
              class="ma-1"
              :items="categoriesData"
              item-text="kategoriya"
              item-value="_id"
              label="Категория"
              v-model="inputData.id_kategoriya"
            ></v-select>

            <v-text-field
              class="ma-1"
              label="Цена"
              required
              v-model="inputData.cena"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    inputData: Object
  },
  data() {
    return {};
  },
  computed: {
    schoolsData() {
      // если 4 то должен быть филь по аддишнл которого нет//////////////////////////////////////////////
      // if (this.currentUser.role === 4) {
      //   return this.$store.getters["schools/getSchools"].filter(item => {
      //     return item.id_kshp == this.currentUser._id ? true : false;
      //   });
      // } else return this.$store.getters["schools/getSchools"] || [];

      return this.$store.getters["schools/getSchools"] || [];
    },
    categoriesData() {
      return this.$store.getters["categoriesBufet/getCategoriesBufet"] || [];
    },
    currentUser() {
      return this.$store.getters["auth/getUserInfo"];
    }
  }
};
</script>

<style lang="css" scoped></style>
