<template lang="html">
  <div>
    <v-card class="mx-auto pa-3 my-1" max-width="800" outlined>
      <v-card-text>
        <v-row>
          <v-select
            v-model="inputData.id_city"
            :items="citiesData"
            label="Город"
            item-text="city_name"
            item-value="_id"
            class="col-lg-4"
            clearable
          ></v-select>
          <v-select
            v-model="inputData.id_kshp"
            :items="kshpsData"
            label="Комбинат"
            item-text="kombinat"
            item-value="_id"
            class="col-lg-4"
            clearable
          ></v-select>
          <v-text-field
            class="ma-1"
            label="Название школы"
            required
            v-model="inputData.school_name"
          ></v-text-field>
        </v-row>
      </v-card-text>

      <v-card-actions> </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    inputData: Object
  },
  computed: {
    citiesData: function() {
      return this.$store.getters["cities/getCities"];
    },
    kshpsData: function() {
      return this.$store.getters["kshps/getKshps"];
    }
  }
};
</script>

<style lang="css" scoped></style>
