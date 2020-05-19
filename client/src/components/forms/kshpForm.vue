<template lang="html">
  <div>
    <v-card class="mx-auto pa-3 my-1" max-width="800" outlined>
      <v-card-text>
        <v-row>
          <v-select
            v-model="inputData.city_id"
            :items="citiesData"
            label="Город"
            item-text="city_name"
            item-value="_id"
          ></v-select>
          <v-text-field
            class="ma-1"
            label="Название КШП"
            required
            v-model="inputData.kombinat"
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
    }
  }
};
</script>

<style lang="css" scoped></style>
