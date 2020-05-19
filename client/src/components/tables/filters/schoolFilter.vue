<template lang="html">
  <v-row>
    {{ filterValue }}
    <v-col cols="12">
      <v-row>
        <v-col class="d-flex flex-row">
          <v-select
            v-model="id_city"
            :items="citiesData"
            label="Город"
            item-text="city_name"
            item-value="_id"
            class="col-lg-4"
            clearable
            dense
          ></v-select>
          <v-select
            v-model="id_kshp"
            :items="kshpsData"
            label="Комбинат"
            item-text="kombinat"
            item-value="_id"
            class="col-lg-4"
            clearable
            dense
          ></v-select>
          <v-text-field
            v-model="school_name"
            class="col-lg-4"
            label="Название школы"
            placeholder="Название школы"
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
      id_city: "",
      id_kshp: "",
      school_name: ""
    };
  },
  computed: {
    filterValue: function() {
      this.$store.dispatch("cities/setFilterValue", {
        id_city: this.id_city,
        id_kshp: this.id_kshp,
        school_name: this.school_name
      });
    },
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
