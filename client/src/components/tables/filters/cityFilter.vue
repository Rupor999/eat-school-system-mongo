<template lang="html">
  <v-row>
    {{ filterValue }}
    <v-col cols="12">
      <v-row>
        <v-col class="d-flex flex-row">
          <v-text-field
            v-model="region"
            class="col-lg-4"
            label="Регион"
            placeholder="Регион"
            dense
          ></v-text-field>
          <v-text-field
            v-model="city_name"
            class="col-lg-4"
            label="Название города"
            placeholder="Название города"
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
      region: "",
      city_name: ""
    };
  },
  computed: {
    filterValue: function() {
      this.$store.dispatch("cities/setFilterValue", {
        region: this.region,
        city_name: this.city_name
      });
    }
  }
};
</script>

<style lang="css" scoped></style>
