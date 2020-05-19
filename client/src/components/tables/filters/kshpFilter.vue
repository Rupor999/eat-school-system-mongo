<template lang="html">
  <v-row>
    {{ filterValue }}
    <v-col cols="12">
      <v-row>
        <v-col class="d-flex flex-row">
          <v-select
            v-model="city_id"
            :items="citiesData"
            label="Город"
            item-text="city_name"
            item-value="_id"
            class="col-lg-4"
            clearable
            dense
          ></v-select>
          <v-text-field
            v-model="kombinat"
            class="col-lg-4"
            label="Название КШП"
            placeholder="Название КШП"
            dense
          ></v-text-field>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      city_id: "",
      kombinat: ""
    };
  },
  computed: {
    filterValue: function() {
      this.$store.dispatch("kshps/setFilterValue", {
        city_id: this.city_id || "",
        kombinat: this.kombinat
      });
    },
    citiesData: function() {
      return this.$store.getters["cities/getCities"];
    }
  }
};
</script>

<style lang="css" scoped></style>
